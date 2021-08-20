let chart = echarts.init(document.getElementById('word-cloud'));

let keywords = {
    "护理": 1129,
    "治疗": 1041,
    "应用": 976,
    "对策": 882,
    "诊断": 861,
    "儿童": 818,
    "综述": 712,
    "影响因素": 610,
    "问题": 575,
    "预后": 574,
    "大型底栖动物": 494,
    "现状": 484,
    "人工智能": 478,
    "危险因素": 472,
    "大数据": 459
};
console.log(keywords);
let data = [];
for (let name in keywords) {
    data.push({
        name: name,
        value: Math.sqrt(keywords[name])
    })
}

let maskImage = new Image();

let option = {
    series: [ {
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
    } ]
};

maskImage.onload = function () {
    option.series[0].maskImage
    chart.setOption(option);
}

maskImage.src = '../static/resource/logo.png';

function setWordCloud(type,month) {
    $.ajax({
        type: "GET",
        url: 'http://127.0.0.1:5000/wordCloud',
        data:  {
            month: month,
            type: type
        },
        dataType: "JSON",
        success: function (res) {
            console.log(res)
            data=[];
            for (let name in res) {
                data.push({
                    name: name,
                    value: Math.sqrt(res[name])
                })
            }
            option.series[0]['data']=data;
            chart.setOption(option);
        }
    });
}