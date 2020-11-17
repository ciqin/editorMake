import Vue from 'vue'
export const store = Vue.observable({
    userInfo: {},
    roleIds: [],
    avatar:"高红兵",
    navText:"我的工作区",
    mediaMax:78,
    listObj:[{name:"312",index:0},{name:"312",index:1},{name:"312",index:2},{name:"312",index:3}],
    ueditor:null,
    savedata:{},
    objid:"",
    Title:"",
    submit:false,
    gettaxt:"",
    ueditorWidth:window.innerWidth- 1120
})
export const mutations = {
    setUserInfo(userInfo) {
      store.userInfo = userInfo
    },
    setRoleIds(roleIds) {
      store.roleIds = roleIds
    },
    setAvatar(avatar) {
      store.avatar = avatar
    },
    setNavText(navText) {
      store.navText = navText
    },
    setMediaMax (mediaMax) {
      store.mediaMax = mediaMax
    },
    setListObj (listObj) {
      store.listObj = listObj
    },
    setSaveData (savedata) {
      store.savedata = savedata
    },
    setTitle (Title) {
      store.Title = Title
    },
    setSubmit (Title) {
      store.submit = submit
    },
    setobjid(objid){
      store.objid = objid
    }
}