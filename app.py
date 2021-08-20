from flask import Flask,render_template,request,jsonify
from flask_cors import *
from config import Config
import json
app = Flask(__name__)
# 添加配置
app.config.from_object(Config)
CORS(app, supports_credentials=True)

TYPES = ['下载', '浏览', '检索']
def toFileName(t, month):
    if month < 10:
        month = '0' + str(month)
    else:
        month = str(month)
    filename = 'E:\\Python Projects\\dataProcess\\topWords\\Tops_' + month + '_' + TYPES[t] + '.json'
    return filename

# 主界面
@app.route('/')
def index():
    return render_template("index.html")

@app.route("/wordCloud", methods=["GET"])
def getwordCloud():
    args = request.args.to_dict()
    print(args)
    month = int(args["month"])
    t = int(args["type"])

    with open(toFileName(t,month), encoding='utf-8') as f:
        data = json.load(f)

    return data

if __name__ == '__main__':
    app.run()
