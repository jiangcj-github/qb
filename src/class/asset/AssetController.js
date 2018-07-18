import ExchangeControllerBase from "../ExchangeControllerBase";
import AssetStore from "./AssetStore";

export default class AssetController extends ExchangeControllerBase {
  constructor(props) {
    super(props);
    this.store = new AssetStore();
    this.store.setController(this);
    this.orderStatus = {
      0: "审核中",
      1: "通过",
      2: "未通过",
      3: "撤销"
    };
  }
  setView(view) {
    super.setView(view);
    // view.setState({count: this.store.count})
    // return this.store.state;
  }

  get configData() {
    return this.configController.initState;
  }
  get userId() {
    return this.userController.userId;
  }
  get token() {
    return this.userController.userToken;
  }
  get account() {
    let { email, phone } = this.userController.userInfo;
    return {
      1: email,
      3: phone
    };
  }
  // 获取用户的身份认证状态
  get userVerif() {
    return this.userController.userAuthVerify.state;
    // return 1;// 0：未认证 1：已通过  2：认证失败 3：认证中
  }
  get userTwoVerify() {
    return this.userController.userVerify;
    //0: 已设置资金密码 1: 未设置资金密码; 2 谷歌验证 1 邮件 3 短信
    // return { withdrawVerify: 1 };
  }

  async getUserInfo() {
    if (this.userTwoVerify.fundPwd === undefined) {
      let {
        //0: 已设置资金密码 1: 未设置资金密码; 2 谷歌验证 1 邮件 3 短信 0 无
        withdrawVerify,
        fundPwd
      } = await this.userController.initData();
      this.view.setState({ userTwoVerify: { withdrawVerify, fundPwd } });
    } else {
      this.view.setState({ userTwoVerify: this.userTwoVerify });
    }
  }
  // 获取对应市场下的交易对信息（调用market的api）
  async getTradePair() {
    let result = await this.marketController.getTradePairHandle();
    this.view.setState({
      tradePair: result
    });
  }
  // 获取总资产和额度
  async getAssets() {
    await this.store.getTotalAsset();
    this.view.setState({
      totalAsset: this.store.state.totalAsset,
      wallet: this.store.state.wallet || []
    });
    if (this.view.name === "simple") {
      this.updataMarketAvaile();
    }
  }

  // 获取单个币种资产信息
  async getCurrencyAmount(coin) {
    let result = await this.store.getCurrencyAmount(coin);
    if (result && result.errCode) {
      return;
    }
    // console.log(this.store.state.currencyAmount);
    this.view.setState({
      currencyAmount: this.store.state.currencyAmount
    });
  }

  // 获取交易对手续费
  async getPairFees() {
    if (!this.store.state.pairFees.length) {
      await this.store.getFee();
    }
    this.view.setState({ pairFees: this.store.state.pairFees });
  }
  // 获取所有币种
  async getWalletList() {
    this.store.state.walletList["BTC"] === undefined &&
      (await this.store.getWalletList());
    await this.view.setState({
      walletList: this.store.state.walletList
    });
  }
  // 获取币种资产
  // async getWallet() {
    // let data = await this.store.Proxy.topCurrency();
    // console.log(data);
    // this.store.state.wallet = data;
    // this.view.setState({ wallet: data});
  // }
  // 获取矿工费
  async getMinerFee(coin, address) {
    await this.store.getMinerFee(coin, address.address);
    this.view.setState({
      walletExtract: this.Util.deepCopy(this.store.state.walletExtract)
    });
  }
  // 获取充币地址(over)
  async getCoinAddress(coin) {
    await this.store.getChargeAddress(coin);
    this.view.setState({
      coinAddress: this.Util.deepCopy(this.store.state.coinAddress),
      address: this.store.state.coinAddress.coinAddress
    });
  }
  // 获取充提记录
  async getHistory(obj) {
    await this.store.getHistory(obj);
    this.view.setState({
      assetHistory: this.Util.deepCopy(this.store.state.assetHistory)
    });
  }

  async exportHistory() {
    let result = await this.store.exportHistory();
    let str =
      "时间,币种,类型,金额数量,发送地址,接收地址,确认数,审核状态,手续费";
    result.forEach(v => {
      str +=
        "\n" +
          v.orderTime.toDate("yyyy-MM-dd HH:mm:ss") +
          "," +
          v.coinName +
          "," +
          (v.orderType ===
        1
          ? "充币"
          : v.orderType === 15000
            ? "提币"
            : v.orderType === 5
              ? "转账"
              : " ") +
                "," +
                v.count +
                "," +
                v.postAddress +
                "," +
                v.receiveAddress +
                "," +
                (v.orderType === 1 ? `${v.doneCount}/${v.verifyCount}`: '-') +
                "," +
                this.orderStatus[v.orderStatus] +
                "," +
                v.fee
    });
    this.exportExcel(str, "资产记录.xls");
  }

