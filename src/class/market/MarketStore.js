import ExchangeStoreBase from "../ExchangeStoreBase";

export default class MarketStore extends ExchangeStoreBase {
  constructor(name) {
    super('market', 'general');
    console.log('MarketStore constructor')
    this.state = {
      allPairData: [],
      recommendData: [
        {
          coinName: 'BTC',
          priceCN: 1022.22,
          priceEN: 1021.22,
          rise: 0.3,

        },
        {
          coinName: 'USD',
          priceCN: 1022.22,
          priceEN: 1021.22,
          rise: -0.12,

        },
        {
          coinName: 'EYH',
          priceCN: 1022.22,
          priceEN: 1021.22,
          rise: -0.12,

        },
        {
          coinName: 'ETH',
          priceCN: 1022.22,
          priceEN: 1021.22,
          rise: -0.12,

        },
        {
          coinName: 'USDT',
          priceCN: 1022.22,
          priceEN: 1021.22,
          rise: -0.12,
        }
      ],
      collectArr: [],
      selecedMarket: '',
      recommendDataHandle: [],
      marketDataHandle: [],
      homeMarketPairData: [],
      market: '',
      coin: '',
      tradePair: '',
      pairInfo: {},
      unitsType: '',
      pairMsg: {},
      coinInfo: {
        fullName: "BitCoin",
        coinName: "BTC",
        createdTime: 947586000,
        totalCount: 21000000,
        marketCount: 11000000,
        crowdfunding: 1.1,
        website: "www.baidu.com",
        blockSite: "www.baidu.com",
        introduction: "wwwwwww",
        enName: "string",
        logo: "url",
        webSite: "url",
        whitePaper: "url",
        blockSites: "url",
        description: "string",
        releaseTime: "string",
        price: {
          cny: 42744.613840365026,
          usd: 6603.502018124614,
          btc: 1.0088212447399139,
          eth: 12.734116540105735
        },
        totalVolume: 21000000,
        circulationVolume: 21000000,
        totalValue: {
          cny: 897636890647.6655,
          usd: 138673542380.61688,
          btc: 21185246.13953819,
          eth: 267416447.34222043
        },
        icoPrice: {
          cny: 0,
          usd: 0,
          btc: 0,
          eth: 0
        }
      },
      "list": [
        {
          "tradePairId": 0,
          "tradePairName": "usd/btc"
        },
        {
          "tradePairId": 1,
          "tradePairName": "btc/lsk"
        },
        {
          "tradePairId": 2,
          "tradePairName": "btc/bch"
        },
        {
          "tradePairId": 3,
          "tradePairName": "btc/eth"
        },
        {
          "tradePairId": 4,
          "tradePairName": "usd/xas"
        }]

    };
    if (name === 'market') {
      // 监听收藏
      this.WebSocket.general.on('collectArr', data => {
        console.log('getWebSocketData', data, this.controller, name)
        this.controller.updateMarketAll(data, 0)
      })
      // 监听市场数据更新
      this.WebSocket.general.on('marketPair', data => {
        console.log('getWebSocketData', data, this.controller)
        this.controller.updateMarketAll(data, 1)
      })
    }

    if (name === 'recommend') {
      // 监听推荐币种
      this.WebSocket.general.on('recommendCurrency', data => {
        console.log('getWebSocketData', data, this.controller)
        this.controller.updateRecommend(data.data)
        this.recommendData = data.data
      })
    }

  }

  //设置选择的交易对
  setSelecedMarket(data) {
    this.state.market = data
  }

  //得到选择的交易对
  get selecedMarket() {
    return this.state.market
  }

  setAllPair(data) {
    // console.log('setAllPair 0', data)
    this.state.allPairData = data
    // console.log('setAllPair 1', this.state.allPairData)
  }

  get allPair() {
    return this.state.allPairData
  }

