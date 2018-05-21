import request from '../utils/request'
import { Message } from 'element-ui';
export function login(username, password) {
    return request({
        url: '/user/login',
        method: 'post',
        data:{
            user_name:username,
            password:password
        }
    })
}
export function register(username, password) {
    return request({
        url: '/user',
        method: 'post',
        data:{
            user_name:username,
            password:password
        }
    })
}
/**
 * @method 用户信息修改
 * @export
 * @param {Object} newUserInfo 
 * @returns promise
 */
export function userInfoModify(newUserInfo){
    return request({
        url: '/user',
        method: 'put',
        data:newUserInfo
    })
}

export function passwordModify(userName,oldPassword,newPassword){
    return request({
        url: '/user/pwd',
        method: 'post',
        data:{
            user_name:userName,
            oldpwd:oldPassword,
            newpwd:newPassword
        }
    })
}