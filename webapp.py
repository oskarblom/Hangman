from flask import Flask, render_template
from pymongo import connection
import time
import md5
import hashlib

app = Flask(__name__)
repo = GameRepository()

@app.route("/")
def main():
    return render_template("index.html")

@app.route("/api/creategame")
def create_game():
    return "Hello World!"

class GameRepository(object):

    def __init__(self):
        self.db = Connection().game_db

    def create_game(self, word):
        channel = hashlib.md5(str(time.time())).hexdigest()
        game = {
            "word": word,
            "channel": channel,
            "isrunning": True,
            "guesses": []
        }
        self.db.games.insert(game)
        return channel, game

if __name__ == "__main__":
    app.run(debug=True)