  //收藏变动更新列表
  updateAllPairListFromCollect(list) {
    // console.log('updateAllPairListFromCollect 0', this, this.allPair, list)
    list && list.length && list.forEach(v => this.allPair.find(vv => vv.tradePairId === v).isFavorite = 1)
    // console.log('updateAllPairListFromCollect 1', this.allPair)
  }

  //数据变动更新列表
  updateAllPairListFromData(list) {
    // console.log('updateAllPairListFromData 0', this.state.allPairData, list)
    list && list.length && (this.state.allPairData = this.state.allPairData.map(v => Object.assign(v, list.find(vv => vv.tradePairId === v.tradePairId) || {})))
    // console.log('updateAllPairListFromData 1', this.state.allPairData)
  }

  //根据选择的市场筛选出交易对
  async selectMarketData() {
    //根据选择市场从pair里拿到id，再从allPairData中取出数据
    let pairMsg = await this.getPairMsg()
    // console.log(pairMsg, this.selecedMarket)
    let coinNameList = pairMsg.pairNameMarket[this.selecedMarket]
    this.state.homeMarketPairData = coinNameList.map(v => this.state.allPairData.find(vv => vv.tradePairId === pairMsg.pairIdMarket[this.selecedMarket][v]))
    return this.state.homeMarketPairData
  }

  getRecommendCurrency() {
    // console.log('getData recommendCurrency', this.WebSocket)
    // this.WebSocket.general.emit('recommendCurrency', {test:'test'})

  }

  getMarketPair() {
    // console.log('getData marketPair', this.WebSocket)

    this.WebSocket.general.emit('joinRoom', {from: '', to: 'home'})
  }

  changeFavorite(tradePairId, userId, operateType, token) {
    this.Proxy.changeFavorite({
      operateType, //0添加 1取消
      tradePairId,
      userId,
      token
    });
    // console.log('收藏 0', tradePairId, userId, operateType)
  }

  async getCoinInfo() {
    this.state.coinInfo = await this.Proxy.coinInfo({userId: JSON.parse('232601699242483712')});
  }

  async getFavoriteList(token, userId) {
    this.state.collectArr = await this.Proxy.getFavoriteList({
      userId,
      token
    });
    return this.state.collectArr
  }

  async getPairInfo() {
    let pairInfo = await this.Proxy.pairInfo();
    console.log('getPairInfo', pairInfo)
    this.state.pairInfo = pairInfo.list
    // this.state.pairMsg = this.formatPairMsg(pairInfo)
    return pairInfo.list
  }

  get pairInfo() {
    return this.state.pairInfo
  }

  async getMarketAll() {
    let marketAll = await this.Proxy.getAllChg();
    // console.log(marketAll)
    // this.state.allPairData = marketAll.marketList
    return marketAll.items
  }

  async getPairMsg() {
    let coinCorrespondingId = {}, marketCorrespondingId = {}, coinCorrespondingPair = {}, marketCorrespondingPair = {};
    // console.log(Object.keys(this.state.pairInfo).length)
    if (!Object.keys(this.state.pairInfo).length) {
      await this.getPairInfo()
    }
    this.state.pairInfo.map((v) => {
      let pair = v.tradePairName.split('/');
      let coin = pair[0];
      let market = pair[1];
      marketCorrespondingId[market] = marketCorrespondingId[market] || {};
      coinCorrespondingId[coin] = coinCorrespondingId[coin] || {};
      marketCorrespondingId[market][coin] = v.tradePairId;
      coinCorrespondingId[coin][market] = v.tradePairId;
      coinCorrespondingPair[coin] = coinCorrespondingPair[coin] || [];
      marketCorrespondingPair[market] = marketCorrespondingPair[market] || [];
      coinCorrespondingPair[coin].push(market);
      marketCorrespondingPair[market].push(coin);
    });
    let pairMsg = {};
    pairMsg.pairIdCoin = coinCorrespondingId;
    pairMsg.pairIdMarket = marketCorrespondingId;
    pairMsg.pairNameCoin = coinCorrespondingPair;
    pairMsg.pairNameMarket = marketCorrespondingPair;
    return pairMsg
  }
}
