
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
// setWordCloud(0,4);