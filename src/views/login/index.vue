<template>
  <div class="login-container">
    <img
      class="login-logo"
      style="width: 100%; height: 100%; position: fixed"
    >

    <div class="boxed">
      <el-row :gutter="24">
        <el-col :sm="12">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            autocomplete="on"
            label-position="left"
          >
            <div class="title-container">
              <h3 class="title">
                <b style="color: black">Login Form</b>
              </h3>
            </div>

            <el-form-item prop="email">
              <span class="svg-container">
                <svg-icon name="user" />
              </span>
              <el-input
                ref="email"
                v-model="loginForm.email"
                :placeholder="$t('login.email')"
                name="email"
                type="text"
                autocomplete="on"
              />
            </el-form-item>
            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon name="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                :placeholder="$t('login.password')"
                name="password"
                autocomplete="on"
                @keyup.enter.native="handleLogin"
              />
              <span
                class="show-pwd"
                @click="showPwd"
              >
                <svg-icon
                  :name="passwordType === 'password' ? 'eye-off' : 'eye-on'"
                />
              </span>
            </el-form-item>
            <el-button
              mini
              type="text"
              @click="centerDialogVisible = true"
            >
              Forgot Password?
            </el-button>
            <el-button
              :loading="loading"
              type="primary"
              style="
                width: 100%;
                margin-bottom: 30px;
                background: linear-gradient(180deg, #0DAFDD 0%, #5FD8FB 100%) !important;
                border: 1px solid #39b3c0 !important;
              "
              @click.native.prevent="handleLogin"
            >
              <b style="color: white">LOGIN</b>
            </el-button>
          </el-form>
          <el-dialog
            title="Forgot Password"
            :visible.sync="centerDialogVisible"
            width="30%"
            :before-close="closeDialog"
            center
          >
            <el-form
              ref="resetForm"
              :model="resetForm"
              :rules="resetRules"
              status-icon
              class="demo-form"
              label-position="left"
            >
              <el-form-item
                style="margin-bottom: 20px"
                prop="email"
              >
                <el-input
                  ref="email"
                  v-model="resetForm.email"
                  name="email"
                  autocomplete="on"
                  style="width: 100%"
                  placeholder="Please enter your email"
                />
              </el-form-item>
            </el-form>
            <span
              slot="footer"
              class="dialog-footer"
            >
              <el-button
                :loading="resetloading"
                type="danger"
                @click="forgotPassword"
              >Reset</el-button>
              <el-button
                @click="closeDialog"
              >Cancel
              </el-button>
            </span>
          </el-dialog>
          <el-dialog
            title="Change Password"
            :visible.sync="changePasswordDialog"
            width="30%"
            center
          >
            <el-form
              ref="changePasswordForm"
              :model="changePasswordForm"
              :rules="changePassRules"
              status-icon
              class="demo-form"
              label-position="left"
            >
              <el-form-item
                style="margin-bottom: 20px"
                prop="password"
              >
                <el-input
                  ref="password"
                  :key="passwordType"
                  v-model="changePasswordForm.password"
                  name="password"
                  :type="passwordType"
                  style="width: 100%"
                  placeholder="Password"
                />
                <span
                  class="show-pwd"
                  @click="showPwd"
                >
                  <svg-icon
                    :name="passwordType === 'password' ? 'eye-off' : 'eye-on'"
                  />
                </span>
              </el-form-item>
              <el-form-item
                style="margin-bottom: 20px"
                prop="confirmPassword"
              >
                <el-input
                  ref="confirmPassword"
                  :key="confirmPasswordType"
                  v-model="changePasswordForm.confirmPassword"
                  name="confirmPassword"
                  :type="confirmPasswordType"
                  style="width: 100%"
                  placeholder="Confirm Password"
                />
                <span
                  class="show-pwd"
                  @click="showConfirmPwd"
                >
                  <svg-icon
                    :name="confirmPasswordType === 'password' ? 'eye-off' : 'eye-on'"
                  />
                </span>
              </el-form-item>
            </el-form>
            <span
              slot="footer"
              class="dialog-footer"
            >
              <el-button
                :loading="changePasswordloading"
                type="success"
                @click="changePassword"
              >Reset</el-button>
              <el-button
                @click="changePasswordDialog = false"
              >Cancel
              </el-button>
            </span>
          </el-dialog>
        </el-col>
        <el-col :sm="12">
          <img
            src="@/assets/img/varni-main-logo.png"
            width="600px"
            style="margin-left:50px;margin-top: 100px;"
            class="login-logo"
          >
        </el-col>
      </el-row>
    </div>
    <div>
      <!-- <img
        src="@/assets/img/leaves.png"
        class="leaves"
      > -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { AdminModule } from '@/store/modules/admin'
import { isValidEmail } from '@/utils/validate'
import LangSelect from '@/components/LangSelect/index.vue'
import { Dictionary, Route } from 'vue-router/types/router'
import { Input } from 'element-ui'
import { ElForm } from 'element-ui/types/form'
import {
  changePassword,
  changePasswordLink,
  forgotPassword
} from '@/api/admins'
import data from '../pdf/content'

@Component({
  name: 'Login',
  components: {
    LangSelect
  }
})
export default class extends Vue {
  centerDialogVisible: boolean = false;
  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (!isValidEmail(value)) {
      callback(new Error('Please enter valid email'))
    } else {
      callback()
    }
  };

  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 6) {
      callback(new Error('The password can not be less than 6 digits'))
    } else {
      callback()
    }
  };

  private validateEmail = (rule: any, value: string, callback: Function) => {
    if (!isValidEmail(value)) {
      callback(new Error('Please enter valid email'))
    } else {
      callback()
    }
  };

  created() {
     var paramsArray:any=window.location.href.split('?')[1].split('&')
    const code = paramsArray[1].split('=')[1]
    const id = paramsArray[0].split('=')[1]
    
    if (code != null && id != null) {
      this.changePasswordForm.userId = parseInt(id)
      this.changePasswordForm.sessionId = code
      this.checkLink()
    }
  }

    // const urlParams = new URLSearchParams(window.location.search)
    // const code = urlParams.get('sessionId')
    // const id = urlParams.get('id')
    // if (code != null && id != null) {
    //   this.changePasswordForm.userId = parseInt(id)
    //   this.changePasswordForm.sessionId = code
    //   this.checkLink()
    // }
  // }

  private async checkLink() {
    try {
      await changePasswordLink(this.changePasswordForm).then((res: any) => {
        if (res.responseCode == 300 && AdminModule.id == null) {
          this.$message({
            message: 'Oops! Link expired',
            type: 'error'
          })
        } else if (res.responseCode == 200) {
          this.changePasswordDialog = true
        } else {
        }
      })
    } catch (error) {
      this.$message(error.message)
    }
  }

  private loginForm = {
    email: '',
    password: ''
  };

  private resetForm = {
    email: ''
  };

  private changePasswordForm = {
    password: '',
    confirmPassword: '',
    userId: 0,
    sessionId: ''
  };

  private loginRules = {
    email: [{ validator: this.validateUsername, trigger: 'blur' }],
    password: [{ validator: this.validatePassword, trigger: 'blur' }]
  };

  private resetRules = {
    email: [{ validator: this.validateEmail, trigger: 'blur' }]
  };

  private changePassRules = {
    password: [
      {
        validator: this.validatePassword,
        trigger: 'blur',
        message: 'Password is required'
      }
    ],
    confirmPassword: [
      {
        validator: this.validatePassword,
        trigger: 'blur',
        message: 'Confirm password is required'
      }
    ]
  };

  private passwordType = 'password'
  private confirmPasswordType = 'password'
  private resetloading = false
  private showDialog = false
  private changePasswordDialog = false
  private changePasswordloading = false
  private loading = false

  private redirect?: string;
  private otherQuery: Dictionary<string> = {}

  @Watch('$route', { immediate: true })
  private onRouteChange(route: Route) {
    // TODO: remove the "as Dictionary<string>" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    const query = route.query as Dictionary<string>
    if (query) {
      this.redirect = query.redirect
      this.otherQuery = this.getOtherQuery(query)
    }
  }

  mounted() {
  //   if (this.loginForm.email === '') {
  //     (this.$refs.email as Input).focus()
  //   } else if (this.loginForm.password === '') {
  //     (this.$refs.password as Input).focus()
  //   }
  // }
   if (this.loginForm.email === '') {
      (this.$refs.email as Input).focus()
    } else if (this.loginForm.password === '') {
      (this.$refs.password as Input).focus()
    }
  }

  private closeDialog(){
    this.centerDialogVisible = false
    this.resetForm.email = ''
  }

  private async changePassword() {
    (this.$refs.changePasswordForm as ElForm).validate(
      async(valid: boolean) => {
        if (this.changePasswordForm.password === this.changePasswordForm.confirmPassword) {
          if (valid) {
            this.changePasswordloading = true
            try {
              await changePassword(this.changePasswordForm)
              this.$notify({
                title: 'Success',
                message: 'Password changed successfully',
                type: 'success',
                duration: 3000
              })
              this.changePasswordloading = false
              this.changePasswordDialog = false
            } catch (error) {
              this.changePasswordloading = false
              this.$message(error.message)
            }
          } else {
            this.$message({
              message: 'Enter all details',
              type: 'error'
            })
            return false
          }
        } else {
          this.$message({
            message: 'Password doesn\'t match',
            type: 'error'
          })
          return false
        }
      }
    )
  }

  private async forgotPassword() {
    (this.$refs.resetForm as ElForm).validate(async(valid: boolean) => {
      if (valid) {
        this.resetloading = true
        try {
          var data:any = await forgotPassword(this.resetForm)
          if (data.responseCode == 200) {
            this.$notify({
              title: 'Success',
              message: 'Reset link has been sent to your mail',
              type: 'success',
              duration: 3000
            })
            this.centerDialogVisible = false
            this.resetForm.email = ''
          } else {
            this.$message({
              message: 'Email does not exists',
              type: 'error'
            })
          }
          this.resetloading = false
        } catch (error) {
          this.resetloading = false
        }
      } else {
        this.$message({
          message: 'Invalid email',
          type: 'error'
        })
        return false
      }
    })
  }

  private showPwd() {
    if (this.passwordType === 'password') {
      this.passwordType = ''
    } else {
      this.passwordType = 'password'
    }
    this.$nextTick(() => {
      (this.$refs.password as Input).focus()
    })
  }

  private showConfirmPwd() {
    if (this.confirmPasswordType === 'password') {
      this.confirmPasswordType = ''
    } else {
      this.confirmPasswordType = 'password'
    }
    this.$nextTick(() => {
      (this.$refs.confirmPassword as Input).focus()
    })
  }

  private handleLogin() {
    (this.$refs.loginForm as ElForm).validate(async(valid: boolean) => {
      if (valid) {
        this.loading = true
        try {
          await AdminModule.Login(this.loginForm)
          this.$router.push({
            path: this.redirect || '/',
            query: this.otherQuery
          })
        } catch (error) {
          this.loading = false
        }
      } else {
        this.$message({
          message: 'Invalid email or password',
          type: 'error'
        })
        return false
      }
    })
  }

  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }
      return acc
    }, {} as Dictionary<string>)
  }
}
</script>

