/**
 * 此文件为接口统一管理文件
 */
const swaggerApi = "http://192.168.18.12:9117";
// const caiApi = "http://qhcloudhongqi.wengegroup.com:9080";
// 本地调试接口
const caiApi = "http://127.0.0.1:9080";
const hongApi = "http://qhcloudhongqi.wengegroup.com:9116/api"

import { getHttp, postHttp } from "./httpService"
import { store } from '@/store'
import Axios from "axios";
// 获取稿件id
// let id = window.location.href.split().split("?")[1].split("=")[1];
let manuscriptId = window.location.href;
let newManuscriptId = manuscriptId.split("?")[1].split("&")[0].split("=")[1];
let libId = manuscriptId.split("?")[1].split("&")[1].split("=")[1];
/\#\//.test(libId)?libId=libId.replace(/\#\//g,""):"";
// 获取tenantId
Axios.get(caiApi+"/sprint/userinfo/rest/getInfo").then(res=>{
    // 设置tenantId
    if(res.data.tenantId){
        // 设置全局租户id
        window.localStorage.setItem('tenantId',res.data.tenantId);
        window.localStorage.setItem('userID',res.data.uuid);
    }
})

//刚进页面需要掉一个接口
export const ilgcreations = data => getHttp('/ilgcreation/', data)

// store.objid = newManuscriptId;
//  test
export const getJson = data => getHttp('../../static/test/test.json', data)

// 新建稿件删除接口
export const deleteManuscript= data => postHttp(caiApi+'/sprint/rest/workflow/stories/'+libId+'/'+newManuscriptId+'/create/cancel', data)

// // 新建稿件释放接口
// export const releaseManuscript= data => postHttp(caiApi+'/sprint/rest/workflow/stories/'+libId+'/'+newManuscriptId+'/hold/release', data)

//  采编文件保存提交数据接口
export const submitData = data => postHttp('../../static/test/test.json', data)

//  关联文章列表的接口
export const getRelatedArticles = data => postHttp(caiApi+'/ilgcreation/article/getRelatedArticles', data)

//  媒资库分类的接口
export const classifygetAll = data => postHttp(hongApi+'/classify/getAll', data)

//  媒资库的检索
export const SearchShareAssets = data => postHttp(hongApi+'/search/highLevelSearchShareAssets', data)

// 文稿纠错
export const correction = data => postHttp(caiApi+'/ilgcreation/sensitiveAnalysis/analysis', data)

// 敏感词分析
export const sensitivityAnalysis = data => postHttp(caiApi+'/ilgcreation/text/check', data)

// 新建获取稿签Id
export const newSignature = data => getHttp(caiApi+'/sprint/rest/stories/'+libId+'/'+newManuscriptId+'/tags/edit?type=COMPO', data)

// 自动保存
export const newSave = (data,url) => postHttp(url?url:caiApi+'/sprint/rest/workflow/stories/'+libId+'/'+newManuscriptId+'/save/smartWrite/process', data)

// 获取模板
export const getTempleteSourceList = data => postHttp(caiApi+'/ilgcreation/rmtTempleteSource/getTempleteSourceList', data)

//稿库
export const templatelist = data => postHttp(caiApi+'/sprint/view/libraries/'+libId+'/smartWrite/listObjects', data)

//稿库
export const listObjects = data => postHttp(caiApi+'/sprint/view/libraries/'+libId+'/smartWrite/favor/listObjects', data)

//模板添加收藏
export const favorTemplate = data => postHttp(caiApi+'/ilgcreation/rmtTempleteSource/favorTemplate', data)

//模板取消收藏
export const cancelFavorTemplate = data => postHttp(caiApi+'/ilgcreation/rmtTempleteSource/cancelFavorTemplate', data)

//媒资库添加收藏
export const Mediadd = data => postHttp(caiApi+'/ilgcreation/favoriteMedia/add', data)

//获取媒资库收藏列表
export const Mediacollectlist = data => postHttp(caiApi+'/ilgcreation/favoriteMedia/getFavoriteTopic', data)

//媒资库取消收藏
export const Mediadell = data => postHttp(caiApi+'/ilgcreation/favoriteMedia/del', data)

//稿库添加收藏
export const favoriteadd = data => postHttp(caiApi+'/ilgcreation/favoriteMixmdedia/add', data)

//稿库取消收藏
export const favoritedell = data => postHttp(caiApi+'/ilgcreation/favoriteMixmdedia/del', data)

//稿件是否收藏
export const FavoriteMixmdedia = data => postHttp(caiApi+'/ilgcreation/favoriteMixmdedia/isFavorite', data)

//获取收藏的稿件 
export const getFavoriteMixmdedias = data => getHttp(caiApi+'/ilgcreation/favoriteMixmdedia/getFavoriteMixmdedias', data)

//关联文章添加收藏
export const Articleadd = data => postHttp(caiApi+'/ilgcreation/favoriteArticle/add', data)

//关联文章取消收藏
export const Articledell = data => postHttp(caiApi+'/ilgcreation/favoriteArticle/del', data)

//我的模板收藏
export const getFavorTemplate = data => postHttp(caiApi+'/ilgcreation/rmtTempleteSource/getFavorTemplate', data)

//我的关联文章收藏
export const getTopics = data => postHttp(caiApi+'/ilgcreation/favoriteArticle/getPage', data)

