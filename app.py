from flask import Flask,render_template,request,jsonify
from flask_cors import *
from config import Config
import json
from tools import *

app = Flask(__name__)
# 添加配置
app.config.from_object(Config)
CORS(app, supports_credentials=True)

# 主界面
@app.route('/')
def index():
    return render_template("test.html")
    # return render_template("index.html")

@app.route("/wordCloud", methods=["GET"])
def getwordCloud():
    args = request.args.to_dict()
    print(args)
    month = int(args["month"])
    t = int(args["type"])

    with open(toFileName(t,month), encoding='utf-8') as f:
        data = json.load(f)

    return data

@app.route('/anomaly',methods=["POST","GET"])
def getAnomalyAnalysis():
    viewInfo=get_view_info()
    print(viewInfo)
    return jsonify(viewInfo)


if __name__ == '__main__':
    app.run()
