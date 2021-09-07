// 异常分析视图
function abnormalAnalysisView() {
    $.ajax("/anomaly",{
        type:'POST',
        data:{},
        dataType: 'json',
        success:function (data) {
            console.log(data);
            var table=Object.keys(data).map(function (item,index) {
                return [item,data[item][0]];
            });
            var curUser=Object.keys(data)[0];
            var curUserWC=data[curUser][1];
            var curUserLine=data[curUser][2];
            // createFilterTable(table);
            // createCurrentUserWordCloud(curUserWC);
            // createCurrentUserLine(curUserLine);
        },
        error:function (e) {
            alert("Anomaly: "+e);
        }
    });

    function drawTopUserArticle() {
        var chartDom = document.getElementById('ab-user-line');
        var myChart = echarts.init(chartDom);
        var option;
        myChart.showLoading();
        $.get('./static/data/abnormal_user_469.json', function (_rawData) {
            myChart.hideLoading();
            var curUser=Object.keys(_rawData)[0];
            var curUserInfo=_rawData[curUser];
            var curNewData={"name":curUser,"children":[]};
            Object.keys(curUserInfo).forEach(function (tp,index) {
                var keywords=curUserInfo[tp]["data"].map(function (ky) {
                    return {"name":ky[0],"cnt":ky[1]}
                });
                if(tp!=="下载"){
                    keywords=keywords.filter(function (item,index) {
                        return index<5;
                    });
                }
                curNewData["children"].push({"name":tp,"children":keywords});
            });
            var wcData=curNewData["children"][0]["children"].map(function (item,index) {
                return {name:item["name"],value:Math.sqrt(item["cnt"])};
            });

            myChart.setOption(option = {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                title: {
                    text: '用户关键字统计',
                },
                series:[
                    {
                        type: 'tree',
                        id: 0,
                        name: 'tree1',
                        data: [curNewData],

                        top: '2%',
                        left: '26%',
                        bottom: '2%',
                        right: '26%',

                        symbolSize: 10,

                        edgeShape: 'polyline',
                        edgeForkPosition: '63%',
                        initialTreeDepth: 3,

                        lineStyle: {
                            width: 2
                        },

                        label: {
                            backgroundColor: '#fff',
                            position: 'left',
                            verticalAlign: 'middle',
                            align: 'right',
                            fontSize: 9
                        },

                        leaves: {
                            label: {
                                position: 'right',
                                verticalAlign: 'middle',
                                align: 'left'
                            }
                        },

                        emphasis: {
                            focus: 'descendant'
                        },

                        expandAndCollapse: true,
                        animationDuration: 550,
                        animationDurationUpdate: 750
                    },
                    {
                    type: 'wordCloud',
                    top: '-20%',
                    left: '-8%',
                    bottom: '2%',
                    right: '20%',
                    sizeRange: [3, 20],
                    rotationRange: [0, 0],
                    rotationStep: 45,
                    gridSize: 2,
                    shape: 'pentagon',
                    drawOutOfBound: false,
                    textStyle: {
                        color: function () {
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        textStyle: {
                            color: 'red'
                        }
                    },
                    data: wcData.sort(function (a, b) {
                        return b.value  - a.value;
                    }).slice(0,150)
                }
                ]
            });
        });
        option && myChart.setOption(option);
    }
    drawTopUserArticle();


    var curUserID="2f65e3d1e9f4281e";
    function drawUserArticleList() {
        var chartDom = document.getElementById('user-word-cloud');
        var myChart = echarts.init(chartDom);
        var option;

        $.get('./static/data/user300/'+curUserID+'.json', function (_rawData) {
            var downloadData=_rawData['下载'];
            var browseData=_rawData['浏览'];
            downloadData=downloadData.map(function (item) {
                return [item['download_times'],item['browse_times'],item['title']];
            });
            console.log(downloadData);
            browseData=browseData.map(function (item) {
                return [item['download_times'],item['browse_times'],item['title']];
            });
            option = {
            xAxis: {
                max: 260,
            },
            yAxis: {
                max: 350,
            },
            title: {
                text: '用户质量下载浏览数据统计',
                // subtext: '用户: mfzz201312002',
                // left: 'center'
            },
            legend: {
                data: ['下载', '浏览'],
                textStyle: {
                    fontSize: 10
                },
                icon: "pin",
                top: '5%'
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 100
            }, {
                start: 0,
                end: 100
            },
            {
                show: true,
                yAxisIndex: 0,
                filterMode: 'empty',
                // width: 20,
                // height: '80%',
                // showDataShadow: false,
                left: '93%'
            }],
            series: [{
                name: "下载",
                symbolSize: 3,
                data: downloadData.slice(0,500),
                type: 'scatter',
                emphasis: {
                    focus: 'series',
                    label: {
                        show: true,
                        formatter: function (param) {
                            return param.data[2];
                        },
                        position: 'top'
                    }
                }
            },
            {
                name: "浏览",
                symbolSize: 3,
                data: browseData.slice(0,500),
                type: 'scatter',
                emphasis: {
                    focus: 'series',
                    label: {
                        show: true,
                        formatter: function (param) {
                            return param.data[2];
                        },
                        position: 'top'
                    }
                }
            }]
        };

        option && myChart.setOption(option);
        });
    }
    drawUserArticleList();
}
abnormalAnalysisView();
