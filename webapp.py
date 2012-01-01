# coding:utf-8
from flask import Flask, render_template, jsonify
from string import ascii_uppercase
import time
import hashlib
import json
import urllib2
from juggernaut import Juggernaut
from game import *
from mongokit import Connection

app = Flask(__name__)
con = Connection()
jug = Juggernaut()

def publish_event(channel, game):
    jug.publish(game.channel, game.to_json())

@app.route("/test")
def test():
    return render_template("test.html")

@app.route("/")
def main():
    return render_template("index.html")

@app.route("/join/<channel>")
def join(channel):
    letters = [letter for letter in ascii_uppercase] + [u'Å', u'Ä', u'Ö']
    print letters
    return render_template("join.html", channel_id=channel, letters=letters)

# API routes
@app.route("/api/game/create/<word>", methods=["POST"])
def create_game(word):
    game = con.HangmanGame()
    game.create(word)
    game.save()
    return jsonify({"channel": game.channel})

@app.route("/api/game/join/<channel>")
def join_game(channel):
    data = game_service.add_player_to_game(str(channel))
    publish_event(data["channel"], data)
    return ""

@app.route("/api/game/guess/<channel>/<letter>")
def guess(channel, letter):
    data = game_service.guess(str(channel), unicode(letter).upper())
    publish_event(data["channel"], data)
    return ""

if __name__ == "__main__":
    con.hangman.drop_collection("games")
    con.register([HangmanGame])
    debug = True
    app.run(debug=debug)
