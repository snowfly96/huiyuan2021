var cur_article_line_type = "day";
var option;
var chart
var cur_article = "cqsxyxb202002001"

    $(() => {
            $('#select_time').change(() => {
                cur_article_line_type = $('#select_time').val();
                setArticle(cur_article,cur_article_line_type);
            });
        });


function  drawArticleLines() {
    $.ajax({
        type: "GET",
        url: 'http://127.0.0.1:5000/get_article_data',
        data:  {
            article: cur_article,
            type:cur_article_line_type
        },
        dataType: "JSON",
        success: function (data) {
            console.log(data)
            chart=echarts.init(document.getElementById('article-line'));
            var dateList = [];
            var valueList= [];
            var max;
            for(let date in data){
                dateList.push(date);
                valueList.push(data[date]);
                if(!max){
                    max = data[date];
                }
                else{
                    max = Math.max(data[date],max);
                }
            }

            option = {
                // Make gradient line here
                visualMap: [{
                    show: false,
                    type: 'continuous',
                    seriesIndex: 0,
                    min: 0,
                    max: max
                }, {
                    show: false,
                    type: 'continuous',
                    seriesIndex: 1,
                    min: 0,
                    max:max
                }],


                title: [{
                    left: 'center',
                    text: '单篇文章时段折线图'
                }, {
                    top: '55%',
                    left: 'center',
                }],
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: [{
                    data: dateList
                }, {
                    data: dateList,
                    gridIndex: 1
                }],
                yAxis: [{
                }, {
                    gridIndex: 1
                }],
                grid: [{
                    bottom: '50%'
                }, {
                    top: '50%'
                }],
                series: [{
                    type: 'line',
                    showSymbol: false,
                    data: valueList
                }, {
                    type: 'line',
                    showSymbol: false,
                    data: valueList,
                    xAxisIndex: 1,
                    yAxisIndex: 1
                }]
            };
            chart.setOption(option);
        }
    })

}

function setArticle(article,type = "day"){
    cur_article = article;
    $.ajax({
        type: "GET",
        url: 'http://127.0.0.1:5000/get_article_data',
        data:  {
            article: article,
            type:cur_article_line_type
        },
        dataType: "JSON",
        success: function (data) {
            console.log(data)
            var dateList = [];
            var valueList= [];
            var max;
            for(let date in data){
                dateList.push(date);
                valueList.push(data[date]);
                if(!max){
                    max = data[date];
                }
                else{
                    max = Math.max(data[date],max);
                }
            }

            option.visualMap[0].max = max;
            option.visualMap[1].max = max;
            option.xAxis[0].data = dateList;
            option.xAxis[1].data = dateList;
            option.series[0].data = valueList;
            option.series[1].data = valueList;

            chart.setOption(option);
        }
    })
}
drawArticleLines();
