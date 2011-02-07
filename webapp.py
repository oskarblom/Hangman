from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def main():
    return render_template("index.html")

@app.route("/api/creategame")
def create_game():
    return "Hello World!"

if __name__ == "__main__":
    app.run(debug=True)
