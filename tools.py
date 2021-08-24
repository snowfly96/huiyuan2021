"""
存放左右工具类函数
"""
import pandas as pd
import numpy as np
import os
from collections import Counter
import time
from matplotlib import pyplot as plt

TYPES = ['下载', '浏览', '检索']
def toFileName(t, month):
    if month < 10:
        month = '0' + str(month)
    else:
        month = str(month)
    filename = 'E:\\Python Projects\\dataProcess\\topWords\\Tops_' + month + '_' + TYPES[t] + '.json'
    return filename



'''
异常检测过滤函数
'''
# 日期格式转化数字
def date_to_num(dt):
    return time.mktime(time.strptime(dt, "%Y-%m-%d %H:%M:%S"))

# 数字转化为日期格式
def num_to_date(ct):
    return time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(ct))

# 根据用户选择进行数据过滤
paras={
        'type':'download',
        'start_date':'2020-01-16 00:00:00',
        'end_date':'2020-01-20 00:00:00',
        'start_time':8,
        'end_time':16,
        'frequency_times':10,
        'frequency_span':10,
        'area':''
    }
def filter_user_by_selection(paras):
    # 过滤类型
    file_dir='../data/'+paras['type']
    files = os.listdir(file_dir)
    # 初步过滤日期
    start_month=int(paras['start_date'].split('-')[1])
    end_month=int(paras['end_date'].split('-')[1])
    user_db = pd.read_csv(os.path.join(file_dir, files[start_month-1]))

    for file in files[1:end_month]:
        temp_content = pd.read_csv(os.path.join(file_dir, file))
        user_db = pd.concat([user_db, temp_content])

    # 过滤日期
    start_time = date_to_num(paras['start_date'])
    end_time = date_to_num(paras['end_date'])
    user_db['DATETIME'] = [(date_to_num(tm) - start_time) for tm in user_db['DATETIME']]
    user_db=user_db[user_db['DATETIME'].apply(lambda x:int(x)>=0 and int(x)<=(int(end_time)-int(start_time)))]

    # 过滤时间
    user_db=user_db[user_db['DATETIME'].apply(lambda x:int(x)%24>=paras['start_time'] and int(x)%24<=paras['end_time'])]

    # 过滤频率-第一遍
    user_ID=user_db['USER_ID']
    user_ID_cnt_dict=dict(Counter(list(user_ID)))
    user_ID_cnt_dict={key:user_ID_cnt_dict[key] for key in user_ID_cnt_dict.keys() if user_ID_cnt_dict[key]>=paras['frequency_times']}
    user_db=user_db[user_db['USER_ID'].apply(lambda x:x in user_ID_cnt_dict.keys())]

    # 过滤频率-第二遍
    abnormal_user_ID=[]
    frequency_span=paras['frequency_span']*30
    for user in user_ID_cnt_dict.keys():
        cur_user=user_db[user_db['USER_ID']==user]
        cur_user_time_info=sorted(list(cur_user['DATETIME']))

        cur_user_time_dict=dict(Counter([int(tm / frequency_span) for tm in cur_user_time_info]))

        cur_user_X, cur_user_Y = [], []
        for i in range(int((end_time - start_time) / frequency_span)):
            cur_user_X.append(i)
            if i in list(cur_user_time_dict.keys()):
                cur_user_Y.append(cur_user_time_dict[i])
            else:
                cur_user_Y.append(0)
        # 滑动窗口
        window_arr = []
        window_size = 2
        abnormal_arr = []
        flag = 0
        for i in range(window_size):
            window_arr.append(cur_user_Y[i])
        for i in range(2, int((end_time - start_time) / frequency_span)):
            if sum(window_arr) >= paras['frequency_times']:
                cur_time = start_time + frequency_span * i
                abnormal_arr.append(num_to_date(cur_time))
                flag = 1
            window_arr.pop(0)
            window_arr.append(cur_user_Y[i])
        if flag == 1:
            abnormal_user_ID.append(user)
    abnormal_user_db=user_db[user_db['USER_ID'].apply(lambda x:x in abnormal_user_ID)]

    abnormal_user_db_dict={}
    for user in abnormal_user_ID:
        cur_user=abnormal_user_db[abnormal_user_db['USER_ID']==user]
        cur_user=cur_user.drop(['USER_ID'],axis=1)
        cur_user.index=[i for i in range(len(cur_user))]
        abnormal_user_db_dict[user]=cur_user
        # abnormal_user_db_dict[user]=cur_user.values

    abnormal_user_db.to_csv('./example.csv')

# 临时函数
dict_slice=lambda dt,start,end: {k:dt[k] for k in list(dt.keys())[start:end]}

def get_user_db():
    user_db=pd.read_csv('./static/data/example.csv',index_col=0)
    user_ID=list(user_db['USER_ID'])

    user_ID_cnt=dict(Counter(user_ID))
    viewInfo={}
    # 添加下载/浏览/检索次数
    for user in user_ID_cnt.keys():
        viewInfo[user]=[user_ID_cnt[user]]
    # 添加关键字/添加折线图参数
    for user in user_ID_cnt.keys():
        cur_user=user_db[user_db['USER_ID']==user]

        # 当前用户的关键字
        cur_user_keywords=list(cur_user['KEYWORDS'])
        cur_user_keywords_arr=[]
        for kd in cur_user_keywords:
            if str(kd)!='nan':
                kd_arr=str(kd).split(';')
                for st in kd_arr:
                    cur_user_keywords_arr.append(st)

        cur_user_keywords_dict=dict(Counter(cur_user_keywords_arr))
        cur_user_keywords_dict=dict(sorted(cur_user_keywords_dict.items(),key=lambda item:item[1],reverse=True))
        cur_user_keywords_dict=dict_slice(cur_user_keywords_dict,0,10)
        viewInfo[user].append(cur_user_keywords_dict)

        # 当前用户折线图
        start_time = date_to_num(paras['start_date'])
        end_time = date_to_num(paras['end_date'])
        frequency_span = paras['frequency_span'] * 30
        cur_user_line=sorted(list(cur_user['DATETIME']))
        cur_user_line_dict=dict(Counter([int(tm / frequency_span) for tm in cur_user_line]))

        viewInfo[user].append(cur_user_line_dict)

    print(viewInfo)

get_user_db()