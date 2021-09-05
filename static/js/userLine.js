    function drawUserLine() {
        var chartDom = document.getElementById('user-article-tree');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            title: {
                text: '用户下载浏览折线图'
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
            toolbox: {
                feature: {
                    // saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '下载',
                    type: 'line',
                    stack: '总量',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '浏览',
                    type: 'line',
                    stack: '总量',
                    data: [220, 182, 191, 234, 290, 330, 310]
                }
            ]
        };

        option && myChart.setOption(option);
    }
    drawUserLine();
