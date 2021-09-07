// 注意
// 注意
// 注意
//
// 现在词云的月份已经没有用了
// 目前展示的是全年的关键词词云

var chart_word_cloud;
var option_word_cloud;
var cur_type = 1;
var cur_month = 1;

$(() => {
            $('#month-select').change(() => {
                cur_month = $('#month-select').val();
                updateWordCloud(cur_type,$('#month-select').val());
            });
        });


function setWordCloud(type,month) {
    $.ajax({
        type: "GET",
        url: 'http://127.0.0.1:5000/wordCloud',
        data:  {
            month: month,
            type: type
        },
        dataType: "JSON",
        success: function (keywords) {
            console.log(keywords);
            let wcData=Object.keys(keywords).map(function (item,index) {
                return {name:item,value:Math.sqrt(keywords[item])};
            });

            chart_word_cloud = echarts.init(document.getElementById('word-cloud'));
            option_word_cloud = {
                title: {
                    text: '下载数据词云',
                    subtext: "1月"
                },
                series: [ {
                    type: 'wordCloud',
                    sizeRange: [5, 40],
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
                    }).slice(0,120)
                } ]
            };

            chart_word_cloud.setOption(option_word_cloud);
        }
    });
}

function updateWordCloud(type,month = cur_month){
    cur_type = type
    $.ajax({
        type: "GET",
        url: 'http://127.0.0.1:5000/wordCloud',
        data:  {
            month: month,
            type: type
        },
        dataType: "JSON",
        success: function (keywords) {
            console.log(keywords);
            let wcData=Object.keys(keywords).map(function (item,index) {
                return {name:item,value:Math.sqrt(keywords[item])};
            });

            option_word_cloud.series[0].data = wcData.sort(function (a, b) {
                        return b.value  - a.value;
                    }).slice(0,150)
            option_word_cloud.title.subtext = month+'月'
            chart_word_cloud.setOption(option_word_cloud);
        }
    });
}
setWordCloud(cur_type,1);

