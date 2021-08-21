var chartDom = document.getElementById('graph');
var myChart = echarts.init(chartDom);
var option;


var hour_search = [809, 478, 679, 404, 159, 178, 204, 319, 772, 1558, 2133, 1937, 1265, 1472, 1938, 2351, 2387, 1867, 1362, 1462, 1737, 1808, 1682, 1317]
var hour_scan = [1467, 1180, 901, 750, 660, 754, 835, 1018, 1287, 1730, 2014, 2058, 1775, 1870, 2009, 2089, 2047, 1894, 1667, 1633, 1692, 1809, 1897, 1724]
var hour_download = [140, 67, 36, 20, 15, 16, 30, 56, 150, 295, 392, 372, 236, 271, 351, 423, 437, 354, 250, 270, 330, 354, 336, 260]
var month_search = [493097, 919074, 1192945, 1057065, 923544, 963153, 658860, 676226, 850104, 785659, 1126970, 1404940]
var month_scan = [75376, 154716, 184601, 151255, 373051, 468323, 4542527, 3654756, 1964178, 486302, 656884, 705997]
var month_download = [128218, 190394, 258623, 224060, 190716, 148876, 112783, 114485, 100739, 149138, 186850, 189091]
var day_search = [29772, 31325, 33998, 33810, 30178, 25742, 26403]
var day_scan = [39951, 40755, 39179, 36432, 37216, 30660, 32392]
var day_download = [5859, 5994, 5791, 5717, 5282, 4582, 4899]

$(() => {
			$('#select_time').change(() => {
				setTimePoint($('#select_time').val());
			});
		});

function setTimePoint(val){
    console.log(val)
    myChart.clear();
    if(val == "hour"){
        option.xAxis.data = ["0-1点","1-2点","2-3点","3-4点","4-5点","5-6点","6-7点","7-8点","8-9点","9-10点","10-11点","11-12点","12-13点","13-14点","14-15点","15-16点","16-17点","17-18点","18-19点","19-20点","20-21点","21-22点","22-23点","23-24点"];
        option.series[0].data = hour_search;
        option.series[1].data = hour_scan;
        option.series[2].data = hour_download;
    }
    else if (val == "month"){
        option.xAxis.data = [1,2,3,4,5,6,7,8,9,10,11,12];
        option.series[0].data = month_search;
        option.series[1].data = month_scan;
        option.series[2].data = month_download;
    }
    else{
        option.xAxis.data = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        option.series[0].data = day_search;
        option.series[1].data = day_scan;
        option.series[2].data = day_download;
    }
     myChart.setOption(option);
}

option = {
    title: {
        text: '时段折线图'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['检索', '浏览', '下载']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    // toolbox: {
    //     feature: {
    //         saveAsImage: {}
    //     }
    // },
    xAxis: {
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '检索',
            type: 'line',
            data: day_search
        },
        {
            name: '浏览',
            type: 'line',
            data: day_scan
        },
        {
            name: '下载',
            type: 'line',
            data: day_download
        }
    ]
};

option && myChart.setOption(option);
