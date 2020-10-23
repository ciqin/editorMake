// 给action注册事件处理函数。当这个函数被触发时候，将状态提交到mutations中处理
export function modifyBName({commit}, name) {
    return commit ('modifyBName', name)
}

export function modifySName({commit}, name) {
    return commit ('modifySName', name)
}

export function modifyId({commit}, name) {
    return commit ('modifyId', name)
}
 
export function modifydataType({commit}, name) {
    return commit ('modifydataType', name)
}

export const modifyDataTitle = ({commit},name) => commit('modifydataTitle', name)

export const modifyDatahtmlContent = ({commit},name) => commit('modifydatahtmlContent', name)


// ES6精简写法
// export const modifyAName = ({commit},name) => commit('modifyAName', name)