var cur_article_line_type = "day";
var articleLineOption;
var articleLineChart
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
            articleLineChart = echarts.init(document.getElementById('article-line'));
            var dateList = [];
            var download_valueList = [];
            var scan_valueList = [];
            let download_data = data.download;
            let scan_data = data["scan"]
            if (cur_article_line_type === "day") {
                dateList = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
                for (let i = 0; i < 7; i++) {
                    if (download_data[i]) {
                        download_valueList.push(download_data[i])
                    } else {
                        download_valueList.push(0);
                    }
                    if (scan_data[i]) {
                        scan_valueList.push(scan_data[i])
                    } else {
                        scan_valueList.push(0);
                    }
                }
            }
            else if (cur_article_line_type === "month") {
                for (let i = 1; i <= 12; i++) {
                    dateList.push(i);
                    if (download_data[i]) {
                        download_valueList.push(download_data[i])
                    } else {
                        download_valueList.push(0);
                    }
                    if (scan_data[i]) {
                        scan_valueList.push(scan_data[i])
                    } else {
                        scan_valueList.push(0);
                    }
                }
            }else {
                dateList = ["0-1点", "1-2点", "2-3点", "3-4点", "4-5点", "5-6点", "6-7点", "7-8点", "8-9点", "9-10点", "10-11点", "11-12点", "12-13点", "13-14点", "14-15点", "15-16点", "16-17点", "17-18点", "18-19点", "19-20点", "20-21点", "21-22点", "22-23点", "23-24点"];
                for (let i = 0; i < 24; i++) {
                    if (download_data[i]) {
                        download_valueList.push(download_data[i])
                    } else {
                        download_valueList.push(0);
                    }
                    if (scan_data[i]) {
                        scan_valueList.push(scan_data[i])
                    } else {
                        scan_valueList.push(0);
                    }
                }
            }
            articleLineOption = {
                title: {
                    text: '文章时段折线图',
                    subtext: cur_article
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['下载', '浏览']
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
                        name: '下载',
                        type: 'line',
                        data: download_valueList
                    },
                    {
                        name: '浏览',
                        type: 'line',
                        data: scan_valueList
                    }
                ]
            };
            articleLineChart.setOption(articleLineOption);
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
            var download_valueList = [];
            var scan_valueList = [];
            let download_data = data.download;
            let scan_data = data["scan"]
            if (cur_article_line_type == "day") {
                dateList = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                for (let i = 0; i < 7; i++) {
                    if (download_data[i]) {
                        download_valueList.push(download_data[i])
                    } else {
                        download_valueList.push(0);
                    }
                    if (scan_data[i]) {
                        scan_valueList.push(scan_data[i])
                    } else {
                        scan_valueList.push(0);
                    }
                }
            }
            else if (cur_article_line_type == "month") {
                for (let i = 1; i <= 12; i++) {
                    dateList.push(i);
                    if (download_data[i]) {
                        download_valueList.push(download_data[i])
                    } else {
                        download_valueList.push(0);
                    }
                    if (scan_data[i]) {
                        scan_valueList.push(scan_data[i])
                    } else {
                        scan_valueList.push(0);
                    }
                }
            }else {
                dateList = ["0-1点", "1-2点", "2-3点", "3-4点", "4-5点", "5-6点", "6-7点", "7-8点", "8-9点", "9-10点", "10-11点", "11-12点", "12-13点", "13-14点", "14-15点", "15-16点", "16-17点", "17-18点", "18-19点", "19-20点", "20-21点", "21-22点", "22-23点", "23-24点"];
                for (let i = 0; i < 24; i++) {
                    if (download_data[i]) {
                        download_valueList.push(download_data[i])
                    } else {
                        download_valueList.push(0);
                    }
                    if (scan_data[i]) {
                        scan_valueList.push(scan_data[i])
                    } else {
                        scan_valueList.push(0);
                    }
                }
            }

            articleLineOption.xAxis.data = dateList;
            articleLineOption.series[0].data = download_valueList;
            articleLineOption.series[1].data = scan_valueList;

            articleLineChart.setOption(articleLineOption);
        }
    })
}

drawArticleLines();
