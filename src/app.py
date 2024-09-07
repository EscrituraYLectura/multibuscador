from flask import Flask
from markupsafe import escape

app = Flask(__name__)

@app.route("/")
def index():
    return """
    <h1>Multibuscador de libros</h1>
    <h2>v. 1.0.0</h2>
    <form>
        <label for="titulo">Título del libro:</label>
        <input type="text" name="titulo">
        <input type="submit" value="Buscar">
    </form>
    """