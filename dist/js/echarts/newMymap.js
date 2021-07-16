  var myChart = echarts.init(document.getElementById("chart-panel"));
            $('<div class="back">返回</div>').appendTo($('#chart-panel'));

            $('.back').click(function () {
                $(this).css({
                    "cursor": "not-allowed",
                    "opacity": "0.5"
                })
                if (parentInfo.length === 1) {
                    return;
                }
                parentInfo.pop()
                init(parentInfo[parentInfo.length - 1].code)
            })

            var geoJson = {}
            var parentInfo = [{
                cityName: '全国',
                code: 100000
            }]
            
            var currentIndex = 0
            var timeTitle = ['2015', '2016', '2017', '2018', '2019']

            init(100000)

            function init(adcode) {
                getGeoJson(adcode).then(data => {
                    geoJson = data
                    getMapData()
                })
            }

            //这里封装了，直接可以拿过来用
            function getGeoJson(adcode, childAdcode = '') {
                return new Promise((resolve, reject) => {
                    function insideFun(adcode, childAdcode) {
                        AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer => {
                            var districtExplorer = new DistrictExplorer();
                            districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
                                if (error) {
                                    console.error(error);
                                    reject(error);
                                    return;
                                }
                                let Json = areaNode.getSubFeatures();
                                if (Json.length === 0) {
                                    let parent = areaNode._data.geoData.parent
                                        .properties.acroutes;
                                    insideFun(parent[parent.length - 1], adcode);
                                    return;
                                }
                                if (childAdcode) {
                                    Json = Json.filter(item => {
                                        return item.properties.adcode ==
                                            childAdcode;
                                    });
                                }
                                let mapJson = {
                                    features: Json
                                };
                                resolve(mapJson);
                            });
                        });
                    }
                    insideFun(adcode, childAdcode);
                });
            }

            //获取数据    
            function getMapData() {
                let mapData = [],
                    pointData = [],
                    sum = 0
                geoJson.features.forEach(item => {
                    let value = Math.random() * 3000
                    mapData.push({
                        name: item.properties.name,
                        value: value,
                        cityCode: item.properties.adcode
                    })
                    pointData.push({
                        name: item.properties.name,
                        value: [item.properties.center[0], item.properties.center[1], value],
                        cityCode: item.properties.adcode
                    })
                    sum += value
                })
                mapData = mapData.sort(function (a, b) {
                    return b.value - a.value
                });
                initEchartMap(mapData, sum, pointData)
            }

            //渲染echarts
            function initEchartMap(mapData, sum, pointData) {
                var xData = [],
                    yData = []
                var min = mapData[mapData.length - 1].value
                var max = mapData[0].value
                if (mapData.length === 1) {
                    min = 0
                }
                //这里做个切换，全国的时候才显示南海诸岛  只有当注册的名字为china的时候才会显示南海诸岛
                echarts.registerMap(parentInfo.length === 1 ? 'china' : 'map', geoJson);
                
                var option = {
                    baseOption: {
                        // backgroundColor: '#012248',
                        title: [{
                                left: 'center',
                                top: 120,
                                text: parentInfo[parentInfo.length - 1].cityName + '仓位点(可点击到县)',
                                textStyle: {
                                    color: '#b3efff',
                                    fontSize: 16,
                                    fontWeight: 200
                                },
                            },
                            // {
                            //     // text: "仓位数：" + sum.toFixed(2) + '万',
                            //     left: 'center',
                            //     top: 145,
                            //     textStyle: {
                            //         color: '#FFAC50',
                            //         fontSize: 20,
                            //         fontWeight: 400
                            //     }
                            // }
                        ],
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'none' // 默认为直线，可选为：'line' | 'shadow'
                            },
                        },
                        // legend: {
                        //     show: true,
                        //     icon: 'roundRect',
                        //     itemWidth: 25,
                        //     itemHeight: 15,
                        //     itemGap: 9,
                        //     bottom: '10',
                        //     right: '20',
                        //     textStyle: {
                        //         fontSize: 14,
                        //         color: '#b3efff'
                        //     },
                        //     data: ['单数', '销售额'],
                        // },
                        grid: [{
                                show: false,
                                right: '21%',
                                top: '12%',
                                bottom: '8%',
                                containLabel: true,
                                width: '15%'
                            },
                            {
                                show: false,
                                right: '18.5%', //调整中间文字位置
                                top: '14%', //使中间文字对齐
                                bottom: '8%',
                                width: '0%',
                            },
                            {
                                show: false,
                                right: '2%',
                                top: '12%',
                                bottom: '8%',
                                containLabel: true,
                                width: '15%'
                            }
                        ],
                        // toolbox: {
                        //     feature: {
                        //         restore: {
                        //             show: false
                        //         },
                        //         dataView: {
                        //             show: false
                        //         },
                        //         saveAsImage: {
                        //             name: parentInfo[parentInfo.length - 1].cityName + '销售额统计图'
                        //         },
                        //         dataZoom: {
                        //             show: false
                        //         },
                        //         magicType: {
                        //             show: false
                        //         }
                        //     },
                        //     // iconStyle: {
                        //     //     normal: {
                        //     //         borderColor: '#1990DA' //右上角下载的颜色
                        //     //     }
                        //     // },
                        //     top: 15,
                        //     right: 35
                        // },
                        geo: {
                            map: parentInfo.length === 1 ? 'china' : 'map',
                            zoom: 1.1,
                            roam: true,
                            left: '10%',
                            top: '15%',
                            tooltip: {
                                trigger: 'item',
                                formatter: (p) => {
                                    let val = p.value[2];
                                    if (window.isNaN(val)) {
                                        val = 0;
                                    }
                                    let txtCon = "<div style='text-align:left'>" + p.name +
                                        ":<br />单数：" + val.toFixed(2) +
                                        "单<br />销售额：" + val.toFixed(2) + '万</div>';
                                    return txtCon;
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    color: "#f9f9f9", //省份标签字体颜色
                                    formatter: p => {
                                        switch (p.name) {
                                            case '内蒙古自治区':
                                                p.name = "内蒙古"
                                                break;
                                            case '西藏自治区':
                                                p.name = "西藏"
                                                break;
                                            case '新疆维吾尔自治区':
                                                p.name = "新疆"
                                                break;
                                            case '宁夏回族自治区':
                                                p.name = "宁夏"
                                                break;
                                            case '广西壮族自治区':
                                                p.name = "广西"
                                                break;
                                            case '香港特别行政区':
                                                p.name = "香港"
                                                break;
                                            case '澳门特别行政区':
                                                p.name = "澳门"
                                                break;
                                        }
                                        return p.name;
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    color: '#f75a00',
                                }
                            },
                            // 地图边颜色
                            itemStyle: {
                                normal: {
                                    areaColor: '#24CFF4',
                                    borderColor: '#53D9FF',
                                    borderWidth: 1.3,
                                    shadowBlur: 15,
                                    shadowColor: '#3a73c0',
                                    shadowOffsetX: 7,
                                    shadowOffsetY: 6,
                                },
                                emphasis: {
                                    areaColor: '#8dd7fc',
                                    borderWidth: 1.6,
                                    shadowBlur: 25,
                                }
                            },
                        },
                        // 地图渐变颜色
                        visualMap: { //右下角
                            min: min,
                            max: max,
                            left: '0',
                            bottom: '0',
                            calculable: false,
                            seriesIndex: [0],
                            show: false,
                            inRange: {
                                color: ['#24CFF4', '#2E98CA', '#1E62AC']
                            },
                            textStyle: {
                                color: '#24CFF4'
                            }
                        },
                        xAxis: [{
                                type: 'value',
                                inverse: true, //是否是反向坐标轴。
                                scale: true,
                                position: 'top',
                                boundaryGap: false,
                                show: false,
                                splitLine: {
                                    show: false
                                },
                                // axisLine: {
                                //     show: true,
                                //     lineStyle: {
                                //         color: '#455B77'
                                //     }
                                // },
                                // axisTick: {
                                //     show: false
                                // // },
                                // axisLabel: {
                                //     show: false,
                                //     lineStyle: {
                                //         color: 'rgba(255,255,255,0.2)'
                                //     },
                                //     margin: 2,
                                //     textStyle: {
                                //         color: '#c0e6f9'
                                //     }
                                // },
                            },
                            {
                                gridIndex: 1,
                                show: false
                            },
                            {
                                gridIndex: 2,
                                type: 'value',
                                inverse: false, //是否是反向坐标轴。
                                scale: true,
                                position: 'top',
                                boundaryGap: false,
                                show: false,
                                splitLine: {
                                    show: false
                                },
                                // axisLine: {
                                //     show: false,
                                //     lineStyle: {
                                //         color: '#455B77',
                                //         show: false,
                                //     }
                                // },
                                // axisTick: {
                                //     show: false
                                // },
                                // axisLabel: {
                                //     show: true,
                                //     lineStyle: {
                                //         color: 'rgba(255,255,255,0.2)'
                                //     },
                                //     margin: 2,
                                //     textStyle: {
                                //         color: '#c0e6f9'
                                //     }
                                // },
                            }
                        ],
                        yAxis: [{
                                type: 'category',
                                inverse: false,
                                position: 'right',
                                nameGap: 16,
                                axisLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#455B77'
                                    }
                                },
                                axisTick: {
                                    show: false
                                },
                                axisLabel: {
                                    show: false
                                },
                                data: xData
                            },
                            {
                                gridIndex: 1,
                                type: 'category',
                                inverse: false,
                                position: 'center',
                                nameGap: 16,
                                axisLine: {
                                    show: false
                                },
                                axisTick: {
                                    show: false
                                },
                                axisLabel: {
                                    show: true,
                                    textStyle: {
                                        color: '#c0e6f9',
                                        fontSize: 12,
                                        align: "center",
                                    },
                                },
                                data: xData
                            },
                            {
                                gridIndex: 2,
                                type: 'category',
                                inverse: false,
                                position: 'left',
                                nameGap: 16,
                                axisLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#455B77'
                                    }
                                },
                                // axisTick: {
                                //     show: false
                                // },
                                // axisLabel: {
                                //     show: false
                                // },
                                // data: xData
                            }
                        ],
                        series: [{ //最外层鼠标经过显示的黑框
                                name: timeTitle[currentIndex] + '年销售额度',
                                type: 'map',
                                geoIndex: 0,
                                map: parentInfo.length === 1 ? 'china' : 'map',
                                roam: true,
                                zoom: 1.3,
                                tooltip: {
                                    trigger: "item",
                                    formatter: p => {
                                        let val = p.value;
                                        if (p.name == '南海诸岛') return
                                        if (window.isNaN(val)) {
                                            val = 0;
                                        }
                                        let txtCon = "<div style='text-align:left'>" + p.name +
                                            ":<br />单数：" + val.toFixed(2) +
                                            "单<br />销售额：" + val.toFixed(2) + '万</div>';
                                        return txtCon;
                                    }
                                },
                                label: {
                                    normal: {
                                        formatter: function (data) {
                                            return '4';
                                        },
                                        show: true,
                                        position: 'right',
                                        distance: 5,
                                        color: 'white',
                                        backgroundColor: '#fff',
                                        padding: 10,
                                        borderRadius: 20
                                        // show: false,
                                    },
                                    emphasis: {
                                        show: false,
                                    }
                                },
                                data: mapData,
                            },
                            {
                                name: '散点',
                                type: 'effectScatter',
                                coordinateSystem: 'geo',
                                rippleEffect: {
                                    brushType: 'fill'
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#F4E925',
                                        shadowBlur: 10,
                                        shadowColor: '#333'
                                    }
                                },
                                data: pointData,
                                symbolSize: function (val) {
                                    let value = val[2]
                                    if (value == max) {
                                        return 27
                                    }
                                    return 10
                                },
                                showEffectOn: 'render', //加载完毕显示特效
                            },
                            // {
                            //     name: '单数',
                            //     type: 'bar',
                            //     barGap: '-100%',
                            //     barCategoryGap: '60%',
                            //     stack: 'left',
                            //     label: {
                            //         show: true,
                            //         fontSize: 10,
                            //         distance: 10,
                            //         color: '#fff',
                            //         position: 'left', //inside|right
                            //         formatter: (params) => {
                            //             return params.value.toFixed(2)
                            //         }
                            //     },
                            //     itemStyle: {
                            //         normal: {
                            //             barBorderRadius: 30,
                            //             color: new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
                            //                     offset: 0,
                            //                     color: "#EB3B5A"
                            //                 },
                            //                 {
                            //                     offset: 1,
                            //                     color: "#FE9C5A"
                            //                 }
                            //             ])
                            //         },
                            //         emphasis: {
                            //             show: false
                            //         }
                            //     },
                            //     data: yData
                            // },
                            //  {
                            //     name: '销售额',
                            //     type: 'bar',
                            //     barGap: '-100%',
                            //     barCategoryGap: '60%',
                            //     stack: 'right',
                            //     xAxisIndex: 2,
                            //     yAxisIndex: 2,
                            //     label: {
                            //         show: true,
                            //         fontSize: 10,
                            //         distance: 10,
                            //         color: '#fff',
                            //         position: 'right', //inside|right
                            //         formatter: (params) => {
                            //             return params.value.toFixed(2)
                            //         }
                            //     },
                            //     itemStyle: {
                            //         normal: {
                            //             barBorderRadius: 30,
                            //             color: new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
                            //                     offset: 0,
                            //                     color: "#395CFE"
                            //                 },
                            //                 {
                            //                     offset: 1,
                            //                     color: "#2EC7CF"
                            //                 }
                            //             ])
                            //         },
                            //         emphasis: {
                            //             show: false
                            //         }
                            //     },
                            //     data: yData
                            // }
                        ]
                    },
                }
                myChart.setOption(option, true)
                //点击前解绑，防止点击事件触发多次
                myChart.off('click');
                myChart.on('click', echartsMapClick);
                //监听时间切换事件
                myChart.off('timelinechanged');
                myChart.on('timelinechanged', params => {
                    currentIndex = params.currentIndex;
                    getMapData();
                });
            }

            //echarts点击事件
            function echartsMapClick(params) {
                $('.back').css({
                    "cursor": "pointer",
                    "opacity": "1"
                })
                if (!params.data) {
                    return
                } else {
                    //如果当前是最后一级，那就直接return  
                    if (parentInfo[parentInfo.length - 1].code == params.data.cityCode) {
                        return
                    }
                    let data = params.data
                    parentInfo.push({
                        cityName: data.name,
                        code: data.cityCode
                    })
                    init(data.cityCode)
                }
            }


