from flask import Flask, render_template, jsonify
from pymongo import Connection, json_util
import time
import hashlib
import json
import urllib2

EVENT_URL = "http://127.0.0.1/publish"

def publish_event(channel, data):
    urllib2.urlopen(EVENT_URL + "?id=%s" % channel, 
                    json.dumps(data, default=json_util.default))

class GameService(object):

    MAX_TRIES = 10

    def __init__(self):
        self.db = Connection().game_db

    def add_player_to_game(self, channel):
        game = self.db.games.find_one({"channel": channel})
        game["participants"] = 2
        game["status"] = "started"
        self.db.games.save(game)
        return game

    def get_info(self, channel):
        game = self.db.games.find_one({"channel": channel})
        return game

    def create_game(self, word):
        channel = hashlib.md5(str(time.time())).hexdigest()
        word_state = ["_"] * len(word)
        game = {
            "word": word,
            "channel": channel,
            "status": "pending",
            "word_state": word_state,
            "failed_guesses": [],
            "participants": 1
        }
        self.db.games.save(game)
        return game

    def guess(self, channel, letter):
        game = self.db.games.find_one({"channel" : channel})
        if not game["status"].startswith("over"):
            if letter in game["failed_guesses"] or letter in game["word_state"]: #Already have that
                game["status"] = "duplicate"
            elif letter in game["word"]:
                [game["word_state"].pop(i) and game["word_state"].insert(i, letter)
                 for i in range(len(game["word"])) if game["word"][i] == letter]
                if "_" in game["word_state"]:
                    game["status"] = "correct"
                else:
                    game["status"] = "over-success"
            else:
                if len(game["failed_guesses"]) == self.MAX_TRIES:
                    game["status"] = "over-failed"
                else:
                    game["status"] = "failed"
                game["failed_guesses"].append(letter)
            self.db.games.save(game)
            return game
        else:
            return None

app = Flask(__name__)
game_service = GameService()

# Regular routes

@app.route("/")
def main():
    return render_template("index.html")

@app.route("/join/<channel>")
def join(channel):
    #TODO import ascii instead
    letters = [chr(i) for i in range(ord("A"), ord("Z") + 1)]
    return render_template("join.html", channel_id=channel, letters=letters)

#TODO: dry up and use the built in json capabilities from Flask

@app.route("/api/game/create/<word>")
def create_game(word):
    try:
        word = word.decode("ascii").upper()
        data = game_service.create_game(str(word))
        response = {
            "status": "OK",
            "opponent_url" : "/join/" + data["channel"],
            "subscription_url" : "/subscribe?id=" + data["channel"]
        }
    except UnicodeError:
        response = {
            "status": "ERROR",
            "message": "Validation failed"
        }
    return jsonify(response) 

@app.route("/api/game/join/<channel>")
def join_game(channel):
    data = game_service.add_player_to_game(str(channel))
    publish_event(data["channel"], data)
    return ""

@app.route("/api/game/guess/<channel>/<letter>")
def guess(channel, letter):
    data = game_service.guess(str(channel), str(letter))
    publish_event(data["channel"], data)
    return ""

@app.route("/api/game/info/<channel>")
def game_info(channel):
    data = game_service.get_info(str(channel))
    publish_event(data["channel"], data)
    return ""

if __name__ == "__main__":
    app.run(debug=True)
