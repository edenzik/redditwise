from flask import Flask, request, send_from_directory, jsonify
import time
import random
import time
from subprocess import Popen, PIPE, STDOUT
import os
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
    reddit_comment = request.form['comment']
    parent_comment = request.form['parent_comment']
    reddit_comment = reddit_comment.replace("\n","").replace("\"","").replace("\t","")
    cmd = '{0}/bin/mallet classify-file --input <(echo "{1}") --output - --classifier {2}'.format(os.environ['MALLET_HOME'],reddit_comment,os.environ['CLASSIFIER_OUT'])

    process = Popen(cmd, shell=True, stdin=PIPE, stdout=PIPE, stderr=STDOUT, close_fds=True,executable='/bin/bash')

    output = process.stdout.read()
    print output

    good = float(output.split("\t")[4].strip())*100
    return str(good)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
