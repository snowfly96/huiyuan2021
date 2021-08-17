from flask import Flask,render_template,request,jsonify
from flask_cors import *
from config import Config

app = Flask(__name__)
# 添加配置
app.config.from_object(Config)
CORS(app, supports_credentials=True)


# 主界面
@app.route('/')
def index():
    return render_template("index.html")


if __name__ == '__main__':
    app.run()
