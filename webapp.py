# coding:utf-8
from flask import Flask, render_template, jsonify, g
from string import ascii_uppercase
import time
import hashlib
import json
import urllib2
from juggernaut import Juggernaut
from game import *
from mongokit import Connection

app = Flask(__name__)

# Should be thread safe according to docs
con = Connection()

def publish_event(game):
    Juggernaut().publish(game.channel, game.to_json())

@app.route("/test")
def test():
    return render_template("test.html")

@app.route("/")
def main():
    return render_template("index.html")

@app.route("/join/<channel>")
def join(channel):
    letters = [letter for letter in ascii_uppercase] + [u'Å', u'Ä', u'Ö']
    return render_template("join.html", channel_id=channel, letters=letters)

# API routes
@app.route("/game/create/<word>", methods=["POST"])
def create_game(word):
    game = con.HangmanGame()
    game.create(word)
    game.save()
    return jsonify({"channel": game.channel})

@app.route("/game/join/<channel>", methods=["POST"])
def join_game(channel):
    game = con.HangmanGame.find_one({"channel": unicode(channel)})
    game.join()
    game.save()
    publish_event(game)
    return ""

@app.route("/game/guess/<channel>/<letter>", methods=["POST"])
def guess(channel, letter):
    game = con.HangmanGame.find_one({"channel": unicode(channel)})
    game.guess(letter)
    game.save()
    publish_event(game)
    return ""

if __name__ == "__main__":
    con.hangman.drop_collection("games")
    con.register([HangmanGame])
    debug = True
    app.run(debug=debug)
