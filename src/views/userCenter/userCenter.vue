<template>
  <div class="user-center">
     <div class="container">
        <div class="avatar">
            <img :src="userInfo.head" v-if="userInfo" alt="">
            <div class="mask" @click='avatarModify'>
                <p>修改头像</p>
            </div>
        </div>
        <div class="level">
            <p>等级：</p>
            <el-rate
              v-model="userInfo.lv"
              disabled
              text-color="#ff9900"
            >
            </el-rate>
        </div>
        <div class="account">
            <div class="user-name">{{userInfo.user_name}}</div>
            <el-button type="text" @click="dialogFormVisible = true" class="password-modify">修改密码</el-button>
            <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="40%" :center=true>
              <el-form :model="ruleForm">
                 <div class="password">
                    <el-form-item label="新的密码" >
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
              </el-form>
              <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="passwordModification">确 定</el-button>
              </div>
            </el-dialog>
        </div>
        <div class="main-info" v-show="isMainInfoShow">
            <div class="userNick">
              <p>用户昵称：<span>{{userInfo.nick}}</span><i class="el-icon-edit" @click="userNickModify"></i></p>
            </div>
            <div class="phone">
               <p>电话号码：<span>{{userInfo.phone}}</span><i class="el-icon-edit" @click="phoneModify"></i></p>
            </div>
            <div class="address">
               <p>住址：<span>{{userInfo.address}}</span><i class="el-icon-edit" @click='addressModify'></i></p>
            </div>
            <div class="email">
               <p>邮箱：<span>{{userInfo.email}}</span><i class="el-icon-edit" @click="emailModify"></i></p>
            </div>
        </div>
        <el-upload
            class="avatar-uploader"
            action=" https://image.xiexiaoshun.com/photo/user"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :multiple=false
            >
            <i v-if="!isMainInfoShow" class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
     </div>
  </div>
</template>
<script>
import localForage from "localforage";
import Validate from "@/utils/validate";
import { getToken } from "@/utils/auth";
import { userInfoModify, passwordModify } from "@/api/user";
export default {
  data() {
    return {
      isMainInfoShow: true,
      imageUrl: "",
      userInfo: {},
      token: getToken(),
      dialogFormVisible: false,
      passwordTip: "请输入密码",
      repasswordTip: "请再次输入密码",
      isPasswordtipShow: false,
      isrePasswordtipShow: false,
      ruleForm: {
        pass: "",
        checkPass: ""
      },
      formLabelWidth: "100px"
    };
  },
  created() {
    localForage.getItem("userInfo").then(data => {
      this.userInfo = data;
    });
  },
  computed: {},
  methods: {
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
    userNickModify() {
      const pattern = /^[\u4e00-\u9fa5A-Za-z]{1,20}$/;
      this.mainUserInfoModify(
        "请输入新的昵称",
        "昵称",
        "nick",
        pattern,
        "昵称格式有误"
      );
    },
    passwordModification() {
      this.dialogFormVisible = false;
      if (!this.checkPassword() || !this.checkrePassword()) {
        this.checkPassword();
        this.checkrePassword();
      } else {
        // 修改密码逻辑
        // 获取旧密码，新密码，username
        const userName = this.userInfo.user_name;
        const oldPassword = this.userInfo.password;
        console.log('this.userInfo',this.userInfo);
        console.log('oldPassword',oldPassword);
        const newPassword = this.ruleForm.checkPass;
        passwordModify(userName, oldPassword, newPassword).then(data => {
          if (data.code == 200) {
            let applyData = this.userInfo;
            applyData.password = newPassword;
            localForage.setItem("userInfo", applyData);
            this.$message({
              showClose: true,
              message: "恭喜你，密码修改成功！",
              type: "success"
            });
          }
        });
      }
    },
    avatarModify() {
      this.isMainInfoShow = false;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // 将图片链接存进本地
      // this.userInfo.head = `http:${res.data[0]}`;
      this.userInfo.head = res.data[0];
      localForage.setItem("userInfo", this.userInfo);
      this.isMainInfoShow = true;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    phoneModify() {
      const pattern = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(17[0|1|3|5|6|7|8]{1})|(18[0-9]{1}))+\d{8})$/;
      this.mainUserInfoModify(
        "请输入新的手机号码",
        "手机号码",
        "phone",
        pattern,
        "手机号码格式有误"
      );
    },
    addressModify() {
      const pattern = /^[\u4e00-\u9fa5A-Za-z0-9_\-\(\)\（\）]{1,30}$/;
      this.mainUserInfoModify(
        "请输入新的地址",
        "地址",
        "address",
        pattern,
        "地址号码格式有误"
      );
    },
    emailModify() {
      const pattern = /^[A-Za-z0-9-_\.]+\@([A-Za-z0-9-_]+\.)+[A-Za-z0-9]{2,6}$/;
      this.mainUserInfoModify(
        "请输入新的邮箱地址",
        "邮箱",
        "email",
        pattern,
        "邮箱格式有误"
      );
    },
    mainUserInfoModify(tip, successTip, modifyType, pattern, errorMsg) {
      this.$prompt(tip, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: pattern,
        inputErrorMessage: errorMsg
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: `你的${successTip}是：${value}`
          });
          // 提交服务器
          let { id, phone, address, head, email, nick } = this.userInfo;
          let applyData = { id, phone, address, head, email, nick };
          applyData[modifyType] = value;
          userInfoModify(applyData).then(data => {
            // 把服务器返回的数据存至本地
            if (data.code == 200) {
              this.userInfo[modifyType] = value;
              localForage.setItem("userInfo", this.userInfo);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.user-center {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/images/loginBg.jpg") center no-repeat;
}
.container {
  width: 1000px;
  height: 600px;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  box-shadow: 20px 20px 10px 0px rgba(0, 0, 0, 0.5);
  border: 1px solid #eee;
  background: rgba(255, 255, 255, 0.7);
  .avatar {
    position: relative;
    width: 200px;
    height: 200px;
    margin: 20px 0 0 20px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5);
    &:hover .mask {
      display: block;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .mask {
      position: absolute;
      text-align: center;
      bottom: 0;
      left: 0;
      width: 200px;
      height: 30%;
      background-color: rgba(0, 0, 0, 0.5);
      display: none;
      cursor: pointer;
      p {
        margin: 0;
        line-height: 60px;
        cursor: pointer;
        color: #fff;
      }
    }
  }
  .level {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 245px;
  }
  .account {
    margin-left: 20px;
    width: 200px;
    text-align: center;
    .user-name {
      padding: 8px 0;
      font-weight: 600;
      font-size: 18px;
    }
    .password-modify {
      padding: 8px 0;
      color: #409eff;
      cursor: pointer;
    }
  }
  .main-info {
    position: absolute;
    width: 700px;
    height: 410px;
    right: 20px;
    top: 20px;
    p {
      margin: 0;
      text-align: left;
      height: 100%;
      position: relative;
      padding: 40px 20px;
      i {
        position: absolute;
        right: 40px;
      }
    }
  }
}
.avatar-uploader {
  width: 200px;
  position: absolute;
  left: 300px;
  top: 20px;
}
.avatar-uploader-icon {
  width: 200px;
  height: 200px;
  border: 1px dashed #000;
  line-height: 200px;
  text-align: center;
}
.error-tip {
  color: #cc0000;
  text-align: left;
  text-indent: 5.5em;
  padding-top: 5px;
  font-size: 12px;
}
.el-form-item {
  margin-bottom: 0;
}
.password,
.repassword {
  height: 90px;
  .el-input {
    width: 80%;
  }
  .el-form-item__label {
    width: 100px !important;
  }
}
</style>


