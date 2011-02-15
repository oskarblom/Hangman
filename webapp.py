from flask import Flask, render_template
from pymongo import Connection, json_util
import time
import hashlib
import json
import urllib2

class GameService(object):

    MAX_TRIES = 10

    def __init__(self):
        self.db = Connection().game_db

    def add_player_to_game(self, channel):
        game = self.db.games.find_one({"channel": channel})
        game["participants"] = 2
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
            "status": "started",
            "word_state": word_state,
            "failed_guesses": [],
            "participants": 1
        }
        self.db.games.save(game)
        return game

    def guess(self, channel, letter):
        game = self.db.games.find_one({"channel" : channel})
        if game["status"] != "over":
            if letter in game["failed_guesses"] or letter in game["word_state"]: #Already have that
                game["status"] = "duplicate"
            elif letter in game["word"]:
               [game["word_state"].pop(i) and game["word_state"].insert(i, letter)
                for i in range(len(game["word"])) if game["word"][i] == letter]
               game["status"] = "correct"
            else:
                if len(game["failed_guesses"]) + 1 == self.MAX_TRIES:
                    game["status"] = "over"
                else:
                    game["status"] = "failed"
                game["failed_guesses"].append(letter)
            self.db.games.save(game)
            return game
        else:
            return None

app = Flask(__name__)
game_service = GameService()
HOST = "hangman"
EVENT_URL = "http://127.0.0.1/publish"

def build_json_response(response_data):
    return json.dumps(response_data, 200, {"Content-type": "application/json"})

# Regular routes

@app.route("/")
def main():
    return render_template("index.html")
#TODO: dry up

@app.route("/api/game/create/<word>")
def create_game(word):
    data = game_service.create_game(str(word))
    response = {
        "opponent_url" : "/api/game/join/" + data["channel"],
        "subscription_url" : "/subscribe?id=" + data["channel"]
    }
    return build_json_response(response) 

@app.route("/api/game/join/<channel>")
def join_game(channel):
    data = game_service.add_player_to_game(str(channel))
    urllib2.urlopen(EVENT_URL + "?id=%s" % data["channel"], 
                    json.dumps(data, default=json_util.default))
    return ""

@app.route("/api/game/guess/<channel>/<letter>")
def guess(channel, letter):
    data = game_service.guess(str(channel), str(letter))
    urllib2.urlopen(EVENT_URL + "?id=%s" % data["channel"], 
                    json.dumps(data, default=json_util.default))
    return ""

@app.route("/api/game/info/<channel>")
def game_info(channel):
    data = game_service.get_info(str(channel))
    urllib2.urlopen(EVENT_URL + "?id=%s" % data["channel"], 
                    json.dumps(data, default=json_util.default))
    return ""

if __name__ == "__main__":
    app.run(debug=True)