  // 获取确认中充币信息(顶部轮播)
  async getChargeMessage() {
    let result = await this.store.Proxy.history({
      userId: this.userId,
      token: this.token,
      page: 0,
      pageSize: 20,
      coinId: -1,
      coinName: -1,
      orderType: 1,
      orderStatus: -1,
      startTime: parseInt((new Date() - 604800000) / 1000),
      endTime: parseInt((new Date() - 0) / 1000)
    });
    if (result && !result.errCode) {
      return result.orderList.filter(v => v.doneCount !== v.verifyCount);
    }
    return [];
  }
  // 获取提币信息(币种可用额度,冻结额度，24小时提现额度等信息)
  async getExtract() {
    await this.store.getwalletExtract();
    this.view.setState({
      walletExtract: this.Util.deepCopy(this.store.state.walletExtract)
    });
    let curExtract = this.store.state.walletExtract.extractAddr.filter(
      v => v.coinName === this.view.state.currency.toLowerCase()
    )[0];
    this.view.setState({
      address:
        (curExtract &&
          curExtract.addressList[0] &&
          curExtract.addressList[0].address) ||
        ""
    });
  }

  // 请求验证码
  async requestCode() {
    let type = this.userTwoVerify.withdrawVerify;
    let result = await this.userController.getCode(
      this.account[type],
      type === 1 ? 1 : 0,
      8
    );
    if (result && result.errCode) {
      this.view.setState({ orderTip: true, orderTipContent: result.msg });
      // 错误处理
      return false;
    }
    this.view.setState({ tip: true, tipSuccess: true, tipContent: "发送成功" });
    return true;
  }

  // 二次验证倒计时
  async getVerify() {
    if (
      this.view.state.verifyNum !== this.view.intl.get("sendCode") &&
      this.view.state.verifyNum !== 0
    )
      return;
    let flag = await this.requestCode();
    if (flag) {
      this.view.setState({ verifyNum: 60 });
      this.countDown("verifyCountDown", "verifyNum", this.view);
    }
  }

  //提交提币订单
  async extractOrder(obj) {
    let type = this.userTwoVerify.withdrawVerify;
    (type === 1 || type === 3) && (obj.account = this.account[type]);
    type === 1 && (obj.mode = 1);
    type === 3 && (obj.mode = 0);
    type === 2 && (obj.mode = 2);
    let result = await this.store.extractOrder(obj);
    // console.log('提交订单', result)
    if (result && result.errCode) {
      let o = { orderTip: true, orderTipContent: result.errCode === "CWS_ERROR" ? this.view.intl.get("asset-withdrawal-failed") : result.msg };
      if (result.errCode === "NO_VERIFIED") o.orderTipContent = this.view.intl.get("asset-auth-tip");
      this.view.setState(o);
      // 错误处理
      return;
    }
    if (result && result.quota !== undefined) {
      this.view.setState({
        tip: true,
        tipSuccess: true,
        tipContent: !result.quota ? this.view.intl.get("optionSuccess") : this.view.intl.get('asset-wait-auditing'),
        showTwoVerify: false,
        extractAmount: "", //提现数量
        password: ""
      });
      this.getCurrencyAmount(this.view.state.currency);
    }
  }

  // 撤销提币申请
  async cancelOreder(id) {
    let result = await this.store.cancelOrder(id);
    if (result && result.errCode) {
      this.setViewTip(false, result.msg);
      return false;
    }
    this.setViewTip(true, this.view.intl.get("optionSuccess"));
    this.view.setState({ assetHistory: this.Util.deepCopy(result) });
  }
  // 添加提现地址
  async appendAddress(obj, curExtract) {
    // 验证名称地址不为空
    if (obj.addressName === "" || obj.address === "") {
      this.setViewTip(false, this.view.intl.get("asset-incomplete"));
      return false;
    }
    // 验证地址是否存在
    let flag = false;
    curExtract && curExtract.addressList && curExtract.addressList.forEach(v => {
        v.address === obj.address && (flag = true);
      });
    if (flag) {
      this.setViewTip(false, this.view.intl.get(713));
      return false;
    }
    // 发送添加地址请求交由后台校验
    let result = await this.store.appendAddress(obj);
    if (result.errCode) {
      this.setViewTip(false, result.msg);
      return false;
    }
    this.view.setState({
      walletExtract: this.Util.deepCopy(result),
      tip: true,
      tipSuccess: true,
      tipContent: this.view.intl.get("asset-add-success")
    });
    return true;
  }

  //删除提现地址
  async deletAddress(obj) {
    let result = await this.store.deletAddress(obj);
    if (result.errCode) {
      this.setViewTip(false, this.view.intl.get("asset-delet-fail"));
      return false;
    }
    this.view.setState({ walletExtract: this.Util.deepCopy(result) });
    if (this.view.state.address === obj.address)
      this.view.setState({ address: "" });
  }

  // 处理出币种对应的交易对数组
  getCoinPair(o, coin) {
    if (!o) return [];
    if (coin.toUpperCase() !== "USDT") {
      return o.pairNameCoin[coin.toLowerCase()].map(v => {
        return {
          name: `${coin}/${v.toUpperCase()}`,
          id: o.pairIdCoin[coin.toLowerCase()][v]
        };
      });
    }
    if (coin.toUpperCase() === "USDT") {
      return o.pairNameMarket[coin.toLowerCase()].map(v => {
        return {
          name: `${v.toUpperCase()}/USDT`,
          id: o.pairIdMarket[coin.toLowerCase()][v]
        };
      });
    }
  }

