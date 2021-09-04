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

    // 创建过滤得到的用户
    function createFilterTable(tableMatrix) {
        var tableViewSelector=$("#anomaly-table");
        tableViewSelector.empty();
        var tableFormOpts={
            row:tableMatrix.length,
            col:tableMatrix[0].length+1,
            header:["index","user_id","times"]
        };

        // create table
        var tableForm=$("<table border='1' id='filter-table'>");
        tableForm.appendTo(tableViewSelector);
        var tr=$("<tr></tr>");
        tr.appendTo(tableForm);
        // add header
        for(let j=0;j<tableFormOpts.col;j++){
            let th=$("<th>"+tableFormOpts.header[j]+"</th>");
            th.appendTo(tr);
        }
        tableViewSelector.append("</table>");

        for(let i=0;i<tableFormOpts.row;i++){
            // 暂时向指定行数
            let tr=$("<tr class='filter-row'></tr>");
            tr.appendTo(tableForm);
            for(let j=0;j<tableFormOpts.col;j++){
                if(j===0){
                    tr.append($("<td>"+(i+1)+"</td>"))
                }
                else{
                    tr.append($("<td>"+tableMatrix[i][j-1]+"</td>"))
                }
            }
        }

    }
    // 创建个人关键词词云
    function createCurrentUserWordCloud(keywords) {
        var chart=echarts.init(document.getElementById("anomaly-wc"));

        var data=Object.keys(keywords).map(function (item,index) {
            return {name:item,value:Math.sqrt(keywords[item])};
        });
        var wcOption={
            series:[{
                type: 'wordCloud',
                sizeRange: [5, 30],
                rotationRange: [0, 0],
                rotationStep: 45,
                gridSize: 2,
                shape: 'pentagon',
                //maskImage: maskImage,
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
                data: data.sort(function (a, b) {
                    return b.value  - a.value;
                })
            }]
        };

        wcOption && chart.setOption(wcOption);
    }
    // 创建个人下载记录
    function createCurrentUserLine(curUserLine) {
        var xAxisData=Object.keys(curUserLine).map(function (item) {
            // return item.slice(5,10)+'\n'+item.slice(11,16);
            return item.slice(5,16)
        });
        console.log(xAxisData);
        var yAxisData=Object.keys(curUserLine).map(function (item) {
            return curUserLine[item];
        });
        var chart=echarts.init(document.getElementById("anomaly-line"));

        var lOption = {
            grid:{
                left: 0,
                right:'0%',
                height: '100%',
                bottom: 0
            },
            xAxis: {
                type: 'category',
                data: xAxisData,
                axisLabel: {
                    rotate: -30,
                },
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: yAxisData,
                type: 'line',
                smooth: true
            }]
        };

        lOption && chart.setOption(lOption);
    }

    function drawUserKeyWords() {
        var chart=echarts.init(document.getElementById("user-word-cloud"));

        option = {
            legend: {
                top: 'bottom'
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            series: [
                {
                    name: '面积模式',
                    type: 'pie',
                    radius: [20, 80],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 8
                    },
                    data: [
                        {value: 40, name: '治疗'},
                        {value: 38, name: '护理'},
                        {value: 32, name: '应用'},
                        {value: 30, name: '诊断'},
                        {value: 28, name: '疾病'},
                        {value: 26, name: '大数据'},
                        {value: 22, name: 'AI'},
                        {value: 18, name: '综述'},
                        {valye: 16, name: '其他'}
                    ]
                }
            ]
        };
        option && chart.setOption(option);
    }
    drawUserKeyWords();
    
    function drawTopUserArticle() {
        var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';

        var chartDom = document.getElementById('ab-user-line');
        var myChart = echarts.init(chartDom);
        var option;

        myChart.showLoading();
        $.get(ROOT_PATH + '/data/asset/data/flare.json', function (data) {
            myChart.hideLoading();

            myChart.setOption(option = {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series:[
                    {
                        type: 'tree',

                        data: [data],

                        left: '2%',
                        right: '2%',
                        top: '8%',
                        bottom: '20%',

                        symbol: 'emptyCircle',

                        orient: 'vertical',

                        expandAndCollapse: true,

                        label: {
                            position: 'top',
                            rotate: -90,
                            verticalAlign: 'middle',
                            align: 'right',
                            fontSize: 9
                        },

                        leaves: {
                            label: {
                                position: 'bottom',
                                rotate: -90,
                                verticalAlign: 'middle',
                                align: 'left'
                            }
                        },

                        animationDurationUpdate: 750
                    }
                ]
            });
        });

        option && myChart.setOption(option);
    }
    drawTopUserArticle();

    function drawUserLine() {
        var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';

        var chartDom = document.getElementById('user-article-tree');
        var myChart = echarts.init(chartDom);
        var option;

        $.get(ROOT_PATH + '/data/asset/data/life-expectancy-table.json', function (_rawData) {
            run(_rawData);
        });

        function run(_rawData) {

            option = {
                dataset: [{
                    id: 'dataset_raw',
                    source: _rawData
                }, {
                    id: 'dataset_since_1950_of_germany',
                    fromDatasetId: 'dataset_raw',
                    transform: {
                        type: 'filter',
                        config: {
                            and: [
                                { dimension: 'Year', gte: 1950 },
                                { dimension: 'Country', '=': 'Germany' }
                            ]
                        }
                    }
                }, {
                    id: 'dataset_since_1950_of_france',
                    fromDatasetId: 'dataset_raw',
                    transform: {
                        type: 'filter',
                        config: {
                            and: [
                                { dimension: 'Year', gte: 1950 },
                                { dimension: 'Country', '=': 'France' }
                            ]
                        }
                    }
                }],
                title: {
                    text: '用户下载浏览记录折线图'
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    nameLocation: 'middle'
                },
                yAxis: {
                    name: 'Income'
                },
                series: [{
                    type: 'line',
                    datasetId: 'dataset_since_1950_of_germany',
                    showSymbol: false,
                    encode: {
                        x: 'Year',
                        y: 'Income',
                        itemName: 'Year',
                        tooltip: ['Income'],
                    }
                }, {
                    type: 'line',
                    datasetId: 'dataset_since_1950_of_france',
                    showSymbol: false,
                    encode: {
                        x: 'Year',
                        y: 'Income',
                        itemName: 'Year',
                        tooltip: ['Income'],
                    }
                }]
            };

            myChart.setOption(option);

        }

        option && myChart.setOption(option);
    }
    drawUserLine();
}
abnormalAnalysisView();
