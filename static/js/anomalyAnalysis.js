// 异常分析视图
function abnormalAnalysisView() {
    // 创建过滤得到的用户
    function createFilterTable(tableMatrix) {
        var tableViewSelector=$("");
        tableViewSelector.empty();
        var tableFormOpts={
            row:10,
            col:6,
            header:[]
        };

        // create table
        var tableForm=$("<table border='1' id='filter-table'>");
        tableForm.appendTo(tableViewSelector);
        var tr=$("<tr></tr>");
        tr.appendTo(tableForm);
        // add header
        for(let j=0;j<tableFormOpts.col;j++){
            let th=$("<th>"+tableFormOpts.header[j]+"</th>");
            th.appendTo(tr);
        }
        tableViewSelector.append("</table>");

        for(let i=0;i<tableFormOpts.row;i++){
            // 暂时向指定行数
            let tr=$("<tr class='filter-row'></tr>");
            tr.appendTo(tableForm);
            for(let j=0;j<tableFormOpts.col;j++){
                tr.append($("<td>"+(i+1)+"</td>"))
            }
        }

    }
    // 创建个人关键词词云
    function createCurrentUserWordCloud(keywords) {
        var chart=echarts.init(document.getElementById(""));

        var data=Object.keys(keywords).map(function (item,index) {
            return {name:item,value:Math.sqrt(keywords[item])};
        });
        var wcOption={
            series:[{
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
            }]
        };

        wcOption && chart.setOption(wcOption);
    }
    // 创建个人下载记录
    function createCurrentUserLine() {

        var lOption = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
            }]
        };

        lOption && chart.setOption(lOption);
    }
}
