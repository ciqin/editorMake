/**
 * 此文件为封装axios的文件，暴露出post，get方法以及响应和请求的拦截
 * axios在webpack中以及配置不需要import引入，在webpack.base.conf中
 */
import Vue from 'vue'
import qs from 'qs'
import Axios from "axios"

//创建vue实例，以便访问vue原型的方法
const vue = new Vue()

// const API_URL = process.env.NODE_ENV === 'development' ? {
//   API_URL: 'http://localhost:8096'
// } : {
//   API_URL: 'http://localhost:8096'
// }
const API_URL  = {
  caiApi:'http://localhost:8080',
  swaggerApi:"http://192.168.4.68:9117",
  localApi:"http://localhost:8080"
}

// 创建Axios实例对象，配置请求前缀，请求超时时间以及不需要带跨域凭证
// const Axios = http.create({
//    baseURL:  process.env.NODE_ENV !== 'development' ? path.API_URL : ''
//   //baseURL: path.API_URL
// })

// 请求拦截
Axios.interceptors.request.use(config => {
  if (config.data && config.data.ContentType) {
    delete config.data.ContentType
    config.data = qs.stringify(config.data);
    config.headers = Object.assign(config.headers, { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',"X-CSRF-TOKEN":"f3a8f26e-3416-46dc-8957-abe46967f88a"})
  }
  return config
}, error => {
  return Promise.reject(error)                  
})

// 相应拦截，可以在错误响应中做操作，response包含错误信息
// Axios.interceptors.response.use(resopne => {
//   return resopne 
// }, error => {
//   const { response } = error
//   return Promise.reject(error)
// })

// get请求
export const getHttp = (url, data) => {
 return new Promise((resolve, reject) => {
      Axios.get(url, { params : data }).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
        vue.$message('获取数据失败，请刷新')
      })
    })
}

// post请求
export const postHttp = (url, data) => {
  return new Promise((resolve, reject) => {
    Axios.post(url,data).then(res => {
      resolve(res.data)
      // if (res.data.code !== 200) vue.$message('获取数据失败，请刷新')
      // else resolve(res.data.output)
    }).catch(error => {
      reject(error)
      vue.$message('获取数据失败，请刷新')
    })
  })
}

