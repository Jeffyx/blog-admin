<template>
  <div class="login">
    <div class="login-box">
      <el-form status-icon :model="ruleForm" ref="ruleForm" label-width="100px" class="loginForm" :label-position="labelPosition">
        <p class="title">SUPER ADMIN</p>
      <div class="username">
        <el-form-item label="用户名">
          <el-input v-model="ruleForm.name" @blur="checkUsername" @input="removeNameTip" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <div class="error-tip name-tip" v-show="isNametipShow">{{nameTip}}</div>
      </div>
       
     <div class="password">
        <el-form-item label="密码">
          <el-input 
          v-model="ruleForm.password"
          type="password"
          auto-complete="off"
          @blur="checkPassword"
          @input="removePasswordTip"
          placeholder="请输入密码"
          >
          </el-input>
        </el-form-item>
        <div class="error-tip password-tip" v-show="isPasswordtipShow">{{passwordTip}}</div>
     </div>
      <el-form-item class='login-button'>
        <el-button type="primary" @click='login'>登录</el-button>
      </el-form-item>
      </el-form>
       <router-link to='/register' class="no-register" tag="p">还没有账号？请注册</router-link>
    </div>
   <router-view></router-view>
  </div>
</template>
<script>
import Validate from "@/utils/validate"
import {login} from '@/api/user'
import {mapActions} from 'vuex'
import {setToken} from '@/utils/auth'
export default {
  data() {
    return {
      labelPosition: "middle",
      ruleForm: {
        name: "",
        password: ""
      },
      nameTip: "用户名错误",
      passwordTip: "密码错误",
      isNametipShow: false,
      isPasswordtipShow: false,
    };
  },
  methods: {
    ...mapActions(['Login']),
    login() {
      if(!this.checkUsername() || !this.checkPassword()){
        this.checkUsername()
        this.checkPassword()
      }else{
        // 登录逻辑
        this.Login(this.ruleForm).then(()=>{
          this.$router.push('/');
        })
        
      }
     
    },
    checkUsername() {
      const validate = new Validate()
      if (validate.isEmpty(this.ruleForm.name)) {
        this.showNameTip("请输入用户名")
      } else if (!validate.regCheck(this.ruleForm.name, "name")) {
        this.showNameTip("用户名格式有误！")
      }else{
          return true
      }
    },
    checkPassword() {
      const validate = new Validate();
      if (validate.isEmpty(this.ruleForm.password)) {
        this.showPasswordTip("请输入密码");
      } else if (!validate.regCheck(this.ruleForm.password, "pwd")) {
        this.showPasswordTip("密码格式有误！");
      }else{
         return this.checkUsername() ? true : false 
      }
    },
    showNameTip(tip) {
      this.nameTip = tip;
      this.isNametipShow = true;
    },
    removeNameTip() {
      this.isNametipShow = false;
    },
    showPasswordTip(tip) {
      this.passwordTip = tip;
      this.isPasswordtipShow = true;
    },
    removePasswordTip() {
      this.isPasswordtipShow = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  text-align: center;
  .title {
    text-align: center;
    margin: 0;
    padding-bottom: 40px;
    font-weight: bold;
    padding-left: 100px;
    font-size: 22px;
    color: #409eff;
  }
  background: url("../../assets/images/loginBg.jpg") center no-repeat;
  position: relative;
  .login-box {
    position: absolute;
    width: 300px;
    height: 300px;
    margin: auto;
    left: -105px;
    right: 0;
    top: 0;
    bottom: 120px;

    .username {
      height: 60px;
    }
    .password {
      height: 60px;
      padding-top: 8px;
    }
  }
}
.error-tip {
  color: #cc0000;
  text-align: left;
  text-indent: 8.4em;
  padding-top: 5px;
  font-size: 12px;
}
.el-form-item {
  margin-bottom: 0;
}
.login-button {
  margin-top: 10px;
}
.no-register {
  font-size: 12px;
  color: #409eff;
  text-align: center;
  padding-left: 94px;
  padding-top: 5px;
  cursor: pointer;
  font-weight: 600;
}
.el-form-item__label {
  color: #fff;
}
</style>


