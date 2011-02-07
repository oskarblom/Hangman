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
        game = {
            "word": word,
            "channel": channel,
            "status": "running",
            "guesses": [],
            "participants": 1
        }
        self.db.games.insert(game)
        return channel, game

    def guess(self, channel, letter):
        game = self.db.games.find_one({"channel" : channel})
        current_guesses = len(game["guesses"])
        if letter in game["guesses"]:
            game["status"] = "duplicate":
        else:
            if current_guesses + 1 == self.MAX_TRIES:
                game["status"] = "over"
            else:
                game["guesses"].append(letter)
        return game

if __name__ == "__main__":
    app.run(debug=True)
