<template>
  <div class="register">
    <div class="register-box">
        <p class="title">用户注册</p>
        <el-form  status-icon  label-width="100px" class="demo-ruleForm">
             <div class="username">
                <el-form-item label="用户名">
                    <el-input v-model="ruleForm.username"  placeholder="请输入用户名" @blur="checkUsername" @input="removeNameTip"></el-input>
                </el-form-item>
                <div class="error-tip name-tip" v-show="isNametipShow">{{nameTip}}</div>
            </div>
            <div class="password">
                <el-form-item label="密码" >
                    <el-input type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="请输入密码" @blur="checkPassword" @input="removePasswordTip"></el-input>
                </el-form-item>
                 <div class="error-tip name-tip" v-show="isPasswordtipShow">{{passwordTip}}</div>
            </div>
            <div class="repassword">
                <el-form-item label="确认密码" >
                    <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="请再次输入密码" @blur="checkrePassword" @input="removerePasswordTip"></el-input>
                </el-form-item>
                 <div class="error-tip name-tip" v-show="isrePasswordtipShow">{{repasswordTip}}</div>
            </div>
            
           <el-form-item>
              <el-button type="primary" @click="register">注册</el-button>
              <el-button @click="reset">重置</el-button>
           </el-form-item>
        </el-form>
      </div>
  </div>
</template>
<script>
import Validate from "@/utils/validate";
import { register } from "@/api/user";
import { mapActions } from "vuex";
import { setToken } from "@/utils/auth";
export default {
  data() {
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        username: ""
      },
      nameTip: "请输入用户名",
      passwordTip: "请输入密码",
      repasswordTip: "请再次输入密码",
      isNametipShow: false,
      isPasswordtipShow: false,
      isrePasswordtipShow: false,
      backTime:3
    };
  },
  methods: {
    ...mapActions(['Register']),
    checkUsername() {
      const validate = new Validate();
      if (validate.isEmpty(this.ruleForm.username)) {
        this.showNameTip("请输入用户名");
      } else if (!validate.regCheck(this.ruleForm.username, "name")) {
        this.showNameTip("用户名格式有误！");
      } else {
        return true;
      }
    },
    checkPassword() {
      const validate = new Validate();
      if (validate.isEmpty(this.ruleForm.pass)) {
        this.showPasswordTip("请输入密码");
      } else if (!validate.regCheck(this.ruleForm.pass, "pwd")) {
        this.showPasswordTip("密码格式有误！");
      } else {
        return true;
      }
    },
    checkrePassword() {
      const validate = new Validate();
      if (validate.isEmpty(this.ruleForm.checkPass)) {
        this.showrePasswordTip("请再次输入密码");
      } else if (this.ruleForm.checkPass !== this.ruleForm.pass) {
        this.showrePasswordTip("请输入相同密码");
      } else {
        return true;
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
    },
    showrePasswordTip(tip) {
      this.repasswordTip = tip;
      this.isrePasswordtipShow = true;
    },
    removerePasswordTip() {
      this.isrePasswordtipShow = false;
    },
    reset() {
      Object.keys(this.ruleForm).forEach(item => {
        this.ruleForm[item] = "";
      });
      this.removeNameTip();
      this.removePasswordTip();
      this.removerePasswordTip();
    },
    register() {
      if (
        !this.checkUsername() ||
        !this.checkPassword() ||
        !this.checkrePassword()
      ) {
        this.checkUsername();
        this.checkPassword();
        this.checkrePassword();
      } else {
        // 注册逻辑
        this.registerOperate();
      }
    },
    async registerOperate() {
      const code = await this.Register(
        this.ruleForm
      );
      if (code == 200) {
        this.reset()
        this.$message({
          message: `恭喜你注册成功，正在登陆中...`,
          type: "success",
          duration:2500,
          center:true,
          onClose:this.backToLogin
        })
      }
    },
    backToLogin(){
        this.$router.push('/')
    }
  }
};
</script>
<style lang="scss" scoped>
.register {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  background: url("../../assets/images/loginBg.jpg") center no-repeat;
  text-align: center;
  .register-box {
    position: absolute;
    width: 300px;
    height: 300px;
    margin: auto;
    left: -105px;
    right: 0;
    top: 0;
    bottom: 120px;
  }
}
.title {
  text-align: center;
  margin: 0;
  padding-bottom: 40px;
  font-weight: bold;
  padding-left: 80px;
  font-size: 22px;
  color: #409eff;
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
.username,
.password,
.repassword {
  padding-bottom: 8px;
  height: 60px;
}
</style>


