export default function zh(state) {
  const {
    nameCny,
    nameUsd,
    netUrl,
    applyEmailUrl,
    contactEmailUrl,
    addr
  } = state;
  // 公共、主页及不在其他模块的翻译属于common
  const common = {
    items: '条',
    inTotal: "共",
    all: "全部",
    to: '前往',
    page: '页',
    go: '跳转',
    type: "类型",
    total: "成交额",
    login: '登录',
    charge: '充值',
    pair: '交易对',
    infoView: "资讯概览",
    seeMore: "查看更多",
    readMore: "阅读详情",
    yes: "是",
    no: "否",
    none: "无",
    email: "电子邮件",
    phone: "手机号",
    alter: "修改",
    set: "设置",
    fundPass: "资金密码",
    twoStep: "两步验证",
    save: "保存",
    add: "添加",
    cance: '取消',
    delete: '删除',
    search: "搜索",
    reset: "重置",
    example: "例如",
    or: "或",
    action: "操作",
    buy: "买入",
    sell: "卖出",
    price: "价格",
    amount: "数量",
    deposit: "充币",
    cny: "人民币",
    usd: "美元",
    state: "状态",
    time: "时间",
    cancel: "撤销",
    canceled: '已撤销',
    pending: "审核中",
    passed: "通过",
    failed: "未通过",
    dealing: '处理中',
    fee: "手续费",
    option: "操作",
    setFund: "设置资金密码",
    remark: "备注",
    name: '名称',
    address: '地址',
    message: '消息',
    points: '积分',
    explanation: '说明',
    loginPwd: '登录密码',
    addTime: '添加时间',
    loginTime: '登录时间',
    equipment: '设备',
    ip: 'IP',
    place: '地点',
    upLoad: '上传',
    volume: "成交量",
    avgPrice: '平均成交价',
    dealed: '已成交',
    marketPrice: '市价',
    detail: '详情',
    noRecords: "暂无记录",
    "deal-use": "可用",
    sendCode: '获取验证码',
    sendAgain: '重新获取',
    optionSuccess: '操作成功',
    close: '关闭',
    sure: "确认",
    notice: "公告",
    information: "资讯",
    back: "返回",
    orderType: "订单类型",
    orderStatus: "订单状态",
    date: "日期",
    oneDay: "一天",
    oneWeek: "一周",
    oneMonth: "一月",
    ok: "确定",
    dealPrice: "成交价",
    daelAmount: "实际成交",
    avgDealPrice: "成交均价",
    dealTurnover: "成交总额",
  };
  const errMessage = {
    "-1": "FETCH错误",
    "-2": "RESPONES解析错误",
    "-3": "JSON解析错误",
    1: "未知错误",
    95: "参数错误",
    101: "身份认证进行中",
    102: "身份认证状态不识别",
    103: "身份认证已通过",
    601: "输入的密码错误，请重试！",
    602: "数据库错误",
    603: "请求参数错误",
    604: "无此用户",
    605: "用户服务系统访问失败",
    606: "已发送，未超时3分钟",
    607: "验证码已过期",
    608: "验证码错误",
    609: "操作类型错误",
    610: "与原密码相同",
    612: '密码错误5次已锁定, 请{number}分钟后再试',
    616: "未设置密码",
    617: "用户未实名认证",
    619: "图形验证码错误",
    620: "与资金密码相同",
    621: "与登陆密码相同",
    623: "账户已被占用",
    704: "24小时内修改过资金密码,存在安全保护墙",
    705: "可用数量不足",
    706: "小于最小提币限额",
    707: "不支持提币操作",
    708: "提币超过当日额度",
    709: "提币：查询不到from地址",
    710: "提币：查询不到to地址",
    711: "cws错误",
    712: "提币地址格式错误",
    713: '此地址已存在',
    714: '不能转账给自己',
    1001: "连接被禁止",
    1002: "连接时传入的Token不合法",
    2001: "谷歌验证失败",
    2002: "谷歌验证未开启",
    2011: "验证方式不能为空",
    2012: "邮箱未绑定",
    2013: "手机未绑定",
    2014: "Google验证未绑定",
    2200: "找不到活动",
    2201: "您已经被邀请过",
    2400: "ip已存在",
    2401: "ip未找到",
    2402: "ip不在白名单",
    2601: "奖励已经领取完毕，敬请期待下次活动",
  }
  const other = {
    "header-home": "首页",
    "header-exchange": "币币交易",
    "header-assets": "资产管理",
    "header-order": "订单管理",
    "header-user": "个人中心",
    "header-security": "安全中心",
    "header-idVerify": "身份认证",
    "header-logOut": "退出",
    "header-login": "登录",
    "header-regist": "注册",
    "footer-risk": "市场有风险 投资需谨慎",
    "footer-protocol": "服务协议",
    "footer-info": "资讯公告",
    "footer-request": "上币申请",
    "tip-success": '成功',
    "tip-warn": '警告',
    "tip-error": '错误',
    "tip-message": '信息',
    "tip-know": '知道了',
    "tip-confirm": '确 定',
    "tip-cancel": '取 消',
  };
  const asset = {
    "asset-totalAssets": "总资产约",
    "asset-balance": "账户余额",
    "asset-24hQuota": "24H提币额度",
    "asset-limitApply": "提额申请",
    "asset-usedAsset": "已用",
    "asset-hideLittle": "隐藏小额资产",
    "asset-hideZero": "隐藏0余额币种",
    "asset-charge": "充币",
    "asset-withdraw": "提币",
    "asset-trade": "交易",
    "asset-currency": "币种",
    "asset-fullname": "全称",
    "asset-avail": "可用余额",
    "asset-lock": "冻结中金额",
    "asset-tobtc": "BTC估值",
    "asset-valuation": "估值",
    "asset-tip1": "小于0.001btc",
    "asset-tip2": "交易未匹配完成,处于挂单环节的金额",
    "asset-tip3": "此项估值为可用余额估值",
    "asset-records": "资产记录",
    "asset-selectCoin": "选择币种",
    "asset-amount": "总额",
    "asset-orderLock": "下单冻结",
    "asset-depositTip":
      "注意：禁止向{currency}地址充值除{currency}之外的资产，任何充入{currency}地址的非{currency}资产将不可找回。",
    "asset-depositAddress": "充值地址",
    "asset-showQrcode": "展示二维码",
    "asset-copy": "复制到剪贴板",
    "asset-reminder": "温馨提示",
    "asset-depositReminder1":
      "使用{currency}地址充值需要{number}个网络确认才能到账",
    "asset-depositReminder2-1": "您可以在充值提现",
    "asset-depositReminder2-2": "页面跟踪进度",
    "asset-toTrade": "去交易",
    "asset-depositHistory": "充币记录",
    "asset-depositTime": "充币时间",
    "asset-depositAmount": "充币数量",
    "asset-sendAddress": "发送地址",
    "asset-receiveAddress": "接收地址",
    "asset-confirm": "确认数",
    "asset-confirming": "确认中",
    "asset-viewAll": "查看全部",
    "asset-minWithdraw":
      "注意：最小提现数量为{number}{currency};请勿直接提现至众筹或ICO地址 ，我们不会处理未来代币的发放。",
    "asset-minWithdraw-tip":'最小提现数量为{number}{currency}',
    "asset-withdrawAddress": "提现地址",
    "asset-addAddress": "添加地址",
    "asset-withdrawAmount": "提现数量",
    "asset-withdrawAvailable": "可提现余额",
    "asset-gasFee": "矿工费",
    "asset-withdrawActual": "实际到账",
    "asset-inputFundPassword": "请输入您的资金密码",
    "asset-setFundPassword": "设置资金密码",
    "asset-submit": "确认提交",
    "asset-withdrawalsHistory": "提币记录",
    "asset-withdrawalsTime": "提币时间",
    "asset-withdrawalsAmount": "数量",
    "asset-inputName": "输入名称",
    "asset-inputAddress": "输入地址",
    'asset-input-extractAmount': '提交失败，请检查提现数量大于最小提现数量',
    "asset-export": "导出资产记录",
    "asset-transfer": "转账",
    "asset-amount2": "金额数量",
    "asset-balan": "余额",
    "asset-checkState": "审核状态",
    "asset-copySuccess": "复制成功",
    "asset-option-failed": "操作失败",
    "asset-not-enough": "账户余额不足",
    "asset-input-twoVerify1": "请输入邮箱验证密码",
    "asset-input-twoVerify2": "请输入谷歌验证密码",
    "asset-input-twoVerify3": "请输入短信验证密码",
    "asset-incomplete": "请填写完整",
    "asset-add-success": '添加成功！',
    "asset-delet-fail": '删除失败！',
    "asset-input-address": '您未选择提现地址，不允许提交',
    "asset-password-unset": '你还未设置资金密码，不能提现',
    "asset-withdrawal-failed": '提币失败',
    "asset-detail": '资产详情',
    "asset-charge-h5-tip3": '请务必确认电脑及浏览器安全，防止信息被篡改或泄露。',
    "asset-auth-tip":'您的24小时提现额度不足，请进行实名认证',
  };
  const market = {
    "market-favorite": "收藏",
    "market-favorites": "收藏区",
    "market-market": "市场",
    "market-markets": "交易盘",
    "market-lastPrice": "最新成交价",
    "market-change": "涨跌幅",
    "market-change7D": "7日涨跌幅",
    "market-currencyInfo": "币种资料",
    "market-volume": "24h量"
  };
  const notice = {
    "activity-regist": "立即注册",
    "notice-contact": "联系我们",
    "notice-detail": "资讯详情",
    "notice-link": "链接",
    "notice-recommend": "推荐",
    "notice-title": "标题",
    "notice-type": "类型",
    "notice-addr": "地址",
    "notice-web": "网址",
    "notice-appleTitle": "上币申请信息及说明",
    "notice-appleState1": "为了保护投资者的利益,",
    "notice-appleState2": "会对所有上线交易品种进行审核与评估，请申请人/机构提供相关信息并发送至邮箱：",
    "notice-appleDetailTile": "所提供信息需包含但不仅限于：",
    "notice-appleContent1": "联系邮箱及联系人姓名",
    "notice-appleContent2": "币种信息，名称、缩写及logo等",
    "notice-appleContent3": "币种发行日期及发行量，已上交易平台（若有）",
    "notice-appleContent4": "项目信息、核心价值及官方网站",
    "notice-appleContent5": "团队主要成员及其背景，团队成员Linkdelin链接（若有）",
    "notice-appleContent6": "ICO信息，发行时间、数量、兑换比例等信息",
    "notice-appleContent7": "用户及社区信息，现有注册、活跃用户数量及社区链接",
    "notice-appleContent8": "白皮书或其他补充说明材料",

  };
  const order = {
    "order-current": "当前订单",
    "order-history": "历史订单",
    "order-deal": "历史成交",
    'order-unDeal':'尚未成交',
    'unDeal': '未成交',
    'partDeal': '部分成交',
    'totalDeal': '全部成交',
    'reseted': '已撤销',
    'reseting': '撤单中',
    'overed': '已结束',
    'hideReset': '隐藏已撤销',
    "exportOrderRecord": "导出历史订单记录",
    "exportDealRecord": "导出历史成交记录",
    "orderDetail": '订单详情',
    "order-deal-total": '成交总量',
    "order-deal-money": '成交金额',
    "order-buy": '买方',
    "order-sell": '卖方',
    "order-deal-time": "成交时间",
    "order-deal-price": "成交单价",
    "order-deal-number": "成交数量",
    "order-mine": '我的',
    "order-market": '市场',
    "order-recent": '近期交易',
    "order-reset-buy": '撤销买入',
    "order-reset-sell": '撤销卖出',
    "order-reset-all": '全部撤销',
    "order-export": '导出订单记录',
    "cancel-successful": '撤销成功'
  };
  const deal = {
    "deal-limit": "限价委托",
    "deal-market": "市价委托",
    "deal-digital": "数字币计价",
    "deal-timeSetting": "时限设置",
    "deal-every": "每次输入",
    "deal-2h": "每两小时输入",
    "deal-never": "不输入",
    "deal-inputpwdplease": "开启免输资金密码, 需要输入资金密码进行身份认证才能继续,请输入",
    "deal-marketbuy": "以市场最优价格买入",
    "deal-trunover": "交易额",
    "deal-forgetpwd": "忘记资金密码",
    "deal-freepwd": "免输资金密码",
    "deal-inputpwd": "输入资金密码",
    'deal-setpwd': '设置资金密码',
    "deal-market-buy":'以市场最优价格买入',
    "deal-market-sell":'以市场最优价格卖出',
    'deal-market-msg': '市价交易,无固定金额',
    'deal-identify': '身份验证'

  };
  const user = {
    "user-score": "我的积分",
    "user-base": "基本资料",
    "user-id": "用户 ID",
    "user-level": "用户等级",
    "user-changePwd": "修改密码",
    "user-setFund": "设置了资金密码后，提币和提现时均需要输入，账户更安全。",
    "user-twoVerify": "当您开启两步验证后，在进行登录、修改密码、提币、提现、交易等重要操作时，必须输入某个一次性密码才能继续",
    "user-loginVerify": "登录验证",
    "user-cashVerify": "提现验证",
    "user-fundVerify": "修改资金密码验证",
    "user-googleVerify": "谷歌验证",
    "user-bindEmail": "绑定/验证邮箱后开启",
    "user-bindPhone": "绑定手机号后开启",
    "user-email": "邮件",
    "user-msg": "短信",
    "user-otherAll": "其他安全设置+",
    "user-otherSet": "其它设置",
    "user-time": "时区",
    "user-noticeSet": "通知设置",
    "user-noticeRemind": "登录/充值/提现到账",
    "user-noticeEmail": "邮件通知",
    "user-noticePhone": "短信通知",
    "user-noticeBindPhone": "绑定手机号后开启短信通知",
    "user-ipWhite": "IP 白名单",
    "user-ipRemind": "注：请勿添加IP会变动的网络至IP白名单（如：拨号上网）以免影响您的正常使用。",
    "user-ipAddr": "IP 地址",
    "user-ipExample": "例如：216.58.197.238 或 104.244.42.0/24",
    "user-ipAddRemind": "添加 IP 地址或范围后，你将无法从这个白名单之外的 IP 地址登录你的账户。出于安全方面的考虑，添加或删除 IP 地址后，你的账户将在24 小时内无法提现。你可以访问",
    "user-ipAddRemind2": "获得当前 IP 地址",
    "user-current": "登录设备",
    "user-currentTitle": "当前已登录你账户的浏览器或设备。",
    "user-isCurrent": "是否当前",
    "user-out": "退出所有其他状态",
    "user-records": "最近10条记录",
    "user-recordType": "日志类型",
    "user-authNo": "未进行证件认证",
    "user-authSucc": "已通过证件认证",
    "user-authErr": "证件认证失败",
    "user-authProcess": "证件认证中",
    "user-authSuccRes": "认证结果:已通过",
    "user-authErrRes": "身份认证失败，请重新认证",
    "user-authProRes": "认证结果:认证中",
    "user-name": "实名认证",
    "user-nameRemind": "*实名信息必须真实可靠，并与充值提现银行账户登记信息保持一致。实名信息一旦确认，不可修改",
    "user-surname": "姓氏",
    "user-forename": "名字",
    "user-inputSurname": "输入姓氏",
    "user-inputForename": "输入名字",
    "user-idCard": "身份证",
    "user-passport": "护照",
    "user-inputCard": "请填写身份证号码/护照号",
    "user-photoVerify": "照片认证",
    "user-idReq": "证件要求",
    "user-req1": "身份证照片：请按示例上传身份证正面与反面，脸部及字体必须清晰可见",
    "user-req2": "护照：请按示例上传带ID的护照页正面即可，脸部及字体必须清晰可见",
    "user-req3": "手持证件照：照片中请勿遮挡任何有效信息，照片中必须体现",
    "user-req4": "日期及仅QB认证使用",
    "user-req5": "的纸条",
    "user-req6": "图片格式：小于10M, 图片格式可为jpg、jpeg、png",
    "user-photo": "证件照",
    "user-type": "证件类型",
    "user-photoSure": "我承认提交的证件信息属于本人所有，不存在冒用、盗用他人证件的行为，因冒用、盗用他人证件造成的一切后果由本人承担",
    "user-submit": "确认提交",
    "user-idFront": "身份证正面照片",
    "user-idBack": "身份证反面照片",
    "user-idHand": "手持身份证照片",
    "user-passFront": "护照正面照片",
    "user-passHand": "手持护照照片",
    "user-addr": "住址证明",
    "user-scoreInfo": "积分信息",
    "user-scoreLevel": "目前等级",
    "user-scoreDetail": "等级说明",
    "user-scoreHistory": "积分详情",
    "user-scoreGet": "如何获得积分",
    "user-scoreHave": "获得积分",
    "user-action": "事件",
    "user-popBindEmail": "绑定邮箱",
    "user-popSetLoginPwd": "设置登录密码",
    "user-popRecoverLoginPwd": "修改登录密码",
    "user-popSetFundPwd": "设置资金密码",
    "user-popRecoverFundPwd": "修改资金密码",
    "user-none": "暂无",
    "user-fillId": "请填写身份证号码",
    "user-fillPassport": "请填写护照号码",
    "user-popEmail": "邮箱",
    "user-newPwd": "新密码",
    "user-currentPwd": "当前密码",
    "user-popBind": "绑定",
    "user-popPwdRule": "*新密码必须是 6 位以上英文字母、数字或符号，不能纯数字或纯字母",
    "user-popFundRule": "*出于安全方面的考虑，修改密码后，你的账户将在 24 小时内无法提现",
    "user-popGoole": "谷歌验证码",
    "user-popPicture": "图形验证码",
    "user-popPicturePlaceholder": "请填写图形验证码",
    "user-googleStart": "开启谷歌验证",
    "user-googleInstall": "安装双重验证程序",
    "user-googleExplain1": "在“Google Authenticator (身份验证器)”应用程序中，点击“添加新账户”扫描下方二维码",
    "user-googleExplain2": "如果您无法扫描成功上图的条形码，您可以手动添加账户，输入如下密钥: ",
    "user-googleWarnings": "警告",
    "user-googleRemind1": "请您务必将密钥记录下来：",
    "user-googleRemind2": "如果误删或是更换手机，手动输入密钥是您唯一恢复的方式。",
    "user-googleInput": "请输入显示的验证码，开启验证功能",
    "user-inputEmail": "请输入邮箱账号",
    "user-inputPhone": "请输入手机号",
    "user-inputNewPwd": "请输入新密码",
    "user-inputNowPwd": "请输入当前密码",
    "user-inputAgainPwd": "再次输入密码",
    "user-inputVerifyPhone": "请输入手机号验证码",
    "user-inputVerifyEmail": "请输入邮箱验证码",
    "user-inputVerifyGoogle": "请输入谷歌验证码",
    "user-inputVerify": "请输入验证码",
    "user-verifyEmail": "邮箱验证码",
    "user-verifyPhone": "手机号验证码",
    "user-verifyEmailTitle": "邮箱验证",
    "user-verifyPhoneTitle": "短信验证",
    "user-checkAgainPwd": "请保证两次输入的新密码一致",
    // "user-checkNewPwd": "登录密码长度必须在6-18位之间",
    "user-checkNewPwd": "必须是 6-18 位英文字母、数字或符号组合",
    "user-checkEmail": "邮箱格式不正确",
    "user-checkPhone": "手机号有误",
    "user-photoSucc": "上传成功",
    "user-bindSucc": "绑定成功",
    "user-setSucc": "设置成功",
    "user-modifiedSucc": "修改成功",
    "user-addSucc": "添加成功",
    "user-delSucc": "删除成功",
    "user-outSucc": "退出成功",
    "user-bigPicture": "文件太大，请不要超过10M",
    "user-uploadPicture": "请上传图片",
    "user-nonePicture": "信息不完整",
    "user-idErr": "身份证填写有误",
    "user-passportErr": "护照填写有误"
  };
  const login = {
    "login-verify": "验证登录",
    "login-pass": "密码登录",
    "login-code": "验证码",
    "login-sendCode": "发送验证码",
    "login-userInput": "手机号/邮箱",
    "login-passInput": "密码",
    "login-forget": "忘记密码",
    "login-read": "我已阅读并同意",
    "login-readUser": "用户协议",
    "login-placeholderPhoneAndEmail": "请输入邮箱／手机验证码",
    "login-passRule": "必须是 6-18 位英文字母、数字或符号，不能纯数字或纯字母",
    "login-passAgain": "再输一遍",
    "login-passAgainPlaceholder": "请再输入一遍密码",
    "login-findPass": "找回密码",
    "login-inputVerifyPhoneAndEmail": "请填写正确的手机号/邮箱"
  };
  const help = {
    "help-fees": "费率标准",
    "help-level": "用户等级",
    "help-require-points": "需要积分",
    "help-trade-fee": "交易手续费",
    "help-quick-withdrawal": "BTC 快速提现",
    'help-see-below': "见下",
    "help-fee-services": "付费服务",
    "help-vip-forver": "· VIP 等级永久有效",
    "help-points-accumulation": "· 用户积分累积达到相应的积分可以自动成为相应的 VIP",
    "help-adjust": `· ${nameUsd}可能会根据运营需要对 VIP 政策做出调整`,
    "help-usd-withdrawal": "· 美元提现银行另外收取约每笔 $20 手续费",
    "help-tradefee-intro1": "所有的交易活动都是在两方之间发生的：Maker 是先挂单的一方，Taker 是下单去匹配已有订单的一方。Maker 创造了市场流动性，Taker 通过匹配 Maker 的订单获取了市场流动性。",
    "help-tradefee-intro2": "Maker-Taker 模型可以给 Maker 以一定的费率折扣的方式来鼓励增加市场流动性。该模型由于鼓励 Maker 更积极地挂单，它还会直接导致市场买卖双方差价的缩小。Taker 负担了更高的成本以鼓励 Maker 减小买卖差价的行为。",
    "help-trade-type": "交易品种",
    "help-earn-points": '如何增长积分',
    "help-per-day": '每天累加（每天仅限一次）',
    "help-improv": '网站改进意见采纳',
    "help-idea-accepted": '每采纳 1 条送 100 积分哦',
    "help-usd-equivalent": '折合美元',
    "help-rounded-up": '取整数（四舍五入）',
    "help-verification": "注册并实名认证",
    "help-real-name": '注册加实名即送 500 积分',
    "help-email-auth": '邮箱认证',
    "help-email-verify": '邮箱认证送 100 积分',
    "help-google-auth": '添加谷歌验证',
    "help-google-verify": '绑定谷歌验证送 1000 积分',
    "help-phone-bind": '绑定手机',
    "help-phone-award": '绑定手机送 1000 积分',
    "help-chargebtc-first": '首次充值 BTC',
    "help-chargebtc-award": '首次充值 BTC 送 2000 积分',
    // 用户协议
    "help-terms": '用户协议',
    "help-termsFirst": `${nameUsd}所提供的各项服务的所有权和运作权均归${nameUsd} LTD.所有。${nameUsd}用户使用协议（以下简称“本协议”）由${nameUsd}用户与${nameUsd}就${nameUsd}的各项服务所订立的相关权利义务规范。用户通过访问和/或使用本网站，即表示接受并同意本协议的所有条件和条款。${nameUsd}作为 ${nameUsd}（${netUrl}）的运营者依据本协议为用户提供服务。不愿接受本协议条款的，不得访问或使用本网站。`,
    "help-termsSecond": `${nameUsd}有权对本协议条款进行修改，修改后的协议一旦公布即有效代替原来的协议。用户可随时查阅最新协议。`,
    "help-terms-1": `一、服务内容`,
    "help-terms-1-1": `1. ${nameUsd}运用自己的系统，通过互联网络等方式为用户提供比特币交易和应用服务。`,
    "help-terms-1-2": `2. 用户需提供合法、真实、准确、详尽的个人资料； 如有变动，需及时更新用户资料。如果用户提供的注册资料不合法、不真实、不准确、不详尽的，用户需承担因此引起的相应责任及后果，并且${nameUsd}保留终止用户使用${nameUsd}各项服务的权利。`,
    "help-terms-2": `二、服务的提供、修改及终止`,
    "help-terms-2-1": `1. 用户在接受${nameUsd}各项服务的同时，同意接受${nameUsd}提供的各类信息服务。用户在此授权${nameUsd}可以向其电子邮件、手机、通信地址等发送商业信息。`,
    "help-terms-2-2": `2. ${nameUsd}保留随时修改或中断服务而不需通知用户的权利。${nameUsd}有权行使修改或中断服务的权利。`,
    "help-terms-2-3": `3. ${nameUsd}有权收回赠送给客户的积分，特权收益率等奖励或改变奖励的内容和方式。`,
    "help-terms-2-4": `4. 基金类产品用户每日在格林威治0点整不赎回，视为自动延期到下一日。`,
    "help-terms-2-5": `5. ${nameUsd}基金提供方和用户均有权随时终止基金服务并赎回。`,
    "help-terms-2-6": `6. 用户对本协议的修改有异议，或对${nameUsd}的服务不满，可以行使如下权利：`,
    "help-terms-2-6-1": `(1) 停止使用${nameUsd}的网络服务。`,
    "help-terms-2-6-2": `(2) 通过客服等渠道告知${nameUsd}停止对其服务。 结束服务后，用户使用${nameUsd}网络服务的权利立即终止。在此情况下，${nameUsd}没有义务传送任何未处理的信息或未完成的服务给用户或任何无直接关系的第三方。`,

    "help-terms-3": `三、用户信息的保密`,
    "help-terms-3-1": `1. 本协议所称之${nameUsd}用户信息是指符合法律、法规及相关规定，并符合下述范围的信息：`,
    "help-terms-3-1-1": `(1) 用户注册${nameUsd}会员或申请${nameUsd}的服务时，向${nameUsd}提供的个人信息。`,
    "help-terms-3-1-2": `(2) 用户在使用${nameUsd}服务、参加网站活动或访问网站网页时，${nameUsd}自动接收并记录的用户浏览器端或手机客户端数据，包括但不限于IP地址、网站Cookie中的资料及用户要求取用的网页记录。`,
    "help-terms-3-1-3": `(3) ${nameUsd}从商业伙伴处合法获取的用户个人信息。`,
    "help-terms-3-1-4": `(4) 其它${nameUsd}通过合法途径获取的用户个人信息。`,
    "help-terms-3-2": `2. ${nameUsd}承诺：非经法定原因或用户事先许可，${nameUsd}不会向任何第三方透露用户的密码、姓名、手机号码等非公开信息。`,
    "help-terms-3-3": `3. 在下述法定情况下，用户的个人信息将会被部分或全部披露：`,
    "help-terms-3-3-1": `(1) 经用户同意向用户本人或其他第三方披露。`,
    "help-terms-3-3-2": `(2) 根据用户所在国家的法律、法规等相关规定，或行政机构要求，向行政、司法机构或其他法律规定的第三方披露。`,
    "help-terms-3-3-3": `(3) 其它${nameUsd}根据用户所在国家法律、法规等相关规定进行的披露。`,

    "help-terms-4": `四、用户权利`,
    "help-terms-4-1": `1. 用户的用户名、密码和安全性：`,
    "help-terms-4-1-1": `(1) 用户一旦注册成功，成为${nameUsd}的会员，将得到用户名（用户邮箱）和密码，并对以此组用户名和密码登入系统后所发生的所有活动和事件负责，自行承担一切使用该用户名的言语、行为等而直接或者间接导致的法律责任。`,
    "help-terms-4-1-2": `(2) 用户有义务妥善保管${nameUsd}账号、用户名和密码、短信验证码、谷哥验证码，用户将对用户名和密码、和谷哥密钥安全负全部责任。因用户原因导致用户名或密码、谷哥密钥泄露而造成的任何法律后果由用户本人负责，由于用户自身原因泄露这些信息导致的财产损失，本站不负相关责任。由于本站是交易网站，登录密码、提现密码、交易密码、短信密码、谷哥密码等不得使用相同密码，否则会有安全隐患，相关责任由用户自身承担。`,
    "help-terms-4-1-3": `(3) 用户密码遗失的，可以通过注册电子邮箱发送的链接重置密码，以手机号码注册的用户可以凭借手机号码找回原密码。用户若发现任何非法使用用户名或存在其他安全漏洞的情况，应立即告知${nameUsd}。`,
    "help-terms-4-1-4": `(4) ${nameUsd}不会向任何用户索取密码，不会让用户往任何非本站交易中心里提供的帐户、btc充值地址付款，往非${nameUsd}提供的账户、地址里打款或币造成的损失本站不负责任。`,
    "help-terms-4-2": `2. 用户有权根据网站相关规定，在发布信息等贡献后，取得${nameUsd}给予的奖励。`,
    "help-terms-4-3": `3. 用户有权参加${nameUsd}社区，并发表符合国家法律规定，并符合${nameUsd}社区规则的文章及观点。`,
    "help-terms-4-4": `4. 用户有权根据网站相关规定，获得${nameUsd}给与的奖励（积分，特权收益等）。`,
    "help-terms-4-5": `5. 用户有权参加${nameUsd}组织提供的各项线上、线下活动。`,
    "help-terms-4-6": `6. 用户有权根据${nameUsd}网站规定，享受${nameUsd}提供的其它各类服务。`,

    "help-terms-5": `五、用户义务`,
    "help-terms-5-1": `1. 不得利用本站进行违反用户所在国家法律的行为。`,
    "help-terms-5-2": `2. 用户不得通过任何手段恶意注册${nameUsd}网站帐号，包括但不限于以牟利、炒作、套现、获奖等为目的多个账号注册。用户亦不得盗用其他用户帐号。如用户违反上述规定，则${nameUsd}有权直接采取一切必要的措施，包括但不限于删除用户发布的内容、取消用户在网站获得的积分、奖励以及虚拟财富，暂停或查封用户帐号，取消因违规所获利益等。`,
    "help-terms-5-3": `3. 禁止用户将${nameUsd}以任何形式作为从事各种非法活动的场所、平台或媒介。如用户违反上述规定，则${nameUsd}有权直接采取一切必要的措施，包括但不限于删除用户发布的内容、取消用户在网站获得的积分、奖励以及虚拟财富，暂停或查封用户帐号，取消因违规所获利益等。`,

    "help-terms-6": `六、拒绝担保与免责`,
    "help-terms-6-1": `1. ${nameUsd}作为“网络服务提供者”的第三方平台，不担保网站平台上的信息及服务能充分满足用户的需求。`,
    "help-terms-6-2": `2. 基于互联网的特殊性，${nameUsd}也不担保服务不会受中断，对服务的及时性、安全性都不作担保，不承担非因${nameUsd}导致的责任。`,
    "help-terms-6-3": `3. ${nameUsd}不对用户所发布信息的保存、修改、删除或储存失败负责。`,
    "help-terms-6-4": `4. ${nameUsd}内所有用户所发表的用户评论，仅代表用户个人观点，并不表示本网站赞同其观点或证实其描述，本网站不承担用户评论引发的任何法律责任。`,
    "help-terms-6-5": `5. ${nameUsd}有权删除${nameUsd}内各类不符合法律或协议规定的信息，而保留不通知用户的权利。`,
    "help-terms-6-6": `6. 所有发给用户的通告，${nameUsd}都将通过正式的页面公告、站内信、电子邮件、客服电话、手机短信或常规的信件送达。任何非经${nameUsd}正规渠道获得的中奖、优惠等活动或信息，${nameUsd}不承担法律责任。`,
    "help-terms-6-7": `7. ${nameUsd}有权根据市场情况调整充值、提现、交易等手续费费率，有权决定免费推广期的终止。`,

    "help-terms-7": `七、适用法律和裁判地点`,
    "help-terms-7-1": `1. 因用户使用${nameUsd}站而引起或与之相关的一切争议、权利主张或其它事项，均受公司注册地（英国）法律管辖。`,
    "help-terms-7-2": `2. 用户和${nameUsd}发生争议的，应首先本着诚信原则通过协商加以解决。如果协商不成，则应向${nameUsd}注册地（英国）法院提起诉讼。`,

    "help-terms-8": `八、可分性`,
    "help-terms-8-1": `如果本协议的任何条款被视为不合法、无效或因任何原因而无法执行，则此等规定应视为可分割，不影响任何其它条款的法律效力。`,

    "help-terms-9": `九、冲突选择`,
    "help-terms-9-1": `本协议是${nameUsd}与用户注册成为${nameUsd}用户，使用${nameUsd}服务之间的重要法律文件，${nameUsd}或者用户的任何其他书面或者口头意思表示与本协议不一致的，均应当以本协议为准。`,

    "help-api-title": 'API 文档',
    "help-api-overview": '概述',
    "help-api-overview-1": '1. 公共 API 包括 <span>ticker</span>, <span>trades</span>, <span>depth</span>',
    "help-api-overview-2": '2. 用户 API 每次请求还需要一个额外的 POST 参数：nonce（必须是自增的正整数）',
    "help-api-overview-3": `3. API 起始地址为：https://${netUrl}/api/v1`,
    "help-api-overview-4": '4. 公共 API 使用 HTTP GET 请求；用户 API 使用 POST 请求',
    "help-api-overview-5": '5. 服务器响应为 JSON 格式，数据结构为：',
    "help-api-overview-error": '请求正常时，status 为 200, result 为返回内容；请求有误时，status 为非 200，message 为具体出错信息',

    "help-api-list": "API 列表",
    "help-api-list-auth": "需要身份验证",
    "help-api-list-func": "	功能",
    "help-api-list-1": "获取最新行情",
    "help-api-list-2": "获取最新成交列表",
    "help-api-list-3": "获取最新深度",
    "help-api-list-1-2": "2. 支持参数：",
    "help-api-list-1-2-1": "市场，可选:",
    "help-api-list-1-3": "3. 返回示例：",

    "helo-coin-search": '搜索币种（按首字母排列）',
    "helo-coin-deposit": '去充值',
    "helo-coin-market": "市值",
    "helo-coin-total": "发行总量",
    "helo-coin-liquidity": "流通量",
    "helo-coin-price": "发行价格",
    "helo-coin-date": "发行日期",
    "helo-coin-trade": "去交易",
    "helo-coin-introduction": "介绍：",
    "helo-coin-website": "官网",
    "helo-coin-browser": "区块浏览器",
    "helo-coin-white": "白皮书",
  };
  return Object.assign(
    {},
    common,
    errMessage,
    other,
    asset,
    market,
    notice,
    order,
    deal,
    user,
    login,
    help,
  );
}
