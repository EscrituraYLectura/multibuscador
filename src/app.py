import json
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/", methods=("GET", "POST"))
def index(title=""):
    if request.method == "POST":
        title = request.form["title"]

    return render_template("index.html", result=search(title))


def search(title):
    links = []

    if title == "":
        return ""

    with open("data.json", "r") as json_read:
        json_data = json.load(json_read)

    for name, content in json_data.items():
        links.append(
            [content["url"].replace("|TITLEQUERYSPACE|", content["separator"].join(title.split())), name]
        )

    return links