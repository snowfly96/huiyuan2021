function drawCirclePacking() {
    var dom = document.getElementById("circle-packing");
    var myChart = echarts.init(dom);
    var app = {};

    var option;
    let classdatapath='../static/data/data_circle_echarts_zh.json';

    let testdata='';
    $.when(
        $.get(classdatapath),
        $.getScript('https://cdn.jsdelivr.net/npm/d3-hierarchy@2.0.0/dist/d3-hierarchy.min.js')
    ).done(function (res) {
        console.log(res[0])
        run(res[0]);
    });

    function run(rawData) {

        var dataWrap = prepareData(rawData);

        initChart(dataWrap.seriesData, dataWrap.maxDepth);
    }

    function prepareData(rawData) {
        var seriesData = [];
        var maxDepth = 0;

        function convert(source, basePath, depth) {
            if (source == null) {
                return;
            }
            if (maxDepth > 5) {
                return;
            }
            maxDepth = Math.max(depth, maxDepth);

            seriesData.push({
                id: basePath,
                value: Math.sqrt(source.$count),
                depth: depth,
                index: seriesData.length
            });

            for (var key in source) {
                if (source.hasOwnProperty(key) && !key.match(/^\$/)) {
                    var path = basePath + '.' + key;
                    convert(source[key], path, depth + 1);
                }
            }
        }

        convert(rawData, 'option', 0);

        return {
            seriesData: seriesData,
            maxDepth: maxDepth
        };
    }

    function initChart(seriesData, maxDepth) {
        var displayRoot = stratify();

        function stratify() {
            return d3.stratify()
                .parentId(function (d) {
                    return d.id.substring(0, d.id.lastIndexOf('.'));
                })(
                    seriesData
                )
                .sum(function (d) {
                    return d.value || 0;
                })
                .sort(function (a, b) {
                    return b.value - a.value;
                });
        }

        function overallLayout(params, api) {
            var context = params.context;
            d3.pack()
                .size([api.getWidth() - 2, api.getHeight() - 2])
                .padding(3)(displayRoot);

            context.nodes = {};
            displayRoot.descendants().forEach(function (node, index) {
                context.nodes[node.id] = node;
            });
        }

        function renderItem(params, api) {
            var context = params.context;

            // Only do that layout once in each time `setOption` called.
            if (!context.layout) {
                context.layout = true;
                overallLayout(params, api);
            }

            var nodePath = api.value('id');
            var node = context.nodes[nodePath];

            if (!node) {
                // Reder nothing.
                return;
            }

            var isLeaf = !node.children || !node.children.length;

            var focus = new Uint32Array(node.descendants().map(function (node) {
                return node.data.index;
            }));

            var nodeName = isLeaf
                ? nodePath.slice(nodePath.lastIndexOf('.') + 1).split(/(?=[A-Z][^A-Z])/g).join('\n')
                : '';

            var z2 = api.value('depth') * 2;

            return {
                type: 'circle',
                focus: focus,
                shape: {
                    cx: node.x,
                    cy: node.y,
                    r: node.r
                },
                transition: ['shape'],
                z2: z2,
                textContent: {
                    type: 'text',
                    style: {
                        // transition: isLeaf ? 'fontSize' : null,
                        text: nodeName,
                        fontFamily: 'Arial',
                        width: node.r * 1.3,
                        overflow: 'truncate',
                        fontSize: node.r / 2
                    },
                    emphasis: {
                        style: {
                            overflow: null,
                            fontSize: Math.max(node.r / 3, 12)
                        }
                    }
                },
                textConfig: {
                    position: 'inside'
                },
                style: {
                    fill: api.visual('color')
                },
                emphasis: {
                    style: {
                        fontFamily: 'Arial',
                        fontSize: 12,
                        shadowBlur: 20,
                        shadowOffsetX: 3,
                        shadowOffsetY: 5,
                        shadowColor: 'rgba(0,0,0,0.3)'
                    }
                }
            };
        }

        var option = {
            dataset: {
                source: seriesData
            },
            title: {
                    text: '文献领域分类气泡图'
                },
            tooltip: {},
            visualMap: {
                show: false,
                min: 0,
                max: maxDepth,
                dimension: 'depth',
                inRange: {
                    color: ['white', '#ffcc99']
                }
            },
            hoverLayerThreshold: Infinity,
            series: {
                type: 'custom',
                renderItem: renderItem,
                progressive: 0,
                coordinateSystem: 'none',
                encode: {
                    tooltip: 'value',
                    itemName: 'id'
                }
            }
        };

        myChart.setOption(option);

        myChart.on('click', { seriesIndex: 0 }, function (params) {
            drillDown(params.data.id);
        });

        function drillDown(targetNodeId) {
            displayRoot = stratify();
            if (targetNodeId != null) {
                displayRoot = displayRoot.descendants().find(function (node) {
                    return node.data.id === targetNodeId;
                });
            }
            // A trick to prevent d3-hierarchy from visiting parents in this algorithm.
            displayRoot.parent = null;

            myChart.setOption({
                dataset: {
                    source: seriesData
                }
            });
        }

        // Reset: click on the blank area.
        myChart.getZr().on('click', function (event) {
            if (!event.target) {
                drillDown();
            }
        });
    }

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }
}
// drawCirclePacking();

function drawTypeRatio() {
     var chartDom = document.getElementById('circle-packing');
     var myChart = echarts.init(chartDom);
     var type_label={
             "A": "马克思主义、列宁主义、毛泽东思想",
            "B": "哲学",
            "C": "社会科学总论",
            "D": "政治、法律",
            "E": "军事",
            "F": "经济",
            "G": "文化、科学、教育、体育",
            "H": "语言、文字",
            "I": "文学",
            "J": "艺术",
            "K": "历史、地理",
            "N": "自然科学总论",
            "O": "数理科学和化学",
            "P": "天文学、地理科学",
            "Q": "生物科学",
            "R": "医学卫生",
            "S": "农业科学",
            "T": "工业技术",
            "U": "交通运输",
            "V": "航空、航天",
            "X": "安全科学",
            "Z": "综合性图书"
     };
    $.get("./static/data/article_type_matrix.json",function (_rawData) {
        var data = _rawData["data"];
        data=data.map(function (item) {
            return [item[1],item[0],item[2]];
        });
        var data_type=data.map(function (item) {
            return item[1];
        });
        data_type=[...new Set(data_type)];

        console.log(data);
        option = {
            title: {
                text: '各类文献下载浏览比'
            },
            legend: {
                data: ['文献'],
                left: 'right'
            },
            tooltip: {
                position: 'top',
                // formatter: function (params) {
                //     return params.value[2] + ' commits in ' + hours[params.value[0]] + ' of ' + days[params.value[1]];
                // }
            },
            grid: {
                left: 20,
                bottom: 10,
                right: "10%",
                containLabel: true
            },
            xAxis: {},
            yAxis: {
                type: 'category',
                boundaryGap: false,
                data: data_type,
                axisLabel:{
                    formatter: function (item) {
                        return type_label[item];
                    },
                    fontSize: 10
                }
            },
            series: [{
                symbolSize: function (val) {
                    return Math.sqrt(val[2]);
                },
                itemStyle:{
                    normal:{
                            color:params=>{
                                // console.log(params.data);
                                return "bisque";
                            }
                        }
                    },
                data: data,
                type: 'scatter'
            }]
        };

        option && myChart.setOption(option);
    })
}
drawTypeRatio();