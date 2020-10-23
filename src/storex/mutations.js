// 提交 mutations是更改Vuex状态的唯一合法方法

export const modifyBName = (state, name) => { 
    state.scrollTop = name
}

export const modifySName = (state, name) => { 
    state.sidebarArr = name
}

export const modifyId = (state, name) => { 
    state.sidebarByid = name
}

export const modifydataType = (state, name) => { 
    state.dataType = name
}

export const modifydataTitle = (state, name) => { 
    state.title = name
}

export const modifydatahtmlContent = (state, name) => { 
    state.htmlContent = name
}
