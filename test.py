import unittest
from game import *

class TestGame(unittest.TestCase):

    def setUp(self):
        self.word = "FOOBAR"
        self.game = HangmanGame()
        self.game.create(self.word)

    def test_create_sets_state(self):
        self.assertEqual(self.game.state, GameState.CREATED)

    def test_create_sets_word(self):
        self.assertEqual(self.game.word, self.word)

    def test_create_sets_wordstate(self):
        self.assertEqual(self.game.wordstate, ["_", "_", "_", "_", "_", "_"])

    def test_correct_guess_sets_wordstate(self):
        self.game.guess("F")
        self.assertEqual(self.game.wordstate, ["F", "_", "_", "_", "_", "_"])

    def test_correct_guess_sets_state(self):
        self.game.guess("F")
        self.assertEqual(self.game.state, GameState.CORRECT_GUESS)

    def test_incorrect_guess_does_not_set_wordstate(self):
        self.game.guess("X")
        self.assertEqual(self.game.wordstate, ["_", "_", "_", "_", "_", "_"])

    def test_incorrect_guess_sets_state(self):
        self.game.guess("X")
        self.assertEqual(self.game.state, GameState.INCORRECT_GUESS)

    def test_save_sets_state(self):
        [self.game.guess(x) for x in ["F", "O", "O", "B", "A", "R"]]
        self.assertEqual(self.game.state, GameState.OVER_SAVED)

    def test_hang_sets_state(self):
        [self.game.guess(x) for x in ["C", "D", "E", "G", "H", "I", "J", "K", "L", "M"]]
        self.assertEqual(self.game.state, GameState.OVER_HUNG)


if __name__ == "__main__":
    unittest.main()
