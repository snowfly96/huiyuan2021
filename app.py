# coding=utf-8
from flask import Flask,render_template,request,jsonify,redirect,url_for
from flask_cors import *
from config import Config
import json
from tools import *
from datetime import datetime

app = Flask(__name__)
# 添加配置
app.config.from_object(Config)
CORS(app, supports_credentials=True)

# 主界面
@app.route('/')
def index():
    return redirect('/article')

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
    # map = {}
    # for i in range(1,13):
    #     with open(toFileName(t,i), encoding='utf-8') as f:
    #         data = json.load(f)
    #         for key in data.keys():
    #             if key in map:
    #                 map[key] += data[key]
    #             else:
    #                 map[key] = data[key]
    with open(toFileName(t, month), encoding='utf-8') as f:
        data = json.load(f)
    return data

@app.route('/anomaly',methods=['POST','GET'])
def getAnomalyAnalysis():
    viewInfo=get_view_info()
    return jsonify(viewInfo)

@app.route('/list',methods=['POST','GET'])
def getListData():
    with open('./static/data/article_top_list.json','rb') as f:
        top_article_json = json.load(f)
    with open('./static/data/abnormal_user_469_list.json','rb') as f:
        top_user_json = json.load(f)

    return jsonify({"topArticles":top_article_json,"topUsers":top_user_json})

@app.route('/get_article_data',methods=['GET'])
def getArticleData():
    args = request.args.to_dict()
    article = str(args["article"])
    type = str(args["type"])
    with open('./static/data/article_top_list.json','rb') as f:
        article_top_list = json.load(f)
    download_times = article_top_list[article][5]
    scan_times = article_top_list[article][6]
    map_download = {}
    map_scan = {}

    for time in download_times:
        time = datetime.strptime(time, '%Y-%m-%d %H:%M:%S')
        if type == 'month':
            if time.month in map_download:
                map_download[time.month] += 1
            else:
                map_download[time.month] = 1
        elif type == 'hour':
            if time.hour in map_download:
                map_download[time.hour] += 1
            else:
                map_download[time.hour] = 1
        else:
            if time.weekday() in map_download:
                map_download[time.weekday()] += 1
            else:
                map_download[time.weekday()] = 1

    for time in scan_times:
        time = datetime.strptime(time, '%Y-%m-%d %H:%M:%S')
        if type == 'month':
            if time.month in map_scan:
                map_scan[time.month] += 1
            else:
                map_scan[time.month] = 1
        elif type == 'hour':
            if time.hour in map_scan:
                map_scan[time.hour] += 1
            else:
                map_scan[time.hour] = 1
        else:
            if time.weekday() in map_scan:
                map_scan[time.weekday()] += 1
            else:
                map_scan[time.weekday()] = 1
    res = {"download":map_download,"scan":map_scan}
    print(res)
    return jsonify(res)

@app.route('/get_user_line',methods=['GET'])
def getUserLine():
    args = request.args.to_dict()
    user = str(args["user"])
    with open('./static/data/abnormal_user_469_timeline/'+user+'.json','rb') as f:
        user_line = json.load(f)
    return user_line

if __name__ == '__main__':
    app.run()
