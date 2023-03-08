<template>
  <div class="login-container">
    <!-- <img
      src="@/assets/img/login.jpeg"
      class="login-logo"
      style="width: 100%; height: 100%; position: fixed"
    > -->

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
              :loading="loading"
              type="primary"
              style="
                width: 100%;
                margin-bottom: 30px;
                background-color: #ffcd5e;
              "
              @click.native.prevent="handleLogin"
            >
              <b style="color: white">LOGIN</b>
            </el-button>
          </el-form>
        </el-col>
        <el-col :sm="12">
          <img
            src="@/assets/img/logo2.svg"
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

@Component({
  name: 'Login',
  components: {
    LangSelect
  }
})
export default class extends Vue {
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

  private loginForm = {
    email: '',
    password: ''
  };

  private loginRules = {
    email: [{ validator: this.validateUsername, trigger: 'blur' }],
    password: [{ validator: this.validatePassword, trigger: 'blur' }]
  };

  private passwordType = 'password';
  private loading = false;
  private showDialog = false;
  private redirect?: string;
  private otherQuery: Dictionary<string> = {};

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
    if (this.loginForm.email === '') {
      (this.$refs.email as Input).focus()
    } else if (this.loginForm.password === '') {
      (this.$refs.password as Input).focus()
    }
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
          this.$message({
            message: 'Invalid email or password',
            type: 'error'
          })
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
  // background-color: #121212;
  background-color: white;
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
      color: $lightGray;

      -webkit-appearance: none;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
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
    color: #fff;
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
