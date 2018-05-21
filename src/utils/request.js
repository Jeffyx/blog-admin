import axios from 'axios'
import { getToken } from './auth'
import { Message } from 'element-ui';
import store from '../store'

// 创建axios实例
const service = axios.create({
    baseURL:'https://api.xiexiaoshun.com/v1',
    timeout:15000
})

// request 拦截器
// 拦截器白名单
service.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers['Token'] = getToken()
    }
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(
    response => {
        // console.log(`拦截器`,response);
        if(response.data.code !== 200 ){
            Message({
                message:response.data.msg,
                type:'error',
                duration:5*1000
            })

            if(response.code === 202 || response.code === 500){
                MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                      location.reload()// 为了重新实例化vue-router对象 避免bug
                    })
                  })
            }
            return Promise.reject('error')
        }else {
            return Promise.resolve(response.data)
        }

        
        
    },
    error =>{
        Message({
            message: '出错了',
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service