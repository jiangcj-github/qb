import ExchangeViewBase from '../../ExchangeViewBase'
import React, {Component} from "react";
import SelectButton from "../../../common/component/SelectButton";
import Button from "../../../common/component/Button";
import DatePicker from "../../../common/component/DatePicker/DatePicker";
import Pagination from "../../../common/component/Pagination";
import '../stylus/orderDetail.styl'

const orderDetailHead = {
  orderCurrent: [{name: '时间'}, {name: '交易对'}, {name: '类型'}, {name: '价格'}, {name: '数量'}, {name: '交易额'}, {name: '尚未成交'}, {name: '已成交'}, {name: '状态'}, {name: '操作'},],
  orderHistory: [{name: '时间'}, {name: '交易对'}, {name: '类型'}, {name: '价格'}, {name: '数量'}, {name: '成交额'}, {name: '已成交'}, {name: '平均成交价'}, {name: '状态'}, {name: '操作'},],
  orderDeal: [{name: '时间'}, {name: '交易对'}, {name: '类型'}, {name: '平均成交价'}, {name: '成交数量'}, {name: '成交额'}, {name: '手续费'},],
};

const orderStatus = {
  0: '未成交',
  1: '部分成交',
  2: '全部成交',
  3: '已撤销',
  4: '撤单中',
  5: '已结束',
  6: '部分成交',
};
// const orderNavItems = {
//   orderCurrent: {
//     title:this.intl.get("order-current"),
//   },
//   orderHistory: {
//     title:this.intl.get("order-history")
//   },
//   orderDeal: {
//     title:this.intl.get("order-deal")
//   }
// };
//
const orderInfoHead = [
  {name: '买方'}, {name: '卖方'}, {name: '成交时间'}, {name: '成交单价'}, {name: '成交数量'}, {name: '成交金额'},
]
export default class OrderCurrent extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      preArray: [],
      // startTime: 1509484067,
      // endTime: 1530088867,
      "startTime": Math.floor(new Date().getTime() / 1000) - 7 * 24 * 60 * 60,
      "endTime": Math.floor(new Date().getTime() / 1000),
      coinArray: [],
      marketArray: [],
      idArray: [],
      coinSelect: this.intl.get('all'),
      marketSelect: this.intl.get('all'),
      typeSelect: this.intl.get('all'),
      orderType: 2,
      hideOther: 0,
      orderStatus: [1, 2, 3, 4, 5, 6, 7],
      page: 1,
      pageSize: 20,
      total: 0,
      detailFlag: false,
      orderDetail: {},
      orderNavItems: {
        orderCurrent: {
          title: this.intl.get("order-current"),
        },
        orderHistory: {
          title: this.intl.get("order-history")
        },
        orderDeal: {
          title: this.intl.get("order-deal")
        }
      },
      orderStatusItems : {
        0: this.intl.get('unDeal'),
        1: this.intl.get('partDeal'),
        2: this.intl.get('totalDeal'),
        3: this.intl.get('reseted'),
        4: this.intl.get('reseting'),
        5: this.intl.get('overed'),
        6: this.intl.get('partDeal'),
      },
      orderDetailHead : {
        orderCurrent: [{name: this.intl.get('time')}, {name: this.intl.get('pair')}, {name: this.intl.get('type')}, {name: this.intl.get('price')}, {name: this.intl.get('amount')}, {name: this.intl.get('deal-trunover')}, {name: this.intl.get('order-unDeal')}, {name: this.intl.get('dealed')}, {name: this.intl.get('state')}, {name: this.intl.get('action')},],
        orderHistory: [{name: this.intl.get('time')}, {name: this.intl.get('pair')}, {name: this.intl.get('type')}, {name: this.intl.get('price')}, {name: this.intl.get('volume')}, {name: this.intl.get('total')}, {name: this.intl.get('dealed')}, {name: this.intl.get('avgPrice')}, {name: this.intl.get('state')}, {name: this.intl.get('action')},],
        orderDeal: [{name: this.intl.get('time')}, {name: this.intl.get('pair')}, {name: this.intl.get('type')}, {name: this.intl.get('avgPrice')}, {name: this.intl.get('volume')}, {name: this.intl.get('total')}, {name: this.intl.get('fee')},],
      },
      orderInfoHead : [
        // {name: this.intl.get('order-buy')}, {name: this.intl.get('order-sell')},
        {name: this.intl.get('order-deal-time')}, {name:  this.intl.get('order-deal-price')}, {name: this.intl.get('order-deal-number')}, {name: this.intl.get('order-deal-money')},
      ]
    };
    const {controller} = this.props;
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.orderListHandle = controller.orderListHandle.bind(controller);
    this.checkoutDetail = controller.getOrderDetail.bind(controller)
    // console.log(controller)
    this.exportHistory = controller.exportHistory.bind(controller);
    // this.getCurrent = controller.getCurrentOrder.bind(controller)
  }

  componentWillMount() {

  }

  componentDidMount() {
    const {pairIdMsg} = this.props;
    let orderStatus = [];
    this.props.type === 'orderHistory' && (orderStatus = [2, 3, 4, 5, 6, 7]) && (this.setState({orderStatus}));
    this.props.type === 'orderDeal' && (orderStatus = [ 2, 5, 6, 7]) && (this.setState({orderStatus}));
    let params = {
      orderCurrent: {
        idArray: this.state.idArray, orderType: this.state.orderType, hideOther: this.state.hideOther
      },
      orderHistory: {
        idArray: this.state.idArray, orderType: this.state.orderType, orderStatus, startTime: this.state.startTime, endTime: this.state.endTime, page: this.state.page, pageSize: this.state.pageSize
      },
    };
    params.orderDeal = params.orderHistory;
    this.orderListHandle(this.props.type, params[this.props.type]);
    let coinArray = pairIdMsg.pairIdCoin && Object.keys(pairIdMsg.pairIdCoin);
    let marketArray = pairIdMsg.pairIdMarket && Object.keys(pairIdMsg.pairIdMarket);
    marketArray && marketArray.unshift(this.intl.get('all'));
    coinArray && coinArray.unshift(this.intl.get('all'));
    this.setState({
      coinArray,
      marketArray
    })
  }

  hideReset(e) {
    let orderStatus = e.target.checked ? [ 2, 4, 5, 6, 7] : [2, 3, 4, 5, 6, 7];
    let params = {
      orderCurrent: {
        idArray: this.state.idArray, orderType: this.state.orderType, hideOther: this.state.hideOther
      },
      orderHistory: {
        idArray: this.state.idArray,
        orderType: this.state.orderType,
        orderStatus: orderStatus,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        page: this.state.page,
        pageSize: this.state.pageSize
      }
    };
    this.setState(
        {orderStatus}
    );
    this.orderListHandle(this.props.type, params[this.props.type])
  }

  changeCoin(e) {
    const {pairIdMsg} = this.props;
    let marketArray = [];
    if(e === this.state.coinSelect){
      return
    }
    let coinValue = (e === this.intl.get('all')) ? '' : e;
    let marketValue = (this.state.marketSelect === this.intl.get('all')) ? '' : this.state.marketSelect;
    let idArray = [];
    let hideOther = 1;
    if (coinValue) {
      marketArray = pairIdMsg.pairNameCoin[coinValue];
      // marketArray.unshift(this.intl.get('all'));
      marketValue && (idArray.push(pairIdMsg.pairIdCoin[coinValue][marketValue])) || (idArray = Object.values(pairIdMsg.pairIdCoin[coinValue]));
    }
    else {
      marketValue && (idArray = Object.values(pairIdMsg.pairIdMarket[marketValue])) || (idArray = []);
    // && (marketArray = pairIdMsg.pairNameMarket[marketValue])
      marketArray = Object.keys(pairIdMsg.pairIdMarket)
      coinValue = this.intl.get('all');
    }
    marketArray.indexOf(this.intl.get('all')) === -1 && marketArray.unshift(this.intl.get('all'));
    this.setState(
        {
          marketArray,
          idArray,
          coinSelect: coinValue,
          hideOther
        }
    )
  }

  changeMarket(e) {
    const {pairIdMsg} = this.props;
    let coinArray = [];
    if(e === this.state.marketSelect){
      return
    }
    let marketValue = (e === this.intl.get('all')) ? '' : e;
    let coinValue = (this.state.coinSelect === this.intl.get('all')) ? '' : this.state.coinSelect;
    let idArray = [];
    let hideOther = 1;
    if (marketValue) {
      coinArray = pairIdMsg.pairNameMarket[marketValue];
      coinValue && (idArray.push(pairIdMsg.pairIdMarket[marketValue][coinValue])) || (idArray = Object.values(pairIdMsg.pairIdMarket && pairIdMsg.pairIdMarket[marketValue]));
    }
    else {
    // && (idArray = Object.values(pairIdMsg.pairIdCoin[coinValue]))
      coinValue  && (coinArray = pairIdMsg.pairNameCoin[coinValue]) || (idArray = []);
      coinArray = pairIdMsg.pairIdCoin && Object.keys(pairIdMsg.pairIdCoin)
      marketValue = this.intl.get('all')
    }
    coinArray.indexOf(this.intl.get('all')) === -1 && coinArray.unshift(this.intl.get('all'));
    this.setState(
        {
          coinArray,
          idArray,
          marketSelect: marketValue,
          hideOther
        }
    )
  }

  changeOrderType(e) {
    const allKey = this.intl.get('all');
    const buyKey = this.intl.get('buy');
    const sellKey = this.intl.get('sell');
    let typeObj = {
    };
    typeObj[this.intl.get('all')] = 2;
    typeObj[this.intl.get('buy')] = 0;
    typeObj[this.intl.get('sell')] = 1;
    this.setState(
        {orderType: typeObj[e], typeSelect: e}
    )
  }

  searchFilter() {
    const params = {
      orderCurrent: {
        idArray: this.state.idArray, orderType: this.state.orderType, hideOther: this.state.hideOther
      },
      orderHistory: {
        idArray: this.state.idArray,
        orderType: this.state.orderType,
        orderStatus: this.state.orderStatus,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        page: this.state.page,
        pageSize: this.state.pageSize
      }
    };
    this.props.type === 'orderCurrent' && this.orderListHandle(this.props.type, params[this.props.type]);
    this.props.type !== 'orderCurrent' && this.orderListHandle(this.props.type, params[this.props.type])
  }

  startTime(e) {
    this.setState({
      startTime: e
    })
  }

  endTime(e) {
    this.setState({
      endTime: e
    })
  }

  checkoutDetail(id) {
    this.setState({
      orderId: id,
      detailFlag: true
    })
  }
  cancelOrder(v){
    let orderId, opType, dealType;
    orderId = JSON.parse(JSON.stringify(v.orderId)) ;
    opType = 0;
    dealType =v.orderType;
    this.props.controller.cancelOrder(orderId, opType, dealType)
  }
  render() {
    const {type} = this.props;
    return (
        <div className='order-detail'>
          <div className='order-title'>
            <h3>{this.state.orderNavItems[type].title}</h3>
            <div style={{display: 'flex', alignItems: 'center'}}>
              {type === 'orderHistory' && <div className='filter-reset'>
                <input type="checkbox" onClick={this.hideReset.bind(this)}/>
                <span>{this.intl.get('hideReset')}</span>
              </div>}
            {type !== 'orderCurrent' && <Button type="export" onClick={() => { this.exportHistory(type) }} title={type === 'orderHistory' ? this.intl.get("exportOrderRecord") : this.intl.get("exportDealRecord")} className='export-record'/>}
            </div>

          </div>
          <ul className='order-filter'>
            <li className='order-pair'>
              <span>{this.intl.get("pair")}</span>
              <SelectButton
                  title={this.state.coinSelect}
                  type="main"
                  className="select"
                  onSelect={(e) => this.changeCoin(e)}
                  valueArr={this.state.coinArray}
              />
              <em>/</em>
              <SelectButton
                  title={this.state.marketSelect}
                  type="main"
                  className="select"
                  onSelect={(e) => this.changeMarket(e)}
                  valueArr={this.state.marketArray}
              />
            </li>
            <li>
              <span>{this.intl.get('type')}</span>
              <SelectButton
                  title={this.state.typeSelect}
                  type="main"
                  className="select"
                  valueArr={[this.intl.get('all'), this.intl.get('buy'), this.intl.get('sell')]}
                  onSelect={(e) => this.changeOrderType(e)}
              />
            </li>
            {type !== 'orderCurrent' && <li className='data-filter'>
              <DatePicker onChangeStart={(e) => this.startTime(e)} onChangeEnd={(e) => this.endTime(e)}/>
            </li>}
            <li className='filter-handle'>
              <Button type="base" title={this.intl.get('search')} className="search" onClick={this.searchFilter.bind(this)}/>
              {type !== 'orderCurrent' && <Button type="base" title={this.intl.get('reset')} className="reset"/>}
            </li>
          </ul>
          <table className='order-detail-table'>
            <thead>
            <tr>
              {this.state.orderDetailHead[type].map((v, index) => {
                return (
                    <td key={index}>{v.name}</td>
                )
              })}
            </tr>
            </thead>
            <tbody>
            {this.state.orderListArray && this.state.orderListArray.map((v, index) => {
              return (
                  <tr key={index}>
                    <td>{Number(v.orderTime).toDate()}</td>
                    <td>{v.tradePairName}</td>
                    <td style={{color: `${v.orderType ? '#D84747' : '#2BB789'}`}}>{v.orderType ? this.intl.get('sell') : this.intl.get('buy')}</td>
                    {/*todo 颜色改类名统一处理*/}
                    {/*价格*/}
                    {type === 'orderCurrent' && <td>{v.price}</td>}
                    {type === 'orderHistory' && <td>{v.priceType ? this.intl.get('marketPrice') : v.price}</td>}
                    {type === 'orderDeal' && <td>{v.avgPrice}</td>}
                    {/*数量*/}
                    {type !== 'orderDeal' && <td>{v.count}</td> || <td>{v.dealDoneCount}</td>}

                    <td>{type === 'orderCurrent' && (v.price * v.count) || v.turnover}</td>
                    {type === 'orderDeal' && <td>{v.fee}</td>}
                    {type === 'orderCurrent' && <td>{v.undealCount}</td>}
                    {type !== 'orderDeal' && <td>{v.dealDoneCount}</td>}
                    {type === 'orderHistory' && <td>{v.avgPrice}</td>}
                    {type !== 'orderDeal' && <td>{this.state.orderStatusItems[v.orderStatus]}</td>}
                    {type === 'orderCurrent' && <td style={{color:'#2BB789', cursor:'pointer'}} onClick={this.cancelOrder.bind(this, v)}>{this.intl.get('cancel')}</td> || type === 'orderHistory' && <td onClick={this.checkoutDetail.bind(this, v.orderId)} style={{color:'#2BB789', cursor: 'pointer'}}>{this.intl.get('detail')}</td>}

                  </tr>
              )
            })}
            </tbody>
          </table>
          <div className='order-page'>
            {(this.props.type !== 'orderCurrent' && this.state.total) && <Pagination total={this.state.total} showTotal={true} pageSize={20}/>}
          </div>
          <div className='history-order-detail' style={{display: this.state.detailFlag ? 'block' : 'none'}}>
            <div className='history-order-detail-content'>
              <div className='detail-content-title'>
                <h3>{this.intl.get('orderDetail')}</h3>
                <i onClick={() => this.setState({detailFlag: false})}></i>
              </div>
              <div className='detail-content-info'>
                <div className='content-info-items'>
                  <p>{this.state.orderDetail.doneCount}</p>
                  <span>{this.intl.get('order-deal-total')}{this.state.orderDetail.tradePairName && this.state.orderDetail.tradePairName.split('/')[1]}</span>
                </div>
                <div className='content-info-items'>
                  <p>{this.state.orderDetail.dealedMoney}</p>
                  <span>{this.intl.get('order-deal-money')}{this.state.orderDetail.tradePairName && this.state.orderDetail.tradePairName.split('/')[0]}</span>
                </div>
                <div className='content-info-items'>
                  <p>{this.state.orderDetail.price}</p>
                  <span>{this.intl.get('avgPrice')}{this.state.orderDetail.tradePairName && this.state.orderDetail.tradePairName.split('/')[0]}</span>
                </div>
                <div className='content-info-items'>
                  <p>{this.state.orderDetail.fee}</p>
                  <span>{this.intl.get('fee')}{this.state.orderDetail.tradePairName && this.state.orderDetail.tradePairName.split('/')[1]}</span>
                </div>
              </div>
              <table className='content-info-table'>
                <thead>
                <tr>
                  {this.state.orderInfoHead.map((v, index) => {
                    return (
                        <td key={index}>{v.name}</td>
                    )
                  })}
                </tr>
                </thead>
                <tbody>
                {this.state.orderDetail.orderList && this.state.orderDetail.orderList.map((v, index) => {
                  return (
                      <tr key={index}>
                        {/*<td>{v.buyer}</td>*/}
                        {/*<td>{v.seller}</td>*/}
                        <td>{Number(v.orderTime).toDate()}</td>
                        <td>{v.price}</td>
                        <td>{v.volume}</td>
                        <td>{v.turnover}</td>
                      </tr>
                  )
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    )
  }
}