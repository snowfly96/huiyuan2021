from flask import Flask,render_template,request,jsonify,redirect,url_for
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
    return render_template("article.html")

@app.route('/article')
def article_interface():
    header={
        'path':"热点文章",
        'articleColor': "black",
        'personColor':"#a6a6a6"
    }
    return render_template("article.html",header=header)

@app.route('/person')
def person_interface():
    header = {
        'path': "异常用户",
        'articleColor': "#a6a6a6",
        'personColor': "black"
    }
    return render_template("person.html",header=header)

@app.route("/wordCloud", methods=['GET'])
def getwordCloud():
    args = request.args.to_dict()
    month = int(args["month"])
    t = int(args["type"])

    with open(toFileName(t,month), encoding='utf-8') as f:
        data = json.load(f)


    return data

@app.route('/anomaly',methods=['POST','GET'])
def getAnomalyAnalysis():
    viewInfo=get_view_info()
    return jsonify(viewInfo)

@app.route('/list',methods=['POST','GET'])
def getListData():
    with open('./static/data/top_articles_d.json','rb') as f:
        top_article_json = json.load(f)

    return jsonify(top_article_json)


if __name__ == '__main__':
    app.run()
