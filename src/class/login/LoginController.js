import ExchangeControllerBase from '../ExchangeControllerBase'
import LoginStore from './LoginStore'
import Sleep from "../../core/libs/Sleep";

export default class LoginController extends ExchangeControllerBase {
  constructor(props) {
    super(props)
    this.store = new LoginStore()
    this.store.setController(this)
  }

  setView(view){
    super.setView(view);
    // return this.store.data
  }

  getVerify(account, mode, type) { // 获取验证码
    let reg1 = /^\w+@[0-9a-z]{2,}(\.[a-z\u4e00-\u9fa5]{2,8}){1,2}$/, reg2 = /^1[3578]\d{9}$/;
    if(!reg1.test(this.view.state.userInput) && !reg2.test(this.view.state.userInput)) return
    if (this.view.state.verifyNum !== '获取验证码' && this.view.state.verifyNum !== 0) return
    this.view.setState({verifyNum: 60})
    this.countDown('verifyCountDown', 'verifyNum', this.view)
    this.userController.getCode(account, mode, type)
  }

  clearVerify() { // 清除定时器
    this.countDownStop("verifyCountDown");
  }

  async getCaptchaVerify() { // 获取图形验证码
    let captcha = await this.userController.getCaptcha()
    this.view.setState({captcha: captcha.data, captchaId: captcha.id})
    // console.log('aaa 1', this.view.state, )
  }

  //登录
  login(account, code, type, mode, captchaId, captchaCode, deviceFlag1, deviceFlag2){
    console.log(112, account, type)
    let obj = {passCode:code, mode, captchaId, captchaCode, os:3 , device: `${deviceFlag1}/${deviceFlag2}`};
    let keyArr = ['phone','email'];
    // let reg1 = /^\w+@[0-9a-z]{2,}(\.[a-z\u4e00-\u9fa5]{2,8}){1,2}$/, reg2 = /^1[3578]\d{9}$/;
    obj[keyArr[type]] = account
    // if (type === 0 && !reg2.test(account)) { // 手机
    //   this.view.setState({showPopup: true, popType: 'tip3', popMsg: this.view.intl.get("user-checkPhone")})
    //   return
    // }
    // if (type === 1 && !reg1.test(account)) { // 邮箱
    //   this.view.setState({showPopup: true, popType: 'tip3', popMsg: this.view.intl.get("user-checkEmail")})
    //   return
    // }
    this.store.login(obj)
  }

  userLoginInfo(data) { // 登陆返回信息
    // console.log('ccc2', data, this.view.history)
    this.userController.getUserId(data.data)
    // console.log('this.view.history.goBack()', this.userController.store.state.token);
    // history.push()
    if (data.ret === 0) { // 登陆成功
      this.view && this.view.history.push('/whome')
      return
    }
    if ([2008, 2009, 2010].includes(data.ret)) { // 需要二次验证
      this.view.setState({showTwoVerify: true, verifyType: data.ret})
      return
    }
    if (data.ret !== 0) {this.getCaptchaVerify()}
    this.view.setState({showPopup: true, popType: 'tip3', popMsg: data.msg})
  }
  async clearLoginInfo() { // 退出登陆
    this.store.loginOutRemind()
    this.userController.clearUserInfo()
    // window.location.href = '/home'
  }

  // 找回密码
  async forgetLoginPass(account, mode, code, newPass, captchaId, captchaCode) { // 找回密码
    let result = await this.store.Proxy.forgetLoginPass({
      account,
      mode, // 0 phone 1 email
      code,
      newPass,
      captchaId,
      captchaCode,
      os: 3
    })
    console.log('忘记密码', result)
    this.view.setState({showPopup: true, popType: result ? 'tip3': 'tip1', popMsg: result ? result.msg : this.view.intl.get("user-modifiedSucc")})
    if (result === null) {this.view && this.view.history.push('/wlogin')}
    if (result !== null) {this.getCaptchaVerify()}
  }

  async initLoginVerification() { // 获取手势验证
    let res = await this.store.Proxy.fetch('http://192.168.113.241:5555/vaptcha/challenge/', {method: 'get'})
    console.log('获取手势验证res', res)
    //根据服务端接口获取的vid与challenge创建实例
    //验证参数对象
    let config={
      vid:res.vid, //验证单元id, string, 必填
      challenge:res.challenge, //验证流水号, string, 必填
      container:"#vaptcha_container",//验证码容器, HTMLElement或者selector, 必填
      type:"click", //必填，表示点击式验证模式
      // type:"emb ed", //必填，表示点击式验证模式
      effect:'popup', //验证图显示方式, string, 可选择float, popup, 默认float
      https:false, //协议类型, boolean, 可选true, false,不填则自适应。
      color:"#0080D0", //按钮颜色, string
      outage:"http://192.168.113.241:5555/vaptcha/downtime/", //服务器端配置的宕机模式接口地址
      success:(token,challenge) => {//验证成功回调函数, 参数token, challenge 为string, 必填
        console.log(token,challenge)
        //执行表单验证失败时，需要重新初始化VAPTCHA
      },
      fail:() => {//验证失败回调函数
        console.log('error')
      }
    }
    //Vaptcha对象
    let obj;
    window.vaptcha(config,function(vaptcha_obj){
      obj = vaptcha_obj;
      obj.init();
    });
  }
}