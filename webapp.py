from flask import Flask, render_template
from pymongo import connection
import time
import md5
import hashlib

app = Flask(__name__)
repo = GameService()

@app.route("/")
def main():
    return render_template("index.html")

@app.route("/api/creategame")
def create_game():
    return "Hello World!"

class GameService(object):

    MAX_TRIES = 10

    def __init__(self):
        self.db = Connection().game_db

    def add_player_to_game(self, channel):
        game = self.db.games.find_one({"channel": channel})
        game["participants"] = 2
        self.db.games.insert(game)

    def create_game(self, word):
        channel = hashlib.md5(str(time.time())).hexdigest()
        word_state = ["_" for i in range(len(word))]
        game = {
            "word": word,
            "channel": channel,
            "status": "started",
            "word_state": word_state,
            "failed_guesses": [],
            "participants": 1
        }
        self.db.games.insert(game)
        return channel, game

    def guess(self, channel, letter):
        game = self.db.games.find_one({"channel" : channel})
        if game["status"] != "over":
            current_fails = len(game["failed_guesses"])
            if letter in game["failed_guesses"] or letter in game["word_state"]: #Already have that
                game["status"] = "duplicate"
            elif letter in word:
               [game["word_state"].pop(i) and game["word_state"].insert(i, letter)
                for i in range(len(game["word"])) if "apa"[i] == letter]
                game["status"] = "correct"
            elif current_guesses + 1 == self.MAX_TRIES:
                game["status"] = "over"
            else:
                game["failed_guesses"].append(letter)
                game["status"] = "failed"
            self.db.insert(game)
        return game #TODO: fix

if __name__ == "__main__":
    app.run(debug=True)
