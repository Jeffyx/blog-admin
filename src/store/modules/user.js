import {
    getToken,
    setToken,
    removeToken
}
    from '../../utils/auth'
import { login,register } from '@/api/user'
import localForage from 'localforage'

const user = {
    state: {
        token: getToken()
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        }
    },
    actions: {
        // 登录
        Login({ commit }, userInfo) {
            const username = userInfo.name.trim()
            return new Promise((resolve, reject) => {
                login(username, userInfo.password).then(response => {
                    const data = response.data
                    setToken(response.token)
                    commit('SET_TOKEN', response.token)
                     // 本地存储用户信息
                     localForage.setItem('userInfo',data[0]).then(()=>{
                     })
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 用户注册
        Register({commit},userInfo){
            return new Promise((resolve, reject) => {
                register(userInfo.username, userInfo.pass).then(response => {
                    const data = response.data
                    setToken(response.token)
                    commit('SET_TOKEN', response.token)
                     // 本地存储用户信息
                     localForage.setItem('userInfo',data[0]).then(()=>{
                     })
                    resolve(response.code)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取用户信息
        // GetInfo({ commit, state }) {
        //     return new Promise((resolve, reject) => {
        //         getInfo(state.token).then(response => {
        //             const data = response.data
        //             commit('SET_ROLES', data.roles)
        //             commit('SET_NAME', data.name)
        //             commit('SET_AVATAR', data.avatar)
        //             resolve(response)
        //         }).catch(error => {
        //             reject(error)
        //         })
        //     })
        // },

        // 登出
        // LogOut({ commit, state }) {
        //     return new Promise((resolve, reject) => {
        //         logout(state.token).then(() => {
        //             commit('SET_TOKEN', '')
        //             commit('SET_ROLES', [])
        //             removeToken()
        //             resolve()
        //         }).catch(error => {
        //             reject(error)
        //         })
        //     })
        // },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
    }
}

export default user