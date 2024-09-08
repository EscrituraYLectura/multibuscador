from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/", methods=('GET', 'POST'))
def index(titulo=None):
    if request.method == 'POST':
        titulo = request.form['titulo']

    return render_template("index.html", busqueda=titulo)