<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
    title="登录" class="page-nav-bar"
    />
    <!-- 登录表单 -->
    <!-- 表单验证：
        参考文档 https://vant-contrib.gitee.io/vant/v2/#/zh-CN/form#rule-shu-ju-jie-gou
    1.geivan-filed组件配置rules验证规则
    2.当表单提交的时候自动触发表单验证
    3.如果验证通过触发submit
    4.如果验证失败就不会触发 -->
    <van-form @submit="onSubmit" ref="loginForm">
    <van-field
    v-model="user.mobile"
    name="mobile"
    placeholder="请输入手机号"
    :rules="userFormRules.mobile"
    type="number"
    maxlength="11"
    >
    <i slot="left-icon">此处图标</i>
    </van-field>
    <van-field
    v-model="user.code"
    name="code"
    placeholder="请输入验证码"
    :rules="userFormRules.code"
    type="number"
    maxlength="6"
    >
    <i slot="left-icon">此处图标</i>
    <template #button>
        <!-- time倒计时时间 -->
    <van-count-down :time="1000*10" format="ss s" v-if="isCountDownShow" @finish="isCountDownShow=false"/>
    <van-button round size="small" type="default" class="send-sms-btn" @click="onSendSms" native-type="button" v-else >发送验证码</van-button>
    </template>
    </van-field>
    <div class="login-btn-wrap">
    <van-button  block type="info" native-type="submit" class="login-btn">登录</van-button>
    </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit () {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证

      // 组建中必须通过this.$toast来调用Toast组件
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true, // 背景禁用
        duration: 0 // 默认持续时间  如果为0则持续展示
      })
      // 3.提交表单请求登录
      try {
        const res = await login(user)
        console.log('登陆成功', res)
        // 任何新toast调用就会停掉之前的
        this.$toast.success('登陆成功')
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机号或验证码错误')
          this.$toast.fail('登陆失败')
        } else {
          console.log('登录失败，请稍后重试', err)
        }
      }
      // 4.根据请求响应结果处理后续
    },
    async onSendSms () {
      // 1.校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2.验证通过，显示倒计时
      this.isCountDownShow = true
      // 3.请求发送验证码
      try {
        await sendSms(this.user.mobile)
        console.log('发送成功')
      } catch (err) {
        console.log('发送失败', err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .login-container{
        .send-sms-btn{
            width: 100px;
            height: 30px;
            line-height: 30px;
            background-color: #ededed;
            font-size: 11px;
            color:#666
        }
    }
    .login-btn-wrap{
        padding: 16px;
    }
    .login-btn{
        background-color: #6db4fb;
        border: none;
    }
</style>