<style lang="scss">
@supports (-webkit-mask: none) and (not (cater-color: $loginCursorColor)) {
  .login-container .el-input {
    input {
      color: $loginCursorColor;
    }
    input::first-line {
      color: $darkGray;
    }
  }
}

.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #121212;
  // background-color: white;
  // background-image:'url(/assets/img/stupzlogin.jpeg)' ;
  // background-image: linear-gradient(316deg, #f94327 0%, #ff7d14 74%);
  // background: linear-gradient(180deg, #FFFFFF 0%, #E03C18 95.9%);
  background-size: cover;
  box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.1);
  .boxed {
    width: 80%;
    margin: 10em auto;
    margin-bottom: 0px;
    .login-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
  }

  .login-form {
    position: relative;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
    background: #fff;
    padding: 3em 2em 1em;
    border-radius: 1em;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    caret-color: black;

    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: black;
      -webkit-text-fill-color: black!important;;

      -webkit-appearance: none;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: black !important;
      }
    }
  }

  ::placeholder {
  color: black;
  opacity: 1; /* Firefox */
}

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  .tips {
    font-size: 14px;
    color: black;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .login-logo {
      max-width: 20em;
      margin: 0 auto;
      width: 100%;
      display: inherit;
    }
    .title {
      font-size: 15px;
      color: rgb(235, 111, 51);
      margin: 0px auto 20px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
  .leaves {
    margin-top: -26%;
    width: 100%;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