  // 账户余额页面筛选
  filte(wallet, value, hideLittle, hideZero) {
    let arr1 = this.filter(wallet, item => {
      return (
        item.coinName.includes(value.toLowerCase()) ||
        item.fullName.includes(value.toLowerCase())
      );
    });
    let arr2 = this.filter(arr1, item => {
      return !hideLittle || item.valuationBTC > 0.001;
    });
    let result = this.filter(arr2, item => {
      return !hideZero || item.valuationBTC > 0;
    });
    return result;
  }

  // 账户余额页面排序
  rank(arr, object) {
    let sortValue, type;
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if (object[key] !== 2) {
          sortValue = [key];
          type = object[key];
          break;
        }
      }
    }
    if (!sortValue) {
      sortValue = ["valuationBTC"];
      type = 0;
    }
    return this.sort(arr, sortValue, type);
  }

  clearVerify() {
    // 清除短信验证码
    this.countDownStop("verifyCountDown");
  }

  // 提现前前端验证
  async beforeExtract(minCount, password) {
    let obj = {
      orderTip: true,
      orderTipContent: ""
    };
    // 校验地址不为空
    if (this.view.state.address === "") {
      obj.orderTipContent = this.view.intl.get("asset-input-address");
      this.view.setState(obj);
      return;
    }
    // 校验数量大于最小提现数量
    if (this.view.state.extractAmount < minCount) {
      obj.orderTipContent = this.view.intl.get("asset-input-extractAmount");
      this.view.setState(obj);
      return;
    }
    // 校验是否设置资金密码
    // if (this.userTwoVerify.fundPwd === 1) {
    //   obj.orderTipContent = this.view.intl.get("asset-password-unset");
    //   this.view.setState(obj);
    //   return;
    // }
    // 校验是否输入密码
    if (this.view.state.password === "") {
      obj.orderTipContent = this.view.intl.get("asset-inputFundPassword");
      this.view.setState(obj);
      return;
    }
    // 校验密码是否正确（5次错误后会冻结一段时间）
    let result = await this.store.verifyPass(password);
    if (result && result.msg) {
      obj.orderTipContent = result.msg;
      this.view.setState(obj);
      return;
    }
    this.view.setState({
      showTwoVerify: true,
      verifyNum: this.view.intl.get("sendCode")
    });
  }
  // 为market提供获得币种可用余额的api
  // async getCoinAvailable(coin) {
  //   if (!this.store.state.wallet.length) {
  //     await this.store.getTotalAsset();
  //   }
  //   return this.store.state.wallet.filter(v => v.coinName === coin)[0];
  // }
  // 获取我的QBT
  async getMyQbt(){
    let result = await this.store.getMyQbt();
    if (result) this.view.setState({Qbt:result}) ;
    return result;
  }
  // 更新币币交易页委托币种可用
  updataMarketAvaile() {
    let curPair =
        this.view.state.pairFees &&
        this.view.state.pairFees.filter(
          item => item.id === this.view.state.tradePairId
        )[0],
      currencyArr = curPair && curPair.name.split("/"),
      avail1 = this.store.state.wallet.filter(
        item => item.coinName === (currencyArr && currencyArr[0])
      )[0],
      avail2 = this.store.state.wallet.filter(
        item => item.coinName === (currencyArr && currencyArr[1])
      )[0];
    // console.log("updataMarketAvaile", avail1, avail2);
    avail1 && this.TradePlanController &&
      this.TradePlanController.setWallet(
        avail1.availableCount,
        avail2.availableCount
      );
    return { avail1, avail2, currencyArr, curPair };
  }

  // 设置simple的tradePairId交易对id  暴露给market使用
  setSimpleAsset(o) {
    this.view && this.view.setState(o);
  }

  // websocke更新
  userAssetUpdate(obj) {
    // console.log('执行。。。。。。。。。。')
    if (this.view.name === "simple") {
      // console.log("进入。。。。。。。。。。。。。");
      this.setSimpleAsset({
        totalAsset: this.store.state.totalAsset,
        wallet: this.store.state.wallet
      });
      this.updataMarketAvaile();
    }
  }

  setViewTip(type, str) {
    this.view.setState({
      tip: true,
      tipSuccess: type,
      tipContent: str
    });
  }

  // // view为balance时更新
  // updateBalance(){
  //   let {totalAsset, wallet} = this.store.state;
  //   this.view.setState({
  //     totalAsset: totalAsset,
  //     wallet: wallet
  //   });
  // }

  // updateCharge() {
  //   let { availableCount, frozenCount } = this.store.state.wallet.filter(
  //     v => this.view.state.currency === v.coinName.UpperCase()
  //   )[0];
  //   this.view.state.currencyAmount.availableCount = availableCount;
  //   this.view.state.currencyAmount.frozenCount = frozenCount;
  //   this.view.state.currencyAmount.totalCount = availableCount + frozenCount;
  //   this.view.setState({
  //     currencyAmount: this.view.state.currencyAmount
  //   });
  // }
}
