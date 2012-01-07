import time
import hashlib
import re
from mongokit import Document

class GameState(object):
    CREATED = u"CREATED"
    RUNNING = u"RUNNING"
    CORRECT_GUESS = u"CORRECT_GUESS"
    INCORRECT_GUESS = u"INCORRECT_GUESS"
    OVER_SAVED = u"OVER_SAVED"
    OVER_HUNG = u"OVER_HUNG"

class AlreadyGuessedException(Exception):
    pass

MAX_INCORRECT_GUESSES = 10

class HangmanGame(Document):
    __collection__ = "games"
    __database__ = "hangman"
    structure = {
        "channel": unicode,
        "state": unicode,
        "word": unicode,
        "wordstate": [unicode],
        "failed": [unicode]
    }
    default_values = { "state": GameState.CREATED }
    use_dot_notation = True

    def create(self, word):
        self.word = word.upper()
        self.channel = unicode(hashlib.md5(word + str(time.time())).hexdigest())
        self.wordstate = [u"_"] * len(word)

    def join(self):
        self.state = GameState.RUNNING

    def guess(self, letter):
        upper_letter = letter.upper()
        if upper_letter in self.failed:
            raise AlreadyGuessedException()
        if upper_letter not in self.word:
            self.failed.append(upper_letter)
            if len(self.failed) == MAX_INCORRECT_GUESSES:
                self.state = GameState.OVER_HUNG
            else:
                self.state = GameState.INCORRECT_GUESS
        else:
            for m in re.finditer(upper_letter, self.word):
                self.wordstate[m.start()] = upper_letter
            if "_" in self.wordstate:
                self.state = GameState.CORRECT_GUESS
            else:
                self.state = GameState.OVER_SAVED
