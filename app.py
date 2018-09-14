from flask import Flask

app = Flask(__name__)

@app.route('/users/<string:username>')

def hello_world(username=None):

    return("Hello {}!".format(username))

if __name__ == '__main__':
    app.debug = True
    app.run(host = '0.0.0.0', port = 5000)