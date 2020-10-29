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

export const modifySubmit = (state, name) => { 
    state.submit = name
}

export const modifyCensorship = (state, name) => { 
    state.censorship = name
}

export const modifyAdopt= (state, name) => { 
    state.adopt = name
}

export const modifyCheckIn= (state, name) => { 
    state.checkIn = name
}

export const modifyReject= (state, name) => { 
    state.rejectData = name
}

export const modifySelectId= (state, name) => { 
    state.selectId = name
}


export const modifyChangeTime = (state, name) => { 
    state.changeTime = name
}


export const modifyManyContribution= (state, name) => { 
    state.manyContribution = name
}

export const modifylistenManuscript= (state, name) => { 
    state.listenManuscript = name
}


