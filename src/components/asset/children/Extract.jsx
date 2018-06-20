import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../ExchangeViewBase";
import Button from "../../../common/component/Button";
import Input from "../../../common/component/Input";
import Pagination from "../../../common/component/Pagination";
import TwoVerifyPopup from "../../viewsPopup/TwoVerifyPopup";
import Popup from "../components/popup";
import "../style/extract.styl";
export default class Extract extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false,
      currency: "ETH",
      value: "ETH",
      showAddressPopup: false,
      address: "",
      extractAmount: '', //提现数量
      showTwoVerify: false,
      verifyNum: '获取验证码',
    };
    // 绑定视图，初始化数据
    let { controller } = this.props;
    controller.setView(this);
    let { wallet_extract, wallet_list, extract_history } = controller.initState;
    this.state = Object.assign(this.state, {
      wallet_extract,
      wallet_list,
      extract_history
    });

    //绑定方法
    this.show = () => {
      this.setState({ showSearch: true });
    };
    this.hide = () => {
      this.setState({ showSearch: false });
    };
    this.setValue = value => {
      this.setState({ value });
    };
    this.setCurrency = currency => {
      this.setState({ currency });
    };
    this.getExtract = controller.getExtract.bind(controller);
    this.getCurrencyList = controller.getCurrencyList.bind(controller);
    this.getExtractHistory = controller.getExtractHistory.bind(controller);
    this.appendAddress = controller.appendAddress.bind(controller);
    this.deletAddress = controller.deletAddress.bind(controller);
    this.requestCode = controller.requestCode.bind(controller);
    this.getVerify = controller.getVerify.bind(controller);
  }

  componentWillMount() {
    this.getExtract();
    this.getCurrencyList();
    this.getExtractHistory();
  }

  componentDidMount() {}

  componentWillUpdate(props, state, next) {}

  render() {
    let currency = this.state.currency;
    let {
      extract_addr,
      amount,
      avail,
      lock,
      addr,
      pay_confirms,
      min_withdraw,
      limit_24H,
      limit_used,
      miner_fee,
      service_fee
    } = this.state.wallet_extract;
    let { total, cur_page, page_size, list } = this.state.extract_history;
    let searchArr = this.props.controller.filter(
      this.state.wallet_list,
      this.state.value.toLowerCase()
    );
    return <div className="extract">
        <h3>提币-{currency}</h3>
        <div className="select">
          <div className="search clearfix">
            <span className="title">选择币种</span>
            <div className="currency-asset">
              <div className="input">
                <Input type="search1" placeholder="请输入币种关键字" value={this.state.value} onInput={value => {
                    this.setState({ value: value });
                  }} onFocus={this.show} onEnter={() => {
                    this.setValue(searchArr[0].toUpperCase());
                    this.setCurrency(searchArr[0].toUpperCase());
                    this.hide();
                  }} clickOutSide={() => {
                    this.setValue(searchArr[0].toUpperCase());
                    this.setCurrency(searchArr[0].toUpperCase());
                    this.hide();
                  }}>
                  {<ul className={`search-list ${this.state.showSearch && searchArr.length ? "" : "hide"}`}>
                      {searchArr.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            this.setValue(item.toUpperCase());
                            this.setCurrency(item.toUpperCase());
                            this.hide();
                          }}
                        >
                          {item.toUpperCase()}
                        </li>
                      ))}
                    </ul>}
                </Input>
              </div>
              <ul>
                <li>
                  <span>总额</span>
                  <i>
                    {amount} {currency}
                  </i>
                </li>
                <li>
                  <span>下单冻结</span>
                  <i>
                    {lock} {currency}
                  </i>
                </li>
                <li>
                  <span>可用余额</span>
                  <i>
                    {avail} {currency}
                  </i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="address">
          <p className="tips">
            注意：最小提现数量为{min_withdraw}
            {currency};请勿直接提现至众筹或ICO地址 ，我们不会处理未来代币的发放。
          </p>
          <div className="currency-address clearfix">
            <span className="title">{currency}提现地址</span>
            <div className="content">
              <div className="select-address">
                <Input type="select" readOnly={true} valueArr={extract_addr.map(item => item.address)} onSelect={value => {
                    this.setState({ address: value });
                  }} value={this.state.address} />
              </div>
              <a onClick={() => {
                  this.setState({ showAddressPopup: true });
                }}>
                添加地址
              </a>
            </div>
          </div>
          <div className="extract-amount clearfix">
            <span className="title">提现数量</span>
            <div className="content">
              <p className="limit">
                24H提现额度：{limit_used}/{limit_24H} {currency}
                <NavLink to="/user/identity">提额申请</NavLink>
              </p>
              <div className="input">
              <Input placeholder="提现数量" value={this.state.extractAmount} onInput={(value) => { this.setState({extractAmount: value})}}/>
              <a onClick={() => { this.setState({extractAmount: avail})}}>可提现余额: {avail}</a>
                <span>ETH</span>
              </div>
              <div className="fee">
                <p>
                  手续费：{`${miner_fee - 0 + (service_fee - 0)}`} {currency}
                  <span>实际到账 0 {currency}</span>
                </p>
                <p className="explain">
                  手续费=矿工费+平台手续费{`=${miner_fee}+${service_fee}=${miner_fee -
                    0 +
                    (service_fee - 0)}`}
                </p>
              </div>
            </div>
          </div>
          <div className="password clearfix">
            <span className="title">资金密码</span>
            <div className="content">
              <Input oriType="password" placeholder="请输入您的资金密码" />
              <div className="set">
                <NavLink to="/user/safe">设置资金密码</NavLink>
              </div>
            </div>
          </div>
          <div className="handel">
            <Button title="确认提交" type="base" />
          </div>
        </div>
        <div className="tip clearfix">
          <span className="title">温馨提示</span>
          <ol>
            <li>
              禁止向{currency}地址充值除{currency}之外的资产，任何充入{currency}地址的非{currency}资产将不可找回
            </li>
            <li>
              提币完成后，你可以进入 <NavLink to={`/wallet/dashboard`}>
                资产记录
              </NavLink> 页面跟踪进度
            </li>
          </ol>
        </div>
        <div className="to-trade clearfix">
          <span className="title">去交易</span>
          <Button title="EOS/BTC" type="base" />
        </div>
        <div className="history clearfix">
          <span className="title">提币记录</span>
          <table>
            <thead>
              <tr>
                <th className="time">提币时间</th>
                <th className="currency">币种</th>
                <th className="amount">提币数量</th>
                <th className="send">发送地址</th>
                <th className="receive">接收地址</th>
                <th className="state">状态</th>
                <th className="remark">备注</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.currency}</td>
                  <td>{item.amount}</td>
                  <td>{item.send_address}</td>
                  <td>{item.receive_address}</td>
                  <td>
                    <span>
                      {!item.state
                        ? "通过"
                        : item.state === 1
                          ? "审核中"
                          : "未通过"}
                    </span>
                  </td>
                  <td>{item.remark}</td>
                </tr>)}
            </tbody>
          </table>
          <div className="pagina">
            <Pagination total={total} pageSize={page_size} showTotal={true} showQuickJumper={true} currentPage={cur_page} />
          </div>
          <p className="more">
            <NavLink to={`/wallet/dashboard`}>查看全部→</NavLink>
          </p>
        </div>
        {this.state.showAddressPopup && <Popup type="popup3" addressArr={extract_addr} onSave={add => {
              this.appendAddress(add);
            }} onDelete={add => {
              this.deletAddress(add);
            }} onClose={() => {
              this.setState({ showAddressPopup: false });
            }} />}
      {this.state.showTwoVerify && <TwoVerifyPopup
        isVerify={this.state.showTwoVerify}
        verifyNum={this.state.verifyNum}
        getVerify={this.getVerify}
        onClose={() => { this.setState({ showTwoVerify: false})}}
      />}
      </div>;
  }
}
