/**
 * 此文件为接口统一管理文件
 */
import { getHttp, postHttp } from "./httpService"

//  test
export const getJson = data => getHttp('../../static/test/test.json', data)

//  采编文件保存提交数据接口
export const submitData = data => postHttp('../../static/test/test.json', data)

//  关联文章列表的接口
export const getRelatedArticles = data => postHttp('http://192.168.4.68:9117/ilgcreation/article/getRelatedArticles', data)

//  媒资库分类的接口
export const classifygetAll = data => postHttp('http://192.168.18.15:9116/classify/getAll', data)

//  媒资库的检索
export const SearchShareAssets = data => postHttp('http://192.168.18.15:9116/search/highLevelSearchShareAssets', data)