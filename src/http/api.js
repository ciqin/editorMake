/**
 * 此文件为接口统一管理文件
 */
const swaggerApi = "http://192.168.4.68:9117";
const caiApi = "http://127.0.0.1:9080";
import { getHttp, postHttp } from "./httpService"
import { store } from '@/store'
// 获取稿件id
// let id = window.location.href.split().split("?")[1].split("=")[1];
let manuscriptId = window.location.href;
let newManuscriptId = manuscriptId.split("?")[1].split("=")[1];
store.objid = newManuscriptId;
//  test
export const getJson = data => getHttp('../../static/test/test.json', data)

//  采编文件保存提交数据接口
export const submitData = data => postHttp('../../static/test/test.json', data)

//  关联文章列表的接口
export const Relatedarr = data => postHttp('../../static/test/Relatedarr.json', data)

// 文稿纠错
export const correction = data => postHttp(swaggerApi+'/ilgcreation/sensitiveAnalysis/analysis', data)

// 敏感词分析 
export const sensitivityAnalysis = data => postHttp(swaggerApi+'/ilgcreation/text/check', data)

// 新建获取稿签Id
export const newSignature = data => getHttp(caiApi+'/sprint/rest/stories/workspace/'+newManuscriptId+'/tags/edit?type=COMPO', data)

// 自动保存
export const newSave = data => postHttp(caiApi+'/sprint/rest/stories/workspace/'+newManuscriptId+'/save/process', data)