import request from '../utils/request'
// 文章分类
export function addCategory(categoryName, categoryAlias) {
    return request({
        url: '/category',
        method: 'post',
        data: {
            name: categoryName,
            alias: categoryAlias
        }
    })
}

export function getCategory() {
    return request({
        url: '/category',
        method: 'get',
    })
}

export function deleteCategory(id) {
    return request({
        url: '/category',
        method: 'delete',
        data: {
            id
        }
    })
}
export function editCategory(category) {
    return request({
        url: '/category',
        method: 'put',
        data: {
            id: category.id,
            name: category.category,
            alias: category.alias
        }
    })
}

// 文章
export function getAticalList(articleListInfo) {
    return request({
        url: `/article/list?total=${articleListInfo.articalAmount}&page=${articleListInfo.pageNumber}`,
        method: 'get'
    })
}

export function getArticalDetail(articalId) {
    return request({
        url: `/article?id=${articalId}`,
        method: 'get'
    })
}

export function addArtical(articalInfo) {
    return request({
        url: '/article',
        method: 'post',
        data: {
            title: articalInfo.title,
            article: articalInfo.article,
            author: articalInfo.author,
            abstract: articalInfo.abstract,
            category_id: articalInfo.category_id
        }
    })
}

export function editArtical(articalInfo) {
    return request({
        url: '/article',
        method: 'put',
        data: {
            title: articalInfo.title,
            article: articalInfo.article,
            author: articalInfo.author,
            abstract: articalInfo.abstract,
            category_id: articalInfo.category_id,
            id: articalInfo.id
        }
    })
}

export function deleteArtical(articalId) {
    return request({
        url: '/article',
        method: 'delete',
        data: {
           id:articalId
        }
    })
}

// 文章评论
export function getArticalComment(articalId){
    return request({
        url: `/comment?article_id=${articalId}`,
        method: 'get'
    })
}

