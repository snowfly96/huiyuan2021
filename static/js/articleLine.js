var cur_article_line_type = "day";
var option;
var chart
var cur_article = "cqsxyxb202002001"

$(() => {
    $('#select_time').change(() => {
        cur_article_line_type = $('#select_time').val();
        setArticle(cur_article, cur_article_line_type);
    });
});


function drawArticleLines() {
    $.ajax({
        type: "GET",
        url: 'http://127.0.0.1:5000/get_article_data',
        data: {
            article: cur_article,
            type: cur_article_line_type
        },
        dataType: "JSON",
        success: function (data) {
            chart = echarts.init(document.getElementById('article-line'));
            var dateList = [];
            var valueList = [];
            if (cur_article_line_type == "day") {
                dateList = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                for (let i = 0; i < 7; i++) {
                    if (data[i]) {
                        valueList.push(data[i])
                    } else {
                        valueList.push(0);
                    }
                }
            } else if (cur_article_line_type == "month") {
                for (let i = 1; i <= 12; i++) {
                    dateList.push(i);
                    if (data[i]) {
                        valueList.push(data[i])
                    } else {
                        valueList.push(0);
                    }
                }
            } else {
                dateList = ["0-1点", "1-2点", "2-3点", "3-4点", "4-5点", "5-6点", "6-7点", "7-8点", "8-9点", "9-10点", "10-11点", "11-12点", "12-13点", "13-14点", "14-15点", "15-16点", "16-17点", "17-18点", "18-19点", "19-20点", "20-21点", "21-22点", "22-23点", "23-24点"];
                for (let i = 0; i < 24; i++) {
                    if (data[i]) {
                        valueList.push(data[i])
                    } else {
                        valueList.push(0);
                    }
                }
            }

            option = {
                title: {
                    text: '单篇文章时段折线图'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['浏览', '下载']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    boundaryGap: false,
                    data: dateList
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '浏览',
                        type: 'line',
                        data: valueList
                    },
                    {
                        name: '下载',
                        type: 'line',
                        data: valueList
                    }
                ]
            };
            chart.setOption(option);
        }
    })

}

function setArticle(article, type = "day") {
    cur_article = article;
    $.ajax({
        type: "GET",
        url: 'http://127.0.0.1:5000/get_article_data',
        data: {
            article: article,
            type: cur_article_line_type
        },
        dataType: "JSON",
        success: function (data) {
            var dateList = [];
            var valueList = [];
            if (cur_article_line_type == "day") {
                dateList = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                for (let i = 0; i < 7; i++) {
                    if (data[i]) {
                        valueList.push(data[i])
                    } else {
                        valueList.push(0);
                    }
                }
            } else if (cur_article_line_type == "month") {
                for (let i = 1; i <= 12; i++) {
                    dateList.push(i);
                    if (data[i]) {
                        valueList.push(data[i])
                    } else {
                        valueList.push(0);
                    }
                }
            } else {
                dateList = ["0-1点", "1-2点", "2-3点", "3-4点", "4-5点", "5-6点", "6-7点", "7-8点", "8-9点", "9-10点", "10-11点", "11-12点", "12-13点", "13-14点", "14-15点", "15-16点", "16-17点", "17-18点", "18-19点", "19-20点", "20-21点", "21-22点", "22-23点", "23-24点"];
                for (let i = 0; i < 24; i++) {
                    if (data[i]) {
                        valueList.push(data[i])
                    } else {
                        valueList.push(0);
                    }
                }
            }

            option.xAxis.data = dateList;
            option.series[0].data = valueList;
            option.series[1].data = valueList;

            chart.setOption(option);
        }
    })
}

drawArticleLines();
