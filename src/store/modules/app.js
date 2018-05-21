import {
    getArticalDetail,
    addArtical,
    getCategory,
    getAticalList
} from '@/api/app'
import { resolve } from 'path';
import { timeFormat } from '@/utils/base'

const app = {
    state: {
        category: [],
        articalList: []
    },
    mutations: {
        SET_CATEGORY: (state, category) => {
            state.category = category
        },
        DELET_CATEGORY: (state, category) => {
            // 根据ID删除数组里的对象
            state.category = state.category.filter(element => {
                return element.id !== category.id
            });
        },
        EDIT_CATEGOTY: (state, category) => {
            state.category.forEach(element => {
                if (element.id === category.id) {
                    element.category = category.category
                    element.alias = category.alias
                }
            });
        },

        SET_ARTICALLIST: (state, articalList) => {
            state.articalList = articalList
        },
        DETELE_ARTICALIST: (state, articalId) => {
            // 从数组中找到需要删除的文章的id，删除该数组元素
            state = state.filter(item => {
                // return item.id
            })
        }

    },
    actions: {
        // 获取分类
        GetCategory({ commit }) {
            return new Promise((resolve, reject) => {
                getCategory().then(response => {
                    // 获取信息并保存
                    commit('SET_CATEGORY', [...response.data])
                    resolve();
                })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        // 删除分类
        DeleteCategory({ commit }, categoryElement) {
            return new Promise((resolve, reject) => {
                deleteCategory(categoryElement.id).then(response => {
                    if (response.code == 200) {
                        // 获取信息并保存
                        commit('DELET_CATEGORY', categoryElement)
                        resolve();
                    }

                })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        // 修改分类
        EditCategory({ commit }, category) {
            return new Promise((resolve, reject) => {
                editCategory(category).then(response => {
                    if (response.code == 200) {
                        commit('EDIT_CATEGOTY', category)
                        resolve()
                    }
                })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        // 获取文章列表
        GetAticalList({ commit },articleListInfo) {
            return new Promise((resolve, reject) => {
                getAticalList(articleListInfo).then(response => {
                    response.data.forEach(item => {
                        item.create_time = timeFormat(item.create_time)
                    })
                    // 获取信息并保存
                    commit('SET_ARTICALLIST', [...response.data])
                    resolve();
                })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
}

export default app