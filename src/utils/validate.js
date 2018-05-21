import * as base from '../utils/base'

class Validate {
    // 正则配置
    _RegConfig = {
        'mobile': /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(17[0|1|3|5|6|7|8]{1})|(18[0-9]{1}))+\d{8})$/,
        'email': /^[A-Za-z0-9-_\.]+\@([A-Za-z0-9-_]+\.)+[A-Za-z0-9]{2,6}$/,
        'pwd': /^(?=[\w\W])[^*]{6,16}$/,
        'name': /^(?=[\w\W])[^(*|\u4e00-\u9fa5)]{1,20}$/,
        'companyname': /^[\u4e00-\u9fa5A-Za-z_\-\(\)\（\）]{4,50}$/,
        'telephone': /^\d{3,4}-\d{7,8}(-\d{3,4})?$/,
        'address': /^[\u4e00-\u9fa5A-Za-z0-9_\-\(\)\（\）]{1,30}$/,
        'department': /^[\u4e00-\u9fa5A-Za-z]{1,20}$/,
        'nickname': /^[\u4e00-\u9fa5A-Za-z]{1,20}$/,
        'job': /^[\u4e00-\u9fa5A-Za-z]{1,20}$/,
        'contact': /^[\u4e00-\u9fa5A-Za-z]{1,20}$/,
        'website': /^(https?:\/\/)?(www\.)?\w+\.\w+$/
    };
    regCheck(val, regType) {
        return this._RegConfig[regType].test(val) ? true : false
    };
    isEmpty(val) {
        if (base.isString(val)) {
            return val.trim() === '' ? true : false
        } else {
            base.throwError('请输入类型为Sting的参数！')
        }
    }
}

export default Validate