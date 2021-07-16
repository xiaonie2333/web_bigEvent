(function () {
    
    var geoCoordMap = {
        '广州': [113.5107, 23.2196],
        '珠海市': [113.5624, 22.2569],
        //'万科花园社区居民委员会':[23.104420,113.469750]
    };
    
    
    var BJData = [
        [
            {
                name: '广州',
                value: 16
            }
        ],
        [
            {
                name: '珠海市',
                value: 20
            }
        ]
    ];

    var planePath = 'path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705';
    
    var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = [116.4551,40.2539];
            if(fromCoord && toCoord) {
                res.push([{
                    coord: fromCoord,
                    value: dataItem[0].value
                }, {
                    coord: toCoord,
                }]);
            }
        }
        return res;
    };
    
    var color = ['#a6c84c','#ffa022','#3ed4ff' ];
    var series = [];
    [['广州', BJData]].forEach(function(item, i) {
        series.push(
            {
            type: 'lines',
            zlevel: 2,
            effect: {
                show: false,
                period: 6,
                trailLength: 0.7,
                color: '#fff',
                symbolSize: 3
            },
            lineStyle: {
                normal: {
                    color: color[i],
                    width: 0,
                    curveness: 0.2
                }
            },
            data: convertData(item[1])
        },{
            // name: item[0] + ' 仓库',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 10,
            rippleEffect: {
                period: 4, //动画时间，值越小速度越快
                brushType: 'stroke', //波纹绘制方式 stroke, fill
                scale: 4 //波纹圆环最大限制，值越大波纹越大
            },
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                }
            },
            symbolSize: function(val) {
                return val[2] <= 40 ? 40 : (val[2] < 200 ? val[2] / 4 : $val[2] / 5);
            },
            itemStyle: {
                normal: {
                    color: color[i]
                }
            },
            data: item[1].map(function(dataItem) {
                return {
                    name: dataItem[0].name,
                    value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                };
            })
        });
    });
    
    var option = {
        title: {
            text: '', //'仓位地点信息显示  - 实时',    //整个图标的标题显示
            top:140,
            left: '20',                 //标题位置 可以left center right
            textStyle : {
                color: '#fff',	//	定义字体颜色
                fontWeight: 'normal',
                fontSize: '14',		//定义字体大小,
            }
        },
        // color: ['#c05050','#e5cf0d','#5ab1ef'],
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(166, 200, 76, 0.82)',
            borderColor: '#FFFFCC',
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            transitionDuration: 0,
            extraCssText: 'z-index:100',
            formatter: function(params, ticket, callback) {
                //根据业务自己拓展要显示的内容
                var res = "";
                var name = params.name;
                var value = params.value[params.seriesIndex + 1];
                res = "<span style='color:#fff;'>" + name + "</span><br/>设备：" + value;
                return res;
            }
        },

        geo: {
            map: 'china',
            zoom : 1.1,
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#3a7fd5',
                    // areaColor: {
                    //     color: ['#24CFF4', '#2E98CA', '#1E62AC']
                    // },
                    borderColor: '#0a53e9',//线
                    shadowColor: '#092f8f',//外发光
                    shadowBlur: 20
                },
				 emphasis: {
                    areaColor: '#1c41c7',//悬浮区背景
                }
             
            },
            // data:[
            //     {name:'广东', selected:true}//福建为选中状态
            // ]
        },
     
        series: series
    };


    var myecharts = echarts.init($('.map .geo')[0]);
     myecharts.setOption(option)

})();