var userLine_myChart;
var userLine_option;



function initialize(){
    $.ajax({
        type: "GET",
        url: 'http://127.0.0.1:5000/get_user_line',
        data:  {
            user:"e651044e474c63a9"
        },
        dataType: "JSON",
        success: function (data) {
            var chartDom = document.getElementById('user-article-tree');
            userLine_myChart = echarts.init(chartDom);
            let base = +new Date(2020, 0, 0);
            let oneDay = 24 * 3600 * 1000;
            let date = [];
            let true_data_download = [];
            let true_data_scan = [];
            let true_data_search = [];
            for (let i = 1; i < 366; i++) {
                let now = new Date(base += oneDay);
                date.push([now.getFullYear(), (now.getMonth() + 1), now.getDate()].join('-'));
                let cur_date = [now.getFullYear(), (now.getMonth() + 1).toString().padStart(2,'0'), now.getDate().toString().padStart(2,'0')].join('-');
                if(data["下载"][cur_date]){
                    true_data_download.push(data["下载"][cur_date])
                }
                else{
                     true_data_download.push(0);
                }

                 if(data["浏览"][cur_date]){
                    true_data_scan.push(data["浏览"][cur_date])
                }
                else{
                     true_data_scan.push(0);
                }

                 if(data["检索"][cur_date]){
                    true_data_search.push(data["检索"][cur_date])
                }
                else{
                     true_data_search.push(0);
                }
            }
             userLine_option =  {
            tooltip: {
                trigger: 'axis',
                textStyle: {
                    fontSize: 6
                }
            },
            title: {
                text: "用户行为时段折线图",
                textStyle: {
                    fontSize: 18,
                },
                top: "1%"
            },
            legend: {
                data: ['下载', '浏览', '检索'],
                textStyle: {
                    fontSize: 10
                },
                icon: "pin",
                top: '5%'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: date
            },
            yAxis: {
                type: 'value',
                boundaryGap: false,
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 100
            }, {
                start: 0,
                end: 100
            }],
            series: [
                {
                    name: '下载',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    data: true_data_download,
                },
                {
                    name: '浏览',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    data: true_data_scan,
                },
                {
                    name: '检索',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    data: true_data_search,
                },

            ]
        };

            userLine_option && userLine_myChart.setOption(userLine_option);

        }
    })
}

function setUser(user){
    $.ajax({
        type: "GET",
        url: 'http://127.0.0.1:5000/get_user_line',
        data:  {
            user:user
        },
        dataType: "JSON",
        success: function (data) {
            let base = +new Date(2020, 0, 0);
            let oneDay = 24 * 3600 * 1000;
            let true_data_download = [];
            let true_data_scan = [];
            let true_data_search = [];
            for (let i = 1; i < 366; i++) {
                let now = new Date(base += oneDay);
                let cur_date = [now.getFullYear(), (now.getMonth() + 1).toString().padStart(2,'0'), now.getDate().toString().padStart(2,'0')].join('-');
                if(data["下载"][cur_date]){
                    true_data_download.push(data["下载"][cur_date])
                }
                else{
                     true_data_download.push(0);
                }

                 if(data["浏览"][cur_date]){
                    true_data_scan.push(data["浏览"][cur_date])
                }
                else{
                     true_data_scan.push(0);
                }

                 if(data["检索"][cur_date]){
                    true_data_search.push(data["检索"][cur_date])
                }
                else{
                     true_data_search.push(0);
                }
            }

            userLine_option.series[0].data = true_data_download;
            userLine_option.series[1].data = true_data_scan;
            userLine_option.series[2].data = true_data_search;

            userLine_myChart.setOption(userLine_option);
        }
    })
}

initialize();

