import re
from mongokit import Document

class GameState(object):
    CREATED = 0
    RUNNING = 1
    CORRECT_GUESS = 2
    INCORRECT_GUESS = 3
    OVER_SAVED = 4
    OVER_HUNG = 5

class AlreadyGuessedException(Exception):
    pass

MAX_INCORRECT_GUESSES = 10

class HangmanGame(Document):
    __collection__ = "games"
    __database__ = "hangman"
    structure = {
        "channel": unicode,
        "state": int,
        "word": unicode,
        "wordstate": [unicode],
        "failed": [unicode]
    }
    default_values = { "state": GameState.CREATED }
    use_dot_notation = True

    def create(self, word):
        self.word = word.upper()
        self.wordstate = ["_"] * len(word)
        self.state = GameState.CREATED

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

