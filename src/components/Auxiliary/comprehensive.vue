<template>
    <div>
        <div class='title_mainner'>
            <h2>综合分析</h2>
            <p>根据文稿内容，对文稿进行综合分析，包括文字的易读性，情感属性等</p>
        </div>
        <div class="button_mainner">
             <button @click="InfosStart">开始分析</button>
        </div>
        <div class='information_box essential_information'>
            <p>基本信息：</p>
            <div class="essential_sec">
                <p>字数：<span>821</span>个</p>
                <p>字数：<span>821</span>个</p>
                <p>字数：<span>821</span>个</p>
            </div>
        </div>
        <div  class='information_box information_reader'>
           <div class='reader_left'>
               <div id='readerecharts'></div>
           </div>
           <div class='reader_right'>
               <p>阅读时间：<span>8</span>分钟</p>
               <p>郎读时间：<span>10</span>分钟</p>
           </div>
        </div>

        <div  class='information_box information_emotion'>
           <p>情感得分：</p>
           <div style='display:flex'>
              <div class='emotion_left'>
                <div id='emotion_leftchaerts'></div>
              </div>
              <div class='emotion_right'>
                    <div id='emotion_rightchaerts'></div>
              </div>
           </div>
        </div>

        <div  class='information_box information_new'>
           <p>新闻流行度预测：</p>
           <div class='new_top'>
             <div id='newsection_charts'></div>
           </div>
           <div class='new_bottom'>
 
           </div>
        </div>
    </div>
</template>
<script>
   import { basicInfos } from '@/http/api'
   import { emotionScore } from '@/http/api'
   import { store } from '@/store'
   export default {
     data() {
        return {
               readervalue:8, //阅读统计图的
               notreadervalue:10
            }
        },
     mounted(){
         //阅读
         let myChartreader = this.$echarts.init(document.getElementById('readerecharts'))
         myChartreader.setOption({
            title:{
                text: '{val|' + '20%' + '}\n{name|' + '易读性' + '}',
                top: 'center',
                left: 'center',
                tooltip: {
                    formatter: function(params) {
                        return params.name + '：' + params.percent + ' %'
                    }
                },
                textStyle: {
                rich: {
                        name: {
                            fontSize: 13,
                            fontWeight: 'normal',
                            color: '#666666',
                            padding: [10, 0]
                        },
                        val: {
                            fontSize: 32,
                            fontWeight: 'bold',
                            color: '#FFA94C',
                        }
                    }
                }
            },
            series: [{
                 name: 'circle',
                 type: 'pie',
                 clockWise: true,
                 radius: ['60%', '70%'],
                 itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                 },
                  data: [{
                    value: this.readervalue,
                    name: '阅读时间',
                    itemStyle: {
                        normal: {
                            color: { // 颜色渐变
                                colorStops: [{
                                            offset: 0,
                                            color: '#FFA94C' // 0% 处的颜色
                                        }, {
                                            offset: 1,
                                            color: '#FFA94C' // 100% 处的颜色1
                                        }]
                            },
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    }
                },{
                    name: '朗读时间',
                    value: this.notreadervalue,
                    itemStyle: {
                        normal: {
                            color: '#E1E8EE'
                        }
                    }
                }]
              }]
          });
         

         //政负情感
         let leftChartremotion = this.$echarts.init(document.getElementById('emotion_leftchaerts'))
         let datas={
                dataArr: [
                {
                    value: 0,
                    name: "",
                },
                ],
                min:-1,
                max:1,
            };
            var dataArr = datas.dataArr;
            let nowData=dataArr[0].value;
            let min = datas.min;
            let max = datas.max;
            let splitNumber=max-min;
            let per = (dataArr[0].value - min) / (max - min);
            let unit = datas.unit;

            var color = {
                        normal: {
                            color: { // 颜色渐变
                                colorStops: [{
                                            offset: 0,
                                            color: '#FFA94C' // 0% 处的颜色
                                        }, {
                                            offset: 1,
                                            color: '#FFA94C' // 100% 处的颜色1
                                        }]
                            },
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    }
            var colorSet = [
                [per, color],
                [1, "#413e54"],
            ];
            let startAngle = 180;
            let endAngle = 0;
            let center = ["50%", "63%"];

         leftChartremotion.setOption({
            tooltip: {
            show: false,
            },
            series: [
            {
                type: "gauge",
                radius: "90%",
                startAngle,
                endAngle,
                center,
                pointer: {
                show: false,
                },
                title: {
                show: false,
                },
                axisLine: {
                show: false,
                lineStyle: {
                    color: colorSet,
                    width: 20,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    opacity: 1,
                },
                },
                axisTick: {
                show: false,
                splitNumber: 5,
                length: 8,
                },
                splitLine: {
                length: 1, //刻度节点线长度
                lineStyle: {
                    width: 1,
                    color: "rgba(255,255,255,.8)",
                }, //刻度节点线
                },
                axisLabel: {
                show: false,
                },
                detail: {
                show: 0,
                },
                animationDuration: 4000,
            },
            {
                name: "白色圈刻度",
                type: "gauge",
                radius: "80%",
                startAngle, //刻度起始
                endAngle, //刻度结束
                center,
                min,
                max,
                splitNumber: 1,
                z: 4,
                axisTick: {
                show: false,
                },
                splitLine: {
                length: 16, //刻度节点线长度
                lineStyle: {
                    width: 2,
                    color: "#018DFF",
                }, //刻度节点线
                },
                axisLabel: {
                formatter: function (v) {
                    if (v == min) {
                    return `{min|${min}\n}`;
                    } else {
                    return `{max|${max}\n}`;
                    }
                },
                rich: {
                    min: {
                    // 下右上左
                    padding: [0, 0, 80, -120],
                    color: "#000",
                    fontSize: 20,
                    lineHeight: 30,
                    },
                    max: {
                    // 下右上左
                    padding: [0, -120, 80, 0],
                    color: "#000",
                    fontSize: 20,
                    lineHeight: 30,
                    },
                },
                }, //刻度节点文字颜色
                pointer: {
                show: false,
                },
                detail: {
                show: false,
                },
                axisLine: {
                show: true,
                lineStyle: {
                    color: colorSet,
                    width: 10,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    opacity: 1,
                },
                },
                data: dataArr,
            },
            {
                name: '内部圈',
                type: 'gauge',
                z: 10,
                center,
                min,
                max,
                splitNumber: splitNumber,
                radius: '120%',
                startAngle, //刻度起始
                endAngle, //刻度结束
                axisLine: {
                    show: false,
                lineStyle: {
                    color: colorSet,
                },
                },
                
                tooltip: {
                    show: false
                },
                axisLabel: {
                    show: false,
                    // color:"red",
                    // formatter:function(v){
                    //     if(v==nowData){
                    //         return "当前数值\n"+nowData;
                    //     }
                    // }
                },
                axisTick: {
                    show: false,

                },
                splitLine: {
                    show: false,
                },
                itemStyle: {
                    show: false,
                },
                detail: {
                    show: false
                },
                title: { //标题
                    show: false,
                },
                data: [{
                    name: "title",
                    value: nowData,
                }],
                itemStyle: {
                    normal: {
                        color: 'rgba(145,207,255,1)'
                    }
                },
                pointer: {
                show: false,
                width: 8,
                length: "60%",
                },
                animationDuration: 4000,
            },
            ],
         })


         //新闻流行度
         let newsectioncharts = this.$echarts.init(document.getElementById('newsection_charts'))
         newsectioncharts.setOption({
             title: {
                    top:160,
                    left: 'center',
                    text: '综合影响力指数',
                    textStyle: { color: '#666666', fontSize: 13 }
                },
                tooltip: { formatter: '{b} : {c}%' },
                max: 100,
                pointer: { show: true, length: '80%', width: 1 },
                series: [
                    {
                        name: '综合影响力指数',
                        type: 'gauge',
                        detail: {
                            show: true,
                            offsetCenter: [0, '60%'],
                            width: 36,
                            height: 10,
                            textStyle: {
                                fontSize: 16,
                                color: '#4489ea',
                                fontWeight: 'bolder'
                            },
                        },
                        radius: '90%',
                        axisLine: {
                            lineStyle: {
                                length: 20,
                                width:20,
                                color: [
                                    [0.3, '#cccccc'],
                                    [0.7, '#4489ea'],
                                    [1, '#ea283c']
                                ]
                            }
                        },
                        axisTick: {
                            show: true,
                            lineStyle: {
                                color: "#ffffff",
                                width: 1
                            },
                            length: 5,
                            splitNumber: 5
                        },
                        splitLine: {           // 分隔线
                            show: true,        // 默认显示，属性show控制显示与否
                            lineStyle: { 
                                color: "#ffffff",      // 属性lineStyle（详见lineStyle）控制线条样式
                                width: 1,
                            },
                        },
                        axisLabel: {
                            distance: 2,
                            textStyle: { color: '#000', fontSize: 10 }
                        },
                        data: [{ value: 90.7 }]
                    }
                ] 
         })

     },

     methods:{
        InfosStart(){

           //基本信息
           basicInfos({content:store.ueditor.getContentTxt()}).then((res)=>{
               if(res){
                   console.log(res)
               }
           })

           //情感得分
           emotionScore({checkType:1,text:store.ueditor.getContentTxt()}).then((res)=>{
               if(res){
                   console.log(res)
               }
           })

        }
     }
    }
</script>
<style scoped>
   .title_mainner{
     height:84px;
     border-bottom:1px solid #ccc;
     padding-left: 20px;
   }
   .title_mainner h2{
       padding-top: 10px;
       font-family: MicrosoftYaHei;
       font-size: 16px;
       color: #666666;
   }
   .title_mainner p{
       font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #999999;
        line-height: 30px;
   }
   .button_mainner{
       height: 115px;
       text-align: center;
   }

   .button_mainner button{    
        width:100px;
        height:40px;
        background: #303841;
        border-radius: 4px;
        border-radius: 4px;
        outline: none;
        border: none;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 0;
        line-height: 14px;
        margin-top: 35px;
   }
   .information_box{
       background: #FFFFFF;
       border: 1px solid #E9E9E9;
       box-shadow: 0 9px 9px 0 rgba(0,0,0,0.02), 0 3px 3px 0 rgba(0,0,0,0.02), 0 1px 1px 0 rgba(0,0,0,0.02);
       border-radius: 4px;
       border-radius: 4px;
       padding-left: 20px;
       margin:20px 10px 10px 10px;
   }

   .information_box p{
       padding-top: 15px;
       font-family: MicrosoftYaHei;
       font-size: 14px;
       color: #333333;
       letter-spacing: 0;
       line-height: 22px;
   }

   .essential_information{
       margin:0 10px 10px 10px;
       height: 98px;
   }
   

   .essential_sec{
       display: flex;
   }

   .essential_sec p{
       flex: 1;
       line-height: 35px;
   }

   .essential_sec p span{
          font-family: MicrosoftYaHei-Bold;
          font-size: 18px;
          color: #4894ea;
          letter-spacing: 0;
          line-height: 24px;
          font-weight: bolder;
    }
    .information_reader{
        height: 176px;
        display: flex;
    }

    .information_emotion{
        height: 185px;
    }

    .information_new{
        height: 416px;
    }

    #readerecharts{
        width:180px;
        height: 180px;
    }
    #newsection_charts{
        width: 260px;
        height: 200px;
        margin-left: 57px;
        margin-top: 15px;
    }
    .reader_right{
        padding-top: 38px;
    }

    #emotion_leftchaerts{
         width:180px;
        height: 145px;
    }
</style>