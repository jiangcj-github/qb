import ExchangeControllerBase from '../ExchangeControllerBase'
import DealStore from './DealStore'

export default class DealController extends ExchangeControllerBase {
  constructor() {
    super();
    this.store = new DealStore();
  }

  setView(view) {
    super.setView(view)
  }

  setPairMsg(value) {
    this.view.setState({
      tradePairMsg: value
    });
  }
  setPriceFlag(){
    this.view.setState(
        {
          inputBuyFlag: false,
          inputSellFlag: false
        }
    )
  }
  tradePairHandle(pair, prices) {
    let pairArr = pair.split('/'),
      coin = pairArr[0],
      market = pairArr[1];
    this.view.setState(
      {
        // PriceUnit: market,
        NumUnit: coin,
        Market: market,
        Coin: coin,
        // prices,
        priceBank: prices,
        // inputBuyFlag: false,
        // inputSellFlag: false,
      }
    );
    this.store.state.prices = prices;
    this.setPriceInit(prices);
    // this.TradeMarketController.setUnitsType(market, coin);
    this.userOrderController.setInitUnit(market, coin);
    this.TradeRecentController.setInitUnit(market, coin);
    this.TradeOrderListController.setInitUnit(market, coin);
    this.store.state.PriceUnit = market;
    this.store.state.NumUnit = coin;
    // this.view.state.Market = market;
    this.coinMinTradeHandle(coin);//最小交易量的处理
  }

  orderHandle(prices) {
    this.view.setState({
      prices,
      inputBuyFlag: false,
      inputSellFlag: false,
      priceBank: {
        CNY: prices.priceCN,
        USD: prices.priceEN
      }
    });
    this.store.state.prices = prices;
    // console.log('live789465123',this.view.state.UnitSelected,prices)
    // if(this.view.state.PriceUnit === 'CNY'){
    //   this.setPriceInit(prices.priceCN);
    //   return
    // }
    // if(this.view.state.PriceUnit === 'USD'){
    //   this.setPriceInit(prices.priceEN);
    //   return
    // }
    this.setPriceInit(prices);
  }

  // 数字币计价 初始值获取
  setPriceInit(v) {
    // let priceInit;
    // if(this.view.state.PriceUnit === 'CNY'){
    //   priceInit = v.price
    // }
    // this.view.setState({
    //   priceInit:v.price,
    //   buyMax:this.view.state.buyWallet / v,
    //   sellMax:this.view.state.sellWallet
    // })
    this.view.state.priceInit = v.price;
    this.view.state.buyMax = this.view.state.buyWallet / v.price;
    this.view.state.sellMax = this.view.state.sellWallet;
  }

  changeUnit(unit, init) {
    let unitObj = {
      'CNY': 'CNY',
      'USD': 'USD',
    };
    unitObj[init] = this.view.state.Market;
    let fromValue = this.store.state.prices[this.store.state.PriceUnit === 'CNY' && 'priceCN' || (this.store.state.PriceUnit === 'USD' && 'priceEN' || 'price')];
    let unitSelected = unitObj[unit];
    this.view.setState({
      PriceUnit: unitSelected,
      UnitSelected: unit
    });
    this.changePrice(unitSelected, fromValue);
    this.TradeOrderListController.setChangeFlagClose();
    this.store.state.PriceUnit = unitSelected;
    this.TradeMarketController.setUnitsType(unitSelected);
    this.userOrderController.setUnitsType(unitSelected);
    this.TradeRecentController.setUnitsType(unitSelected);
    this.TradeOrderListController.setUnitsType(unitSelected);
  }

  changePrice(v, fromValue) {
    let prices = this.store.state.prices,
        initPrice = prices.price,
        // initPrice = this.view.state.priceInit,
      priceBank = {
        // CNY: initPrice / prices.price * prices.priceCN,
        CNY: prices.priceCN,
        // USD: initPrice / prices.price * prices.priceEN,
        USD: prices.priceEN,
      }
    ;
    this.view.setState({
      priceBank,
      initPrice: prices.price
      // inputValue: priceBank[v] || initPrice
    });
    if (this.view.state.inputSellFlag || this.view.state.inputBuyFlag) {
      let toValue = this.store.state.prices[v === 'CNY' && 'priceCN' || (v === 'USD' && 'priceEN' || 'price')],
        inputSellValue, inputBuyValue;
      this.view.state.inputSellFlag && (inputSellValue = this.view.state.inputSellValue / fromValue * toValue);
      this.view.state.inputBuyFlag && (inputBuyValue = this.view.state.inputBuyValue / fromValue * toValue);
      this.view.statehandleValue = this.view.state.inputValue / fromValue * toValue
      this.view.setState({
        inputSellValue,
        inputBuyValue
      });
    }
  }

  changeMaxNum(t, v) {
    (t === 1) && (this.view.setState({sellMax: this.view.state.sellWallet}));
    (t === 0) && (this.view.setState({buyMax: this.view.state.buyWallet / v}))
    if (this.view.state.buyNumFlag && (t === 0)) {
      let limit = v.split('.')[1] && v.split('.')[1].length || 0;
      this.view.setState({inputBuyNum: Number(this.view.state.buyWallet.div(v)).toFixedWithoutUp(8 - limit)})
    }
    // if(this.view.state.sellNumFlag && (t === 1)){
    //   this.view.setState({inputSellNum: this.view.state.sellWallet / v})
    // }
  }

  async dealTrade(orderType,e) {
    e.preventDefault();
    e.stopPropagation();
    if(this.view.state.fundPwdInterval === -1){
      this.view.setState(
          {
            dealPopMsg: this.view.intl.get("pleaseSetFund"),
            dealPassType:'positi',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
          }
      );
      return
    }
    

    
    let sellPriceValue = this.view.state.inputSellFlag ? (this.view.state.inputSellValue) : (this.view.state.priceBank[this.view.state.PriceUnit] || this.view.state.priceInit);
    let buyPriceValue = this.view.state.inputBuyFlag ? (this.view.state.inputBuyValue) : (this.view.state.priceBank[this.view.state.PriceUnit] || this.view.state.priceInit);
    let params = {
      // token: this.userController.userToken,
      userId: this.userController.userId,
      token: this.userController.userToken,
      "orderType": orderType === 'buy' ? 0 : 1,//0买 1 卖
      "priceType": this.view.state.DealEntrustType,//0限价  1市价
      "price": Number(orderType === 'buy' ? buyPriceValue : sellPriceValue),//价格
      "count": Number(orderType === 'buy' ? this.view.state.inputBuyNum : this.view.state.inputSellNum),//数量
      "tradePairId": this.TradeMarketController.tradePair.tradePairId,
      "tradePairName": this.TradeMarketController.tradePair.tradePairName,
      "funpass": orderType === 'buy' ? this.view.state.funpassBuy : this.view.state.funpassSell,//资金密码
      "interval": this.view.state.fundPwdInterval,// 0:每次都需要密码 1:2小时内不需要 2:每次都不需要
      "priceUnit": this.view.state.PriceUnit === 'cny' && 1 || (this.view.state.PriceUnit === 'usd' && 2 || 0)//计价单位  0数字币  1人民币 2美元
      // this.view.state.PriceUnit || this.view.state.Market
    };
    if(params.priceType === 0 && params.funpass === ''){
      this.view.setState(
          {
            dealPopMsg: this.view.intl.get("deal-pass-empty"),
            dealPassType:'passive',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
          }
      )
      return
    }
    //   价格判断不能为空
    if(!params.price && params.priceType === 0){
      this.view.setState(
          {
            dealPopMsg: this.view.intl.get("noEmptyPrice"),
            dealPassType:'passive',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
            inputSellNum: 0, // 数量清空
            inputBuyNum: 0,
          }
      )
      return
    }
    // 数量不能为最小交易量
    if(Number(orderType === 'buy' ? this.view.state.inputBuyNum : this.view.state.inputSellNum) < this.store.state.coinMin){
      this.view.setState(
          {
            dealPopMsg: this.view.intl.get("noLowerMiniTradeNum"),
            dealPassType:'passive',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
          });
      return
    }
    // 判断数量精度
    let limitNum = params.count.toString().split('.');
    let numLimited =  (params.price > 100 && (/^[0-9]{0,6}$/).test(limitNum[1]))
        || (params.price >= 0.1 && params.price <= 100 && (/^[0-9]{0,4}$/).test(limitNum[1]))
        || (params.price > 0.01 && params.price < 0.1 && (/^[0-9]{0,2}$/).test(limitNum[1]))
        || (params.price <= 0.01 && (/^[0-9]{0,0}$/).test(limitNum[1]));
    if(!numLimited){
      this.view.setState(
          {
            // dealPopMsg: this.intl.get('passError'),
            dealPopMsg: this.view.intl.get('deal-num-err'),
            dealPassType:'passive',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
          }
      );
      return
    }
    let result = await this.store.dealTrade(params);
    console.log('result',result)
    if(result === null){
      this.view.setState(
          {
            dealPopMsg: this.view.intl.get("orderSuccess"),
            dealPassType:'positi',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
            inputSellNum: 0, // 数量清空
            inputBuyNum: 0,
          }
      );
    }
    if(result && (result.ret === 1416 || result.ret === 1412)){
      this.view.setState(
          {
            // dealPopMsg: this.intl.get('passError'),
            dealPopMsg: result.msg,
            dealPassType:'passive',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
          }
      );
      return
    }
    if(result && result.wrongTime < 5){
      this.view.setState(
          {
            // dealPopMsg: this.intl.get('passError'),
            dealPopMsg: this.view.intl.get("passError"),
            dealPassType:'passive',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
          }
      );
    }
    if(result && result.errCode === 'FREEZE_PASSWORD'){
      this.view.setState(
          {
            dealPopMsg: result.msg,
            dealPassType:'passive',// 弹窗类型倾向
            dealPass:true,// 下单弹窗
          }
      );
    }
    if(!this.view.state.fundPwdInterval){
      this.view.setState(
          {
            funpassBuy:'',
            funpassSell:'',
          }
      )
    }
    // }
    // await this.store.dealTrade(v);
  }

  async getFundPwdInterval() {
    let fundPwdInterval = await this.userController.getFundPwdInterval();
    this.view.setState({
      fundPwdInterval: fundPwdInterval.mode
    })
  }

  //设置可用额度
  setWallet(sellWallet, buyWallet) {
    // console.log('setWallet(buyWallet, sellWallet)', buyWallet, sellWallet, this.view)
    this.store.setWallet(buyWallet, sellWallet)
    this.view.setState({
      sellWallet,
      buyWallet
    })
  }
  // 获取最小额度
  async getCoinMinTrade(){
    let result = this.store.getCoinMinTrade();
    this.view.setState(
        {coinMinTrade: result}
    )
  }
  
  coinMinTradeHandle(coin){
    let coinMinTrade = this.store.state.coinMinTrade;
    let coinMinItem = coinMinTrade.find(v => v.coinName === coin);
    this.store.state.coinMin = coinMinItem.minTrade;
    this.view.setState({
      coinMin:coinMinItem.minTrade
    })
  }
}