from flask import Flask, request, send_from_directory
import time
app = Flask(__name__)

@app.route("/<path>")
def files(path):
    print path
    return send_from_directory('static', path)

@app.route("/css/<path>")
def css(path):
    return send_from_directory('static/css', path)

@app.route("/img/<path>")
def img(path):
    return send_from_directory('static/img', path)

@app.route("/js/<path>")
def js(path):
    return send_from_directory('static/js', path)

@app.route("/api", methods=['POST'])
def api():
    print request.get_data()
    return "hey guys"

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
