
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
            keywords={
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
                "大数据": 459,
                "指南": 430,
                "磁共振成像": 419,
                "并发症": 418,
                "管理": 409,
                "糖尿病": 406,
                "设计": 386,
                "疗效": 378,
                "研究进展": 363,
                "发展": 356,
                "策略": 352,
                "分析": 350,
                "影响": 336,
                "大学生": 334,
                "老年人": 328,
                "生活质量": 324
            };
            let wcData=Object.keys(keywords).map(function (item,index) {
                return {name:item,value:Math.sqrt(keywords[item])};
            });
            let chart_word_cloud = echarts.init(document.getElementById('word-cloud'));
            let maskImage = new Image();
            let option_word_cloud = {

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
                    data: wcData.sort(function (a, b) {
                        return b.value  - a.value;
                    })
                } ]
            };

            maskImage.onload = function () {
                option_word_cloud.series[0].maskImage;
            };
            maskImage.src = '../static/resource/logo.png';

            option_word_cloud.series[0]['data']=wcData;
            chart_word_cloud.setOption(option_word_cloud);
        }
    });
}
setWordCloud(0,4);