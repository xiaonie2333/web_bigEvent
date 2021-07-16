var data = [{
  "name": "一月",
  "value": 80
}, {
  "name": "二月",
  "value": 87.8
}, {
  "name": "三月",
  "value": 71
}, {
  "name": "四月",
  "value": 80
}, {
  "name": "五月",
  "value": 66
}, {
  "name": "六月",
  "value": 80
}, {
  "name": "七月",
  "value": 80
}];
var xData = [],
  yData = [];
var min = 50; 
data.map(function(a, b) {
  xData.push(a.name);
  if (a.value === 0) {
      yData.push(a.value + min);
  } else {
      yData.push(a.value);
  }
});
option = {
  backgroundColor:"#111c4e",
  color: ['#3398DB'],
  tooltip: {
      trigger: 'axis',
      axisPointer: {
          type: 'line',
          lineStyle: {
              opacity: 0
          }
      },
      formatter: function(prams) {
          if (prams[0].data === min) {
              return "合格率：0%"
          } else {
              return "合格率：" + prams[0].data + "%"
          }
      }
  },
  legend: {
      data: ['直接访问', '背景'],
      show: false
  },
  grid: {
      left: '0%',
      right: '0%',
      bottom: '5%',
      top: '7%',
      height: '85%',
      containLabel: true,
      z: 22
  },
  xAxis: [{
      type: 'category',
      gridIndex: 0,
      data: xData,
      axisTick: {
          alignWithLabel: true
      },
      axisLine: {
          lineStyle: {
              color: '#0c3b71'
          }
      },
      axisLabel: {
          show: true,
           color: 'rgb(170,170,170)',
           fontSize:16
      }
  }],
  yAxis: [{
          type: 'value',
          gridIndex: 0,
          splitLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          min: min,
          max: 100,
          axisLine: {
              lineStyle: {
                  color: '#0c3b71'
              }
          },
          axisLabel: {
              color: 'rgb(170,170,170)',
              formatter: '{value} %'
          }
      },
      {
          type: 'value',
          gridIndex: 0,
          min: min,
          max: 100,
          splitNumber: 12,
          splitLine: {
              show: false
          },
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          axisLabel: {
              show: false
          },
          splitArea: {
              show: true,
              areaStyle: {
                  color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
              }
          }
      }
  ],
  series: [{
          name: '合格率',
          type: 'bar',
          barWidth: '30%',
          xAxisIndex: 0,
          yAxisIndex: 0,
          itemStyle: {
              normal: {
                  barBorderRadius: 30,
                  color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1, [{
                              offset: 0,
                              color: '#00feff'
                          },
                          {
                              offset: 0.5,
                              color: '#027eff'
                          },
                          {
                              offset: 1,
                              color: '#0286ff'
                          }
                      ]
                  )
              }
          },
          data: yData,
          zlevel: 11

      },
      {
          name: '背景',
          type: 'bar',
          barWidth: '50%',
          xAxisIndex: 0,
          yAxisIndex: 1,
          barGap: '-135%',
          data: [100, 100, 100, 100, 100, 100, 100],
          itemStyle: {
              normal: {
                  color: 'rgba(255,255,255,0.1)'
              }
          },
          zlevel: 9
      },
    
  ]
};

 // option1: {
        //   color: ["#4d74f3"],
        //   tooltip: {
        //     trigger: 'axis',
        //     axisPointer: { // 坐标轴指示器，坐标轴触发有效
        //       type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        //     }
        //   },
        //   title: {
        //     text: '使用率柱状图',
        //     fontSize: '12',
        //     x: 'left', // 水平安放位置，默认为左对齐，可选为：
        //     y: 'top', // 垂直安放位置，默认为全图顶端，可选为：
        //     backgroundColor: 'rgba(0,0,0,0)',
        //     borderColor: '#ccc', // 标题边框颜色
        //     borderWidth: 0, // 标题边框线宽，单位px，默认为0（无边框）
        //     padding: 5, // 标题内边距，单位px，默认各方向内边距为5，
        //     itemGap: 10, // 主副标题纵向间隔，单位px，默认为10，
        //     textStyle: {
        //       fontSize: 8,
        //       fontWeight: 'normal',
        //       color: '#f1f1f1' // 主标题文字颜色
        //     },
        //   },
        //   grid: {
        //     top: '20%',
        //     left: '3%',
        //     right: '4%',
        //     bottom: '-0%',
        //     containLabel: true
        //   },
        //   xAxis: [{
        //     type: 'category',
        //     data: ['仓库1', '仓库2', '仓库3', '仓库4', '仓库5', '仓库6', '仓库7'],
        //     axisTick: {
        //       alignWithLabel: true
        //     },
        //     axisLabel: {
        //       textStyle: {
        //         color: "rgba(255,255,255,.6)",
        //         fontSize: "10"
        //       }
        //     },
        //     axisLine: {
        //       show: false
        //     }
        //   }],

        //   yAxis: [{
        //     type: 'value',
        //     axisLabel: {
        //       textStyle: {
        //         color: "rgba(255,255,255,.6)",
        //         fontSize: "10"
        //       }
        //     },
        //     axisLine: {
        //       lineStyle: {
        //         color: "rgba(255,255,255,.1)"
        //       }
        //     },
        //     splitLine: {
        //       lineStyle: {
        //         color: "rgba(255,255,255,.1)"
        //       }
        //     }
        //   }, ],
        //   series: [{
        //     name: '使用率柱状图',
        //     type: 'bar',
        //     barWidth: "35%",
        //     data: [10, 52, 200, 334, 390, 330, 220],
        //     itemStyle: {
        //       barBorderRadius: 5
        //     },
        //     backgroundStyle: {
        //       color: 'rgba(180, 180, 180, 0.2)'
        //     }
        //   }]
        // },