// 获取按钮接口
export const listBtn = data => postHttp(caiApi+'/sprint/rest/story/'+libId+'/'+newManuscriptId+'/actions/edit', data)

// 提交获取id接口
export const hasSubmitId = data => postHttp(caiApi+'/sprint/rest/story/'+libId+'/'+newManuscriptId+'/submit', data)

// 获取用户select
export const hasSubmitUser = data => getHttp(caiApi+'/sprint/security/users/search', data)

// 稿件提交接口
export const SubmitGj = data => postHttp(caiApi+'/sprint/rest/workflow/stories/'+libId+'/'+newManuscriptId+'/submit/process', data)

// 获取稿件签入接口
export const checkIn = data => postHttp(caiApi+'/sprint/rest/story/'+libId+'/'+newManuscriptId+'/checkin', data)

// 获取目录云稿库接口
export const hasCatalog= data => getHttp(caiApi+'/sprint/rest/libraries/manuscript/select/allFolders', data)

// 稿件签入提交接口
export const checkInData = data => postHttp(caiApi+'/sprint/rest/workflow/stories/'+libId+'/'+newManuscriptId+'/checkin/process', data)

// 传稿获取数据接口
export const manuscript = data => postHttp(caiApi+'/sprint/rest/story/'+libId+'/'+newManuscriptId+'/deliver', data)

// 传稿提交接口
export const manuscriptSubmit = data => postHttp(caiApi+'/sprint/rest/workflow/stories/'+libId+'/'+newManuscriptId+'/deliver/process', data)

// 获取用户部门接口
export const hasDepartment = data => getHttp(caiApi+'/sprint/security/groups/leaf/list', data)

// 送审获取数据接口
export const hasCensorship = data => getHttp(caiApi+'/sprint/rest/story/'+libId+'/'+newManuscriptId+'/submit/approve', data)

// 自审提交
export const hasCollate = data => postHttp(caiApi+'/sprint/rest/workflow/stories/'+libId+'/'+newManuscriptId+'/collate/process', data)

// 送审接口
export const submitCensorship = data => postHttp(caiApi+'/sprint/rest/workflow/stories/'+libId+'/'+newManuscriptId+'/submit/approve/process', data)

// 通过接口
export const subAdopt = data => postHttp(caiApi+'/sprint/rest/workflow/stories/'+libId+'/'+newManuscriptId+'/approve/pass/process', data)

// 终审接口
export const subFinalJudgment = data => postHttp(caiApi+'/sprint/rest/workflow/stories/'+libId+'/'+newManuscriptId+'/approve/pass/process/all', data)

// 驳回数据请求
export const hasReject = data => postHttp(caiApi+'/sprint/rest/story/'+libId+'/'+newManuscriptId+'/list/records/deny', data)

// 驳回提交接口
export const subReject = data => postHttp(caiApi+'/sprint/rest/story/'+libId+'/'+newManuscriptId+'/list/records/deny', data)

// 改稿保存接口
export const revision = (data,url) => postHttp(url?url:caiApi+'/sprint/rest/workflow/stories/'+libId+'/'+newManuscriptId+'/product/edit/process', data)

// 稿件选用
export const subSelect = data => postHttp(caiApi+'/sprint/rest/workflow/stories/'+libId+'/'+newManuscriptId+'/product/fetch/process', data)

// 稿件改时数据获取
export const hasChangeTime = data => getHttp(caiApi+'/sprint/rest/story/'+libId+'/'+newManuscriptId+'/publish/time', data)

// 稿件改时接口提交
export const subChangeTime = data => postHttp(caiApi+'/sprint/rest/workflow/stories/'+libId+'/'+newManuscriptId+'/publish/time/process', data)

// 撤稿
export const withdraw = data => getHttp(caiApi+'/sprint/rest/workflow/stories/'+libId+'/'+newManuscriptId+'/retract/process', data)

// 一键撤稿获取数据接口
export const hasFinalJudgment = data => getHttp(caiApi+'/sprint/rest/story/'+libId+'/'+newManuscriptId+'/deepRetract', data)

// 抽取关键词
export const extractingKeywords = data => postHttp(caiApi+'/sprint/rest/deepCogni/KeyWord', data)

// 自动摘要
export const abstract = data => postHttp(caiApi+'/sprint/rest/deepCogni/getSummary', data)

//综合分析基本信息
export const basicInfos = data => postHttp(caiApi+'/ilgcreation/analysis/basicInfos', data)

//综合分析情感的分
export const emotionScore = data => postHttp(caiApi+'/ilgcreation/analysis/emotionScore', data)

//自动配图 192.168.4.68:9117/ilgcreation/autoIllustrated
export const autoIllustrated = data => postHttp(caiApi+'/ilgcreation/autoIllustrated', data)

//封面自动配图 ilgcreation/coverAutoIllustrated
export const coverAutoIllustrated = data => postHttp(caiApi+'/ilgcreation/coverAutoIllustrated', data)

//上头像 
export const upload = data => postHttp(caiApi+'/sprint/media-library/upload', data)

//媒资库收藏列表
export const getFavoriteMediaIds = data => postHttp(caiApi+'/ilgcreation/favoriteMedia/getFavoriteMediaIds', data)



