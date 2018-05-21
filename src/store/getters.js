const getters = {
    token:state => state.user.token,
    userInfo:state => state.user.userInfo,
    category:state => state.app.category,
    articalList:state => state.app.articalList
}

export default getters