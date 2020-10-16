/**
 * 此文件为接口统一管理文件
 */
import { getHttp, postHttp } from "./httpService"

//  test
export const getJson = data => getHttp('../../static/test/test.json', data)

//  采编文件保存提交数据接口
export const submitData = data => postHttp('../../static/test/test.json', data)

//  关联文章列表的接口
export const Relatedarr = data => postHttp('../../static/test/Relatedarr.json', data)