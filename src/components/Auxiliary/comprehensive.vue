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
                <p>字数：<span>{{charNum}}</span>个</p>
                <p>词数：<span>{{wordNum}}</span>个</p>
                <p>句数：<span>{{sentenceNum}}</span>个</p>
            </div>
        </div>
        <!-- <div  class='information_box information_reader'>
           <div class='reader_left'>
               <div id='readerecharts'></div>
           </div>
           <div class='reader_right'>
               <p>阅读时间：<span>8</span>分钟</p>
               <p>朗读时间：<span>10</span>分钟</p>
           </div>
        </div> -->

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

        <!-- <div  class='information_box information_new'>
           <p>新闻流行度预测：</p>
           <div class='new_top'>
             <div id='newsection_charts'></div>
           </div>
           <div class='new_bottom'>
 
           </div>
        </div> -->
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
               notreadervalue:10,
               charNum:'',
               sentenceNum:'',
               wordNum:'',
               remotionvalue:'-1',//政负情感  
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
         this.loadleftChartremotion()

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
               if(res.message='获取成功'){
                   this.charNum = res.data[0].charNum
                   this.sentenceNum = res.data[0].sentenceNum
                   this.wordNum = res.data[0].wordNum
               }
           })

           //情感得分
           emotionScore({content:store.ueditor.getContentTxt(),title:this.$store.state.title}).then((res)=>{
               if(res.message='获取成功'){
                   this.remotionvalue = res.data[0]
                   this.loadleftChartremotion()
               }else{
                   this.$message(res.message);
               }
           })

        },

        //正负情感
        loadleftChartremotion(){
         console.log(this.remotionvalue)
         let _that = this
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

            leftChartremotion.setOption({
                tooltip: {
                    formatter: "{a} <br/>{b} : {c}"
                },
                series: [{
                    //类型
                    type: 'gauge',
                    //半径
                    radius: 80,
                    //起始角度。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
                    startAngle: 180,
                    //结束角度。
                    endAngle: 0,
                    center: ['50%', '70%'],
                    max:1,
                    min:-1,
                    //仪表盘轴线相关配置。
                    axisLine: {
                        show: true,
                        // 属性lineStyle控制线条样式
                        lineStyle: {
                            width: 10,
                            color: [
                                [-1, '#4489ea'],
                                [1, '#d8e8f2']
                            ]
                        },
                    },
                    //分隔线样式。
                    splitLine: {
                        show: false,
                    },
                    //刻度样式。
                    axisTick: {
                        show: false,
                    },
                    //刻度标签。
                    axisLabel: {
                        show: false,
                    },
                    //仪表盘指针。
                    pointer: {
                        //这个show属性好像有问题，因为在这次开发中，需要去掉指正，我设置false的时候，还是显示指针，估计是BUG吧，我用的echarts-3.2.3；希望改进。最终，我把width属性设置为0，成功搞定！
                        show: false,
                        //指针长度
                        length: '90%',
                        width: 0,
                    },
                    //仪表盘标题。
                    title: {
                        show: true,
                        offsetCenter: [0, '25%'], // x, y，单位px
                        textStyle: {
                            color: '#666666',
                        }
                    },

                    //仪表盘详情，用于显示数据。
                    detail: {
                        show: false,
                        offsetCenter: [0, '-25%'],
                        formatter: '{value}',
                    },
                    data: [{
                        value: this.remotionvalue?this.remotionvalue:'',
                        name: '正负情感',
                    },
                    ]
                }]
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