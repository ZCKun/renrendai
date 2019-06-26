;/*!/client/widget/detail/lend/lend-detail-buy-template/lend-detail-buy-template.js*/
define("transfer:widget/detail/lend/lend-detail-buy-template/lend-detail-buy-template.js", function(require, exports, module) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    function _inherits(subClass, superClass) {
        if ("function" != typeof superClass && null !== superClass)
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    }
    var React = require("common:node_modules/react/react")
      , utils = require("common:widget/ui/utils/utils")
      , RWeDialog = require("common:widget/react-ui/RWeDialog/RWeDialog")
      , RCoupon = require("common:widget/react-ui/RCoupon/RCoupon")
      , $ = require("common:widget/lib/jquery/jquery")
      , $statistic = (require("common:node_modules/numeral/numeral"),
    require("common:node_modules/glpb-components-common/src/index").weStatistic)
      , BugTemplate = function(_React$Component) {
        function BugTemplate(props) {
            _classCallCheck(this, BugTemplate),
            _React$Component.call(this, props);
            var selectDefault = ""
              , couponList = this.props.coupon;
            couponList.length > 0 && (selectDefault = couponList[0].couponId),
            this.state = {
                show: this.props.show,
                couponId: selectDefault,
                couponList: couponList
            }
        }
        return _inherits(BugTemplate, _React$Component),
        BugTemplate.prototype.componentWillReceiveProps = function(props) {
            var show = this.state.show
              , nowprops = props.show
              , couponList = props.coupon
              , couponId = "";
            couponList && couponList.length > 0 && (couponId = couponList[0].couponId),
            nowprops != show && this.setState({
                show: nowprops,
                couponId: couponId,
                couponList: couponList
            })
        }
        ,
        BugTemplate.prototype.checkAgree = function(e) {
            var that = e.currentTarget;
            $(that).hasClass("j-checked") ? ($(that).removeClass("j-checked"),
            $(that).find("input").prop("checked", !1)) : ($(that).addClass("j-checked"),
            $(that).find("input").prop("checked", !0))
        }
        ,
        BugTemplate.prototype.selectOnChange = function(selectDefault, list) {
            this.setState({
                couponId: selectDefault,
                couponList: list
            })
        }
        ,
        BugTemplate.prototype.jumpToRisk = function() {
            var detail = this.props.detail
              , id = detail.transferId;
            location.href = "/user/risk/riskPc?type=transfer&id=" + id
        }
        ,
        BugTemplate.prototype.statisticRiskEvent = function() {
            $statistic.eventRaw({
                eventId: "click_join_money_limit_remeaure_word"
            })
        }
        ,
        BugTemplate.prototype.jumpToBindCard = function() {
            location.href = "/user/trade/recharge"
        }
        ,
        BugTemplate.prototype.getCouponValue = function(couponList, selectDefault) {
            var payableNum = 0;
            for (var i in couponList)
                couponList[i].couponId == selectDefault && (payableNum = couponList[i].couponValue);
            return payableNum
        }
        ,
        BugTemplate.prototype.createBugTransferHtml = function() {
            var detail = this.props.detail
              , nodePayInfo = (this.props.riskInfo,
            this.props.nodePayInfo)
              , html = (this.props.exceedRiskLimit,
            detail.transferId,
            "")
              , queryCoupon = {
                businessCategory: "TRANSFER",
                payAmount: detail.formatAmount,
                bindScene: 1
            }
              , selectDefault = this.state.couponId
              , couponList = this.state.couponList
              , payableNum = this.getCouponValue(couponList, selectDefault)
              , shouldNum = utils.fixFloat2(detail.formatAmount - payableNum);
            if (detail) {
                var btnDom = React.createElement("button", {
                    className: "ui-button j-btn j-btn-orange j-dialog-btn-small",
                    type: "submit",
                    onClick: this.sureBugTransfer.bind(this)
                }, "确 定");
                if (nodePayInfo) {
                    var bindStatus = nodePayInfo.bindStatus;
                    (0 == bindStatus || 3 == bindStatus) && (btnDom = React.createElement("div", {
                        className: "ui-button j-btn j-btn-orange j-dialog-btn-small",
                        onClick: this.jumpToBindCard.bind(this)
                    }, "确定"))
                }
                html = React.createElement("div", {
                    className: "ui-confirm-content"
                }, React.createElement("ul", {
                    className: "confirm-ul"
                }, React.createElement("li", {
                    className: "transfer-list"
                }, React.createElement("span", {
                    className: "transfer-list-left"
                }, "待转让债权"), React.createElement("span", {
                    className: "transfer-list-right"
                }, "ID ", detail.loanId, " ")), React.createElement("li", {
                    className: "transfer-list"
                }, React.createElement("span", {
                    className: "transfer-list-left"
                }, "债权总价值"), React.createElement("span", {
                    className: "transfer-list-right"
                }, React.createElement("em", {
                    "data-type": "multishares"
                }, utils.commaFloat(detail.totalPrice || 0)), " 元")), React.createElement("li", {
                    className: "transfer-list-1-line m-t15"
                }, React.createElement("span", null, "债权价值的通常算法：当时的待收本金与计算当日距离上一期还款的天数所对应的利息之和。"), React.createElement("a", {
                    className: "more-than",
                    href: "/help/investment/58734407a4a7b30e4b8cff2e",
                    target: "_blank"
                }, "查看详细")), React.createElement("li", {
                    className: "fn-clear"
                }, React.createElement("span", {
                    className: "transfer-list-left"
                }, "出借金额"), React.createElement("span", {
                    className: "transfer-list-right"
                }, React.createElement("em", {
                    "data-type": "multishares"
                }, utils.commaFloat(detail.amount || 0)), " 元")), React.createElement("li", {
                    className: "fn-clear"
                }, React.createElement("span", {
                    className: "transfer-list-left"
                }, "待收本息"), React.createElement("span", {
                    className: "transfer-list-right"
                }, React.createElement("em", {
                    "data-type": "multishares"
                }, utils.commaFloat(detail.leftPrincipleInterest || 0)), " 元")), React.createElement("li", {
                    className: "coupon-list"
                }, React.createElement(RCoupon, {
                    selectDefault: selectDefault,
                    queryCoupon: queryCoupon,
                    coupon: couponList,
                    selectOnChange: this.selectOnChange.bind(this)
                })), React.createElement("li", {
                    className: "fn-clear"
                }, React.createElement("span", {
                    className: "transfer-list-left"
                }, "应付金额"), React.createElement("span", {
                    className: "transfer-list-right"
                }, React.createElement("em", {
                    className: "orange-color payable-num",
                    "data-payable": detail.formatAmount,
                    "data-amount": shouldNum
                }, utils.commaFloat(shouldNum || 0)), " 元")), React.createElement("li", {
                    className: "fn-clear list-hide"
                }, React.createElement("span", {
                    className: "transfer-list-left"
                }), React.createElement("span", {
                    className: "transfer-list-right"
                }, React.createElement("em", {
                    className: "orange-color",
                    "data-payable": detail.formatAmount
                }, "您的余额不足"), React.createElement("a", {
                    className: "recharge-loan",
                    href: "/user/trade/recharge"
                }, "充值"))), React.createElement("li", {
                    className: "fn-clear"
                }, React.createElement("span", {
                    className: "transfer-list-left"
                }, "折让收益"), React.createElement("span", {
                    className: "transfer-list-right"
                }, React.createElement("em", {
                    "data-type": "multishares"
                }, utils.commaFloat(detail.discountPrice)), " 元")), React.createElement("li", {
                    className: "transfer-agreement"
                }, React.createElement("div", {
                    className: "check-bug",
                    onClick: this.checkAgree.bind(this)
                }, React.createElement("input", {
                    className: "",
                    type: "checkbox",
                    id: "rememberme",
                    name: "agree-transfer",
                    defaultChecked: "checked"
                }), React.createElement("span", {
                    className: "check-img"
                }), React.createElement("span", null, "我已阅读并同意签署", React.createElement("a", {
                    onClick: function(e) {
                        e.stopPropagation()
                    },
                    className: "more-than",
                    href: "/p2p/contract/transfer?loanId=" + detail.loanId,
                    target: "_blank"
                }, "《债权转让及受让协议》"), "及", React.createElement("a", {
                    onClick: function(e) {
                        e.stopPropagation()
                    },
                    className: "more-than",
                    href: "//www.renrendai.com/agreement/contract/currency/cmsId/5bb06ea3e141322c89974537",
                    target: "_blank"
                }, "《风险揭示书》"))))), React.createElement("div", {
                    className: "ui-confirm-submit-box"
                }, React.createElement("span", {
                    className: "error-text"
                }, "投标前请阅读并同意协议"), btnDom, React.createElement("form", {
                    name: "toMingSheng",
                    ref: "formBugTransfer",
                    id: "",
                    action: "/transfer/detail/buyTransfer",
                    method: "POST"
                }, React.createElement("input", {
                    type: "hidden",
                    name: "transferId",
                    value: detail.transferId
                }), React.createElement("input", {
                    type: "hidden",
                    name: "share",
                    value: detail.share
                }), React.createElement("input", {
                    type: "hidden",
                    name: "currentPrice",
                    value: detail.currentPrice
                }), React.createElement("input", {
                    type: "hidden",
                    name: "countRatio",
                    value: detail.discountPrice
                }), React.createElement("input", {
                    type: "hidden",
                    name: "couponId",
                    value: this.state.couponId
                }))), React.createElement("input", {
                    type: "hidden",
                    name: "context",
                    value: ""
                }), React.createElement("input", {
                    type: "hidden",
                    name: "actionUrl",
                    value: ""
                }))
            }
            return html
        }
        ,
        BugTemplate.prototype.hideDialog = function() {
            location.reload()
        }
        ,
        BugTemplate.prototype.ErrorText = function(text) {
            $(".error-text").text(text),
            $(".error-text").fadeIn(1500, function() {
                $(".error-text").fadeOut(1500)
            })
        }
        ,
        BugTemplate.prototype.sureBugTransfer = function() {
            var rememberme = $(".check-bug").hasClass("j-checked") ? !0 : !1
              , detail = this.props.detail
              , balanceMoney = detail ? detail.availablePoints : 0
              , payableNum = $(".payable-num").attr("data-amount");
            if (!rememberme)
                return this.ErrorText("投标前请阅读并同意协议"),
                !1;
            if (payableNum > balanceMoney)
                $(".list-hide").removeClass("list-hide");
            else {
                var transferBug = this.refs.formBugTransfer;
                transferBug.submit()
            }
        }
        ,
        BugTemplate.prototype.render = function() {
            var show = this.state.show
              , showing = 2 == show ? !0 : !1
              , dialogContent = this.createBugTransferHtml()
              , weProps = {
                showing: showing,
                title: "确认出借",
                onRequestClose: this.hideDialog
            };
            return React.createElement("div", {
                className: "loan-transfer-dialog"
            }, React.createElement(RWeDialog, weProps, dialogContent))
        }
        ,
        BugTemplate
    }(React.Component);
    module.exports = BugTemplate
});
;/*!/client/widget/detail/lend/lend-detail-header/lend-detail-header.js*/
define("transfer:widget/detail/lend/lend-detail-header/lend-detail-header.js", function(require, exports, module) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    function _inherits(subClass, superClass) {
        if ("function" != typeof superClass && null !== superClass)
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    }
    var React = require("common:node_modules/react/react")
      , utils = require("common:widget/ui/utils/utils")
      , p2pUtil = utils.p2pUtil
      , service = require("common:widget/ui/service/service-factory")
      , p2pService = service.getService("p2p")
      , RWeStatusDialog = (require("common:widget/react-ui/RList/List"),
    require("common:widget/react-ui/RWeStatusDialog/RWeStatusDialog"))
      , RWeOpenAccount = require("common:widget/react-ui/ROpenAccount/ROpenAccount")
      , RWETooltip = require("common:widget/react-ui/RWETooltip/RWETooltip")
      , DialogTemplate = require("transfer:widget/detail/lend/lend-detail-buy-template/lend-detail-buy-template")
      , ReactTooltip = require("common:node_modules/react-tooltip/dist/index")
      , InvestDialog = require("common:widget/ui/investDialog/investDialog")
      , LendHeader = function(_React$Component) {
        function LendHeader(props) {
            _classCallCheck(this, LendHeader),
            _React$Component.call(this, props);
            var buyResult = this.props.buyResult
              , show = buyResult ? !0 : !1;
            this.state = {
                show: 1,
                dialogData: "",
                couponList: [],
                inputValue: "",
                errorText: "",
                commonDialog: show,
                exceedRiskLimit: !1,
                riskDialogShow: !1,
                riskDialogType: 1,
                riskDialogResult: ""
            },
            this.closeRiskDialog = this.closeRiskDialog.bind(this),
            this.jumpToRisk = this.jumpToRisk.bind(this)
        }
        return _inherits(LendHeader, _React$Component),
        LendHeader.prototype.jumpToRisk = function() {
            var transferId = $(".transferId").val();
            location.href = "/user/risk/riskPc?type=transfer&id=" + transferId
        }
        ,
        LendHeader.prototype.closeRiskDialog = function() {
            this.setState({
                riskDialogShow: !1
            })
        }
        ,
        LendHeader.prototype.changeDialogProps = function() {
            var state = this.state || {}
              , type = state.riskDialogType
              , dialogProps = $.extend({}, {
                onRequestClose: this.closeRiskDialog,
                dialog: {
                    className: "r-risk-dialog"
                }
            });
            return 1 === type ? (dialogProps.message = state.riskDialogResult,
            dialogProps.buttons = [{
                text: "我知道了",
                event: this.closeRiskDialog,
                skin: "white"
            }, {
                text: "去测评",
                skin: "orange",
                event: this.jumpToRisk
            }]) : 2 === type ? (dialogProps.message = state.riskDialogResult,
            dialogProps.buttons = [{
                text: "我知道了",
                skin: "orange",
                event: this.closeRiskDialog
            }]) : 3 === type && (dialogProps.message = state.riskDialogResult,
            dialogProps.buttons = [{
                text: "我知道了",
                skin: "white",
                event: this.closeRiskDialog
            }, {
                event: this.jumpToRisk,
                text: "重新测评",
                skin: "orange"
            }]),
            dialogProps
        }
        ,
        LendHeader.prototype.riskDialog = function() {
            var dialogProps = this.changeDialogProps()
              , riskDialogShow = this.state.riskDialogShow;
            return riskDialogShow ? React.createElement(RWeStatusDialog, dialogProps) : void 0
        }
        ,
        LendHeader.prototype.getLoanRisk = function(copies) {
            var _this2 = this
              , detail = this.props.detail || {}
              , loanTransfer = detail.loanTransfer || {}
              , discountPricePerShare = loanTransfer.discountPricePerShare
              , amount = utils.fixFloat2(copies * discountPricePerShare)
              , loan = detail.loan || {}
              , loanId = loan.loanId;
            p2pService.checkLoanRisk({
                loanId: loanId
            }).then(function(loanResult) {
                var loanData = loanResult.data || {}
                  , loanStatus = loanData.status;
                if (0 === loanStatus) {
                    var loanRiskData = loanData.data || {}
                      , checkLoanRiskFlag = loanRiskData.checkLoanRiskFlag;
                    checkLoanRiskFlag ? _this2.setState({
                        riskDialogResult: React.createElement("div", null, "您的风险等级为", React.createElement("span", {
                            className: "text-orange-color"
                        }, loanRiskData.currentRiskLevel), "，达到", React.createElement("span", {
                            className: "text-orange-color"
                        }, loanRiskData.nextRiskLevel), "才可出借此项目"),
                        riskDialogShow: !0,
                        riskDialogType: 3
                    }) : p2pService.checkRiskLimit({
                        amount: amount
                    }).then(function(result) {
                        var data = result.data || {}
                          , status = data.status;
                        if (0 === status)
                            _this2.sendTransferDialog();
                        else if (80030 === status)
                            _this2.setState({
                                riskDialogShow: !0,
                                riskDialogType: 2,
                                riskDialogResult: "您当前在平台的出借本金已超出您的风险承受能力，为了您的资金安全，您将不能继续在平台出借。"
                            });
                        else if (80029 === status) {
                            var resultData = data.data || {};
                            _this2.setState({
                                riskDialogResult: React.createElement("div", null, "您的风险等级为", React.createElement("span", {
                                    className: "text-orange-color"
                                }, resultData.currentRiskLevel), "，达到", React.createElement("span", {
                                    className: "text-orange-color"
                                }, resultData.nextRiskLevel), "才可出借此项目"),
                                riskDialogShow: !0,
                                riskDialogType: 3
                            })
                        } else
                            _this2.setState(80007 === status || 80025 === status ? {
                                riskDialogShow: !0,
                                riskDialogType: 1,
                                riskDialogResult: "授权出借前需完成风险测评"
                            } : {
                                riskDialogShow: !0,
                                riskDialogType: 1,
                                riskDialogResult: "网络错误,请稍后再试!"
                            })
                    })
                } else
                    _this2.setState({
                        riskDialogShow: !0,
                        riskDialogType: 1,
                        riskDialogResult: "网络错误,请稍后再试!"
                    })
            })
        }
        ,
        LendHeader.prototype.getAllStatusHtml = function() {
            var detail = this.props.detail
              , loan = detail.loan
              , loanTransfer = detail.loanTransfer
              , isLogin = this.props.isLogin
              , status = loanTransfer.status
              , html = ""
              , share = ""
              , onePrice = loanTransfer.share * loanTransfer.discountPricePerShare;
            share = "debx-cf" == loan.utmSource ? loanTransfer.share / 20 : loanTransfer.share;
            var loanBalance = ""
              , availablePoints = detail.availablePoints ? utils.commaFloat(detail.availablePoints) : "0.00";
            loanBalance = isLogin ? React.createElement("div", {
                className: "loan-balance"
            }, React.createElement("p", null, "可用金额 ", React.createElement("em", null, availablePoints), "元"), React.createElement("a", {
                target: "_blank",
                href: "/user/trade/recharge"
            }, "充值")) : React.createElement("div", {
                className: "loan-balance"
            }, React.createElement("p", null, "可用金额 ", React.createElement("a", {
                href: "/login"
            }, "登录"), "后可见"));
            var opStatus = ""
              , opDisabled = ""
              , repayingFlag = detail.repayingFlag
              , buttonText = "";
            "TRANSFERING" == status ? (opStatus = "OPEN",
            buttonText = "出借") : "TRANSFERED" == status ? (opDisabled = "disable",
            opStatus = "OPEN",
            buttonText = "出借") : "CANCLE" == status || "CLOSED_CANCLE" == status || "OVERDUE_CANCLE" == status ? (opStatus = "CANCELED",
            opDisabled = "disable",
            buttonText = "已取消") : (opStatus = "UNKNOWN",
            opDisabled = "disable",
            buttonText = "不可购买");
            var errorText = this.state.errorText
              , buttonDisabled = errorText ? "disable" : ""
              , inputHtml = ""
              , Maxshare = ""
              , unitPrice = "";
            unitPrice = utils.fixFloat2("debx-cf" == loan.utmSource ? 20 * loanTransfer.discountPricePerShare : loanTransfer.discountPricePerShare);
            var inputState = this.state.inputValue || 0
              , inputValue = "";
            if (!errorText && inputState && (inputValue = utils.fixFloat2(inputState * unitPrice) + "元"),
            "OPEN" == opStatus && "disable" != opDisabled && "false" == repayingFlag) {
                var userMaxShare = "debx-cf" == loan.utmSource ? parseInt(detail.userMaxShare / 20) : detail.userMaxShare;
                inputHtml = React.createElement("div", {
                    className: this.state.errorText ? "bug-loan error-border" : "bug-loan"
                }, React.createElement("input", {
                    type: "text",
                    value: this.state.inputValue,
                    placeholder: "请输入受让份数",
                    "data-max": share,
                    onChange: this.handleChange.bind(this),
                    className: "transfer-value"
                }), React.createElement("span", {
                    className: "sum-number"
                }, "份 ", inputValue)),
                Maxshare = React.createElement("div", {
                    className: "can-bug-num pb-0"
                }, React.createElement("p", null, "最大可受让份数 ", React.createElement("i", null, userMaxShare + "份")))
            } else
                inputHtml = React.createElement("div", {
                    className: "bug-loan"
                }, React.createElement("div", {
                    className: "loan-input-text"
                }, "请输入受让份数"), React.createElement("span", null, "份")),
                Maxshare = React.createElement("div", {
                    className: "can-bug-num pb-0"
                }, React.createElement("p", null, "此债权已不可购买"));
            var bugButton = "";
            return bugButton = "false" == repayingFlag ? React.createElement("button", {
                className: "go-bug " + opDisabled + " " + opStatus + " " + buttonDisabled,
                onClick: this.bugTransfer.bind(this)
            }, buttonText) : React.createElement("button", {
                className: "go-bug disable"
            }, "还款中"),
            html = "TRANSFERING" == status || "PRESALE" == status ? React.createElement("div", {
                className: "loan-con-r",
                key: "OPEN"
            }, loanBalance, React.createElement("div", {
                className: "loan-total-box"
            }, React.createElement("span", {
                className: "loan-total-desc"
            }, "出借金额(元)"), React.createElement("div", {
                className: "loan-total-amount"
            }, utils.commaFloat(onePrice))), bugButton) : "TRANSFERED" == status ? React.createElement("div", {
                className: "loan-content-right-desc"
            }, React.createElement("div", {
                className: "loan-box-right"
            }, React.createElement("p", null, "成交用时：" + detail.turnoverUsedTime)), React.createElement("div", {
                className: "transfer-box-amount pt-32"
            }, React.createElement("p", null, utils.commaFloat(detail.turnoverAmount) + " 元"), React.createElement("em", null, "成交金额")), React.createElement("div", {
                className: "stamp-new"
            }, React.createElement("img", {
                src: "//www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/FINISHED.png"
            }))) : React.createElement("div", {
                className: "loan-content-right-desc"
            }, React.createElement("div", {
                className: "loan-box-1-line"
            }, React.createElement("p", null, "已撤销")), React.createElement("div", {
                className: "stamp-new"
            }, React.createElement("img", {
                src: "//www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/REPEAl.png"
            })))
        }
        ,
        LendHeader.prototype.handleChange = function(e) {
            var target = e.target
              , value = target.value;
            value = isNaN(value) ? this.state.inputValue : value;
            var maxNum = target.getAttribute("data-max")
              , errorText = "";
            parseInt(value) > parseInt(maxNum) && (errorText = "您最多只能购买" + maxNum + "份");
            var moneyStr = value.toString();
            moneyStr.indexOf(" ") >= 0 && (errorText = "输入份数不能有空格"),
            this.setState({
                errorText: errorText,
                inputValue: value
            })
        }
        ,
        LendHeader.prototype.sendTransferDialog = function() {
            var detail = this.props.detail
              , loanTransfer = detail.loanTransfer
              , share = loanTransfer.share
              , transferId = $(".transferId").val()
              , _this = this;
            $.ajax({
                dataType: "json",
                type: "get",
                url: "/transfer/detail/bugConfirm",
                data: {
                    share: parseInt(share),
                    transferId: transferId
                },
                success: function(data) {
                    if (0 == data.status) {
                        var queryData = {
                            businessCategory: "TRANSFER",
                            payAmount: data.data.formatAmount,
                            businessId: transferId
                        };
                        $.ajax({
                            dataType: "json",
                            type: "get",
                            url: "/transfer/detail/couponList",
                            data: queryData,
                            success: function(coupon) {
                                if (0 == coupon.status) {
                                    var dialogData = data.data;
                                    _this.setState({
                                        dialogData: dialogData,
                                        show: 2,
                                        couponList: coupon.data
                                    })
                                }
                            }
                        })
                    } else
                        1001 == data.status && (location.href = "/login")
                }
            })
        }
        ,
        LendHeader.prototype.bugTransfer = function(e) {
            var _this3 = this
              , detail = this.props.detail
              , loanTransfer = detail.loanTransfer
              , share = loanTransfer.share
              , target = e.currentTarget
              , disable = $(target).hasClass("disable")
              , isLogin = ($(".transferId").val(),
            this.props.isLogin)
              , hasAccount = this.props.hasAccount;
            if (!isLogin)
                return location.href = "/login",
                !1;
            if (disable)
                return !1;
            if (!hasAccount)
                return this.setState({
                    commonDialog: !0
                }),
                !1;
            if (!share)
                return this.setState({
                    errorText: "输入份数不能为空"
                }),
                !1;
            var switcher = !1;
            $.ajax({
                url: "/autoinvest/product/riskSwitchStatus",
                type: "post",
                dataType: "json",
                async: !1,
                success: function(res) {
                    0 === res.status && (switcher = res.data.display)
                },
                timeout: 2e3
            }),
            switcher ? new InvestDialog({
                type: "RISK",
                id: "risk",
                submitCallback: function() {
                    _this3.riskInfoDialog(share)
                }
            }).show() : this.riskInfoDialog(share)
        }
        ,
        LendHeader.prototype.riskInfoDialog = function(share) {
            var props = this.props
              , riskInfo = props.riskInfo
              , riskFlag = riskInfo.riskFlag
              , isRisk = riskInfo.isRisk;
            if (riskFlag) {
                if (!isRisk)
                    return this.setState({
                        riskDialogShow: !0,
                        riskDialogType: 1,
                        riskDialogResult: "授权出借前需完成风险测评"
                    }),
                    !1;
                this.getLoanRisk(share)
            } else
                this.sendTransferDialog()
        }
        ,
        LendHeader.prototype.createLeftDom = function() {
            var detail = this.props.detail
              , loan = detail.loan
              , loanTransfer = detail.loanTransfer
              , unitPrice = "";
            unitPrice = utils.fixFloat2("debx-cf" == loan.utmSource ? 20 * loanTransfer.discountPricePerShare : loanTransfer.discountPricePerShare);
            var onePrice = loanTransfer.share * loanTransfer.discountPricePerShare;
            0 == loanTransfer.share && (onePrice = loanTransfer.initialShare * loanTransfer.discountPricePerShare);
            var overDued = loan.overDued ? "曾有过逾期记录" : "未发生过逾期"
              , interestDate = ("FXHB" == loan.loanType || 1 == loan.allProtected,
            detail.interestDate)
              , interestTime = ""
              , pdlFlag = loan.pdlFlag;
            interestTime = pdlFlag ? interestDate ? utils.formatDateAllTime(new Date(interestDate))[2] : "放款日次日" : interestDate ? utils.formatDateAllTime(new Date(interestDate))[2] : "放款日当日";
            var repayTerm = "QUARTER" == loan.repayType ? "按季还款" : "按月还款"
              , repayMethod = "DEBX" == loan.loanType ? "等额本息" : "付息还本"
              , repayDesc = repayTerm + "/" + repayMethod;
            "xxhb-rrjf" == loan.utmSource && "xxhb" == detail.productRepayType && (repayDesc = loan.xxhbMonth ? loan.xxhbMonth + "个月先息后本，" + loan.debxMonth + "个月等额本息" : repayTerm + "/" + repayMethod);
            var repaySource = detail.repaySource || "--"
              , info = this.props.info
              , borrower = info.borrower || {}
              , creditLevel = borrower.creditLevel || ""
              , tips = this.createRepatTips(loan)
              , nextRepayDate = detail.nextRepayDate
              , nextRepayTime = nextRepayDate ? utils.formatDateAllTime(new Date(nextRepayDate))[3] : ""
              , leftTimesDom = null
              , surplusDay = 0 == detail.surplusMonth && 0 == detail.surplusDay ? 1 : detail.surplusDay;
            leftTimesDom = 0 == detail.surplusMonth ? React.createElement("p", {
                className: "w170"
            }, React.createElement("em", null, surplusDay), React.createElement("span", null, "天")) : 0 == surplusDay ? React.createElement("p", {
                className: "w170"
            }, React.createElement("em", null, detail.surplusMonth), React.createElement("span", null, "个月")) : React.createElement("p", {
                className: "w170"
            }, React.createElement("em", null, detail.surplusMonth), React.createElement("span", null, "个月"), React.createElement("span", null, React.createElement("em", null, detail.surplusDay), React.createElement("span", null, "天")));
            var result = React.createElement("div", {
                className: "loan-con-l"
            }, React.createElement("div", {
                className: "loan-l-number"
            }, React.createElement("p", {
                className: "w265"
            }, React.createElement("em", {
                className: "con-font"
            }, utils.commaFloat(onePrice)), React.createElement("span", {
                className: "con-font"
            }, "元")), React.createElement("p", {
                className: "w205"
            }, React.createElement("em", null, utils.fixFloat2(loan.interest)), React.createElement("span", {
                className: "txt-color"
            }, "%")), leftTimesDom), React.createElement("div", {
                className: "loan-l-number-desc"
            }, React.createElement("span", {
                className: "w265"
            }, "转让价格"), React.createElement("span", {
                className: "w205"
            }, "年利率"), React.createElement("span", {
                className: "w170"
            }, "剩余期限")), React.createElement("ul", null, React.createElement("li", null, React.createElement("i", {
                className: "loan-li-desc"
            }, "起息日"), React.createElement("span", null, interestTime)), React.createElement("li", {
                className: "w290"
            }, React.createElement("i", {
                className: "loan-li-desc"
            }, "提前还款费率"), React.createElement("span", {
                className: "orange"
            }, utils.fixFloat2(detail.inRepayFeeRate) + "%")), React.createElement("li", null, React.createElement("i", {
                className: "loan-li-desc"
            }, "下一还款日"), React.createElement("span", null, nextRepayTime)), React.createElement("li", {
                className: "w290"
            }, React.createElement("i", {
                className: "loan-li-desc"
            }, "转让系数"), React.createElement("span", null, utils.fixFloat1(100 * loanTransfer.discountRatio) + "%")), React.createElement("li", null, React.createElement("i", {
                className: "loan-li-desc"
            }, "还款方式"), React.createElement("span", null, repayDesc), React.createElement("a", {
                target: "_blank",
                href: "https://www.renrendai.com/help/investment/586f4bda1538f40e27736390"
            }, React.createElement(RWETooltip, {
                tip: tips,
                delayHide: 300,
                html: !0,
                place: "right"
            }))), React.createElement("li", {
                className: "w290"
            }, React.createElement("i", {
                className: "loan-li-desc"
            }, "逾期情况"), React.createElement("span", null, overDued)), React.createElement("li", null, React.createElement("i", {
                className: "loan-li-desc"
            }, "还款来源"), React.createElement("span", null, repaySource)), React.createElement("li", {
                className: "w290"
            }, React.createElement("i", {
                className: "loan-li-desc"
            }, "风险等级"), React.createElement("span", null, creditLevel))));
            return result
        }
        ,
        LendHeader.prototype.createRepatTips = function(loan) {
            var tipsText = "";
            return tipsText = "DEBX" == loan.loanType ? "等额本息还款法是在还款期内，每月偿还同等数额的贷款(包括本金和利息)。</br>借款人每月还款额中的本金比重逐月递增、利息比重逐月递减。" : "付息还本是在还款期内，每月偿还利息，到期偿还本金的方式。"
        }
        ,
        LendHeader.prototype.closeCommonDialog = function() {
            this.setState({
                commonDialog: !1
            })
        }
        ,
        LendHeader.prototype.renderCommonDialog = function() {
            var commonDialog = this.state.commonDialog
              , buyResult = this.props.buyResult
              , dialog = React.createElement(RWeOpenAccount, {
                onRequestClose: this.closeCommonDialog.bind(this)
            });
            if (buyResult) {
                var dialogProps = {
                    onRequestClose: this.closeCommonDialog.bind(this),
                    status: 2,
                    message: buyResult.message
                };
                dialog = React.createElement(RWeStatusDialog, dialogProps)
            }
            var errorDialog = commonDialog ? dialog : null;
            return errorDialog
        }
        ,
        LendHeader.prototype.render = function() {
            var detail = this.props.detail
              , riskInfo = this.props.riskInfo
              , nodePayInfo = this.props.nodePayInfo
              , loan = detail.loan
              , loanTransfer = detail.loanTransfer
              , LeftDom = this.createLeftDom()
              , displayLoanType = p2pUtil.loanAllType(loan.displayLoanType)
              , RightDom = this.getAllStatusHtml()
              , transferId = loanTransfer.id
              , transferTitle = "NO." + transferId + loan.title
              , CommonDialog = this.renderCommonDialog()
              , riskTipsData = this.props.riskTipsData
              , cmsData = riskTipsData.transfer
              , riskDialog = this.riskDialog();
            return console.log("this.props.showTransferContractRisk", this.props.showTransferContractRisk),
            React.createElement("div", {
                className: "loan-header"
            }, React.createElement("div", {
                className: "loan-agreement"
            }, React.createElement("i", null, displayLoanType[1]), React.createElement("p", null, transferTitle), React.createElement("div", {
                className: "transfer-header-tips"
            }, React.createElement("div", {
                className: "tips-text"
            }, cmsData.detailText), React.createElement("div", {
                "data-tip": cmsData.informContent,
                "data-for": "introduce-sadFace",
                className: "icon-we-tips"
            }), React.createElement(ReactTooltip, {
                id: "introduce-sadFace",
                html: "true",
                type: "light",
                effect: "solid",
                place: "bottom",
                border: !0
            })), React.createElement("div", {
                className: "agreement-container"
            }, React.createElement("a", {
                className: "agreement-right",
                href: "/p2p/contract/transfer?loanId=" + loan.loanId,
                target: "_blank"
            }, "债权转让及受让协议（范本）"), this.props.showTransferContractRisk ? React.createElement("span", {
                style: {
                    paddingLeft: 0
                }
            }, React.createElement("span", {
                style: {
                    paddingLeft: 0
                }
            }, "、"), React.createElement("a", {
                className: "agreement-right",
                href: "/p2p/contract/transferRisk?loanId=" + loan.loanId,
                target: "_blank"
            }, "风险揭示书")) : "")), React.createElement("div", {
                className: "loan-content"
            }, LeftDom, RightDom, React.createElement("input", {
                type: "hidden",
                className: "transferId",
                value: loanTransfer.id
            })), React.createElement(DialogTemplate, {
                detail: this.state.dialogData,
                riskInfo: riskInfo,
                exceedRiskLimit: this.state.exceedRiskLimit,
                nodePayInfo: nodePayInfo,
                coupon: this.state.couponList,
                show: this.state.show
            }), CommonDialog, riskDialog)
        }
        ,
        LendHeader
    }(React.Component);
    module.exports = LendHeader
});
;/*!/client/widget/detail/loan/wdt-loan-info/wdt-loan-table.js*/
define("transfer:widget/detail/loan/wdt-loan-info/wdt-loan-table.js", function(require, exports, module) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    var $ = require("common:widget/lib/jquery/jquery")
      , utils = require("common:widget/ui/utils/utils")
      , Table = function() {
        function Table() {
            _classCallCheck(this, Table)
        }
        return Table.prototype.init = function(info) {
            var table = this.getTableData()
              , data = this.tableEach(table, info);
            return data
        }
        ,
        Table.prototype.tableEach = function(table, data) {
            var info = data.creditInfo
              , time = data.creditPassedTime
              , loan = data.loan
              , info2 = []
              , item = void 0
              , creditInfo = table.CREDITINFO_MAPPING
              , th = this;
            return $.each(creditInfo, function(i, v) {
                if (void 0 !== info[v.key] && "INVALID" != info[v.key] && "fieldAudit" != v.key) {
                    var _status = "checked"
                      , date = "--"
                      , job = th._jobType(loan.jobType);
                    if ("VALID" != info[v.key] && (_status = null),
                    v.key in time) {
                        var timeDate = time[v.key] ? new Date(time[v.key]) : "";
                        if (timeDate) {
                            var listDate = utils.formatDateAllTime(timeDate);
                            date = listDate[2]
                        }
                    }
                    item = {
                        key: v.key,
                        name: v.name,
                        status: _status,
                        date: date,
                        itemStyle: null
                    },
                    "ENTERPRISE" == data.borrowerCategory && "身份认证" == item.name && (item.name = "公司认证"),
                    "work" == v.key && null !== job && (item.note = job.name,
                    item.itemStyle = "two-line"),
                    info2.push(item)
                }
            }),
            this.allTypeData(loan, info2, time)
        }
        ,
        Table.prototype.allTypeData = function(loan, info2, time) {
            if ("1" == loan.isYm) {
                var date = "--";
                time.credit && (date = utils.formatDateAllTime(new Date(time.credit))[2]),
                info2 = [{
                    key: "identificationScanning",
                    name: "身份认证",
                    status: "checked",
                    date: date,
                    itemStyle: null
                }, {
                    key: "mobileAuth",
                    name: "手机实名认证",
                    status: "checked",
                    date: date,
                    itemStyle: null
                }]
            }
            if ("debx-zaxy" == loan.utmSource && info2.push({
                key: loan.utmSource,
                name: "机构担保",
                url: "/about/resources/zaxy",
                title: "深圳市中安信业创业投资有限公司",
                uname: "中安信业",
                itemStyle: "two-line",
                status: "checked",
                date: null
            }),
            "debx-zdsd" == loan.utmSource && info2.push({
                key: loan.utmSource,
                name: "机构担保",
                url: "/about/resources/zdsd",
                titile: "深圳市证大速贷小额贷款股份有限公司",
                uname: "证大速贷",
                itemStyle: "two-line",
                status: "checked",
                date: null
            }),
            "debx-as" == loan.utmSource && info2.push({
                key: loan.utmSource,
                name: "机构担保",
                url: "/about/resources/asjr",
                title: "深圳安盛互联网金融服务有限公司",
                uname: "安盛",
                itemStyle: "two-line",
                status: "checked",
                date: null
            }),
            "debx-yx" == loan.utmSource && info2.push({
                key: loan.utmSource,
                name: "实地认证",
                itemStyle: "two-line",
                status: "checked",
                date: null
            }),
            "debx-cf" == loan.utmSource && info2.push({
                key: loan.utmSource,
                name: "机构担保",
                url: "/about/resources/cfrz",
                title: "创富",
                uname: "创富",
                itemStyle: "two-line",
                status: "checked",
                date: null
            }),
            "debx-projectx" == loan.utmSource && info2.push({
                key: loan.utmSource,
                name: "机构担保",
                url: "/about/resources/asjr",
                title: "深圳安盛互联网金融服务有限公司",
                uname: "安盛",
                itemStyle: "two-line",
                status: "checked",
                date: null
            }),
            info2.length > 0) {
                var style = info2[info2.length - 1].itemStyle;
                style ? style += " last" : style = "last",
                info2[info2.length - 1].itemStyle = style
            }
            return $.each(info2, function(k, v) {
                k % 2 === 0 && (v.itemStyle2 = "dark")
            }),
            {
                creditInfo: info2
            }
        }
        ,
        Table.prototype._jobType = function(jobType) {
            return "工薪阶层" == jobType ? {
                name: "工薪阶层",
                anchor: "prod-work"
            } : "私营企业主" == jobType ? {
                name: "私营企业主",
                anchor: "prod-biz"
            } : "网商" == jobType || "网络商家" == jobType ? {
                name: "网商",
                anchor: "prod-ecomm"
            } : null
        }
        ,
        Table.prototype.getTableData = function() {
            var data = {
                CREDITINFO_MAPPING: [{
                    key: "credit",
                    name: "信用报告"
                }, {
                    key: "identificationScanning",
                    name: "身份认证"
                }, {
                    key: "graduation",
                    name: "学历认证"
                }, {
                    key: "work",
                    name: "工作认证"
                }, {
                    key: "titles",
                    name: "职称认证"
                }, {
                    key: "incomeDuty",
                    name: "收入认证"
                }, {
                    key: "house",
                    name: "房产认证"
                }, {
                    key: "car",
                    name: "车产认证"
                }, {
                    key: "marriage",
                    name: "婚姻认证"
                }, {
                    key: "residence",
                    name: "居住地证明"
                }, {
                    key: "fieldAudit",
                    name: "实地认证"
                }, {
                    key: "organization",
                    name: "机构担保"
                }, {
                    key: "video",
                    name: "视频认证"
                }, {
                    key: "mobileReceipt",
                    name: "手机认证"
                }, {
                    key: "mobileAuth",
                    name: "手机实名认证"
                }, {
                    key: "kaixin",
                    name: "微博认证"
                }, {
                    key: "other",
                    name: "其他认证"
                }],
                URL: {
                    userHome: "/user/profile/profile?userId=",
                    planDetails: "/uplan/product/detail?financePlanId=",
                    loanDetails: "/loan/",
                    loanApplication: "/borrow/borrow.action",
                    loanTransferDetails: "/transfer/",
                    userPlan: "/account/invest!planInfo.action?financeId=",
                    helpForBorrower: "/help/borrow/borrow!borrowProduct.action#",
                    autoinvestDeatils: "/autoinvestplan/"
                }
            };
            return data
        }
        ,
        Table
    }();
    module.exports = new Table
});
;/*!/client/widget/detail/loan/wdt-loan-info/wdt-loan-info.js*/
define("transfer:widget/detail/loan/wdt-loan-info/wdt-loan-info.js", function(require, exports, module) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    function _inherits(subClass, superClass) {
        if ("function" != typeof superClass && null !== superClass)
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    }
    var React = require("common:node_modules/react/react")
      , LoanTable = require("transfer:widget/detail/loan/wdt-loan-info/wdt-loan-table")
      , utils = require("common:widget/ui/utils/utils")
      , iconImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAABAxJREFUSA2tVk1sU0cQnlk3hDaBVkCRALUqRQRUsAlNheAAiENbhKBFxKlUjkjE4e+ABKUH1Et76AHBJSJxOHFoAWFTRAEBvaRUKPyKxgYJqESRECAhaEEJv/F70/kWr+2Y9+yUsIe3s7Mz3/dmd3Z2mYbQZrWlZvtCy0VoPhNNEpaJLGyE5B4z3yCSk2zoRKaj5Y9qcOof3mKJdFzI/0GJpoVbFWeY+DIZ3pbpWLFbf0SKM0UpkDC6Jv0h+fKTiMwtmhIx01UhvsYit4XJU8h3hbmRRKaW2qnhqXGRsYu7dy7qH6TXwRvliuiaAwvF99MKMhZz+kcPFWB7hGjPn8n4X+X2GDe2/fJBzve+UeNV6lerXvuCyGA7KEKQkef9pmtRYyeZd9W/Vf9tz47F/2BcrTW1pifkjN/U29lyOMy2QBhbf2iyP/D8HCLT9c9pVOuznc3JMMeh6metO9LAuSfiVsc4Rxl4/rNbxtdGtja9yBt4fCnnyx7NBxucJbTZmE8QjW7X64gMiZfz/IMaUI1uXFNs7cHVCM4SIvUx0LR+gD2DPJwGMvGlW7N4dAHH9zZA5lhr+mOf/At2QPRdtqvl+4LRKwiOTLfnPevOdJaE5kCOUGS+0arxpcONMO91sutnJlKfxDYdr3PjSn05ma5Y+5uRmrjz8Uk+MyhXUOBQu0xyBtFEeoEe8m7p6ztajTSILNsV33Bu5/KbCv7i/LIsNJo6k0CACuKIir1s0TNZpxm2oBJpGJnDYZLevPw+lnQiBihXzsD1PGrUV5q1JzEOI61GZn2J7lpMofGFc2gVZZ/Mts8fKemSMNKhkAFSs1UrI1aRPKPXjI1Mi7CNFBOlLYz0o3WHZiD1XTYiQbBnpb5Odti6fXf0TqNbmNB1bnAG5X0Qqck9Oz8UMoudv97AZTQ77aWJO68xkRp8zZQwF0iJz1i10EgLViEyzANTL2obDLiMpinKj20e0ddODupB+oxql6rjv/n5A2HL6PxLMcFlC2o0sf8KIrSlra5+SrXrqKH113G19HSzVqUtDjion7fx2Jj+R33XdSnfxjnPJlum2wuYyWzVerpfQ3+n/3H/j+rcGgTgdNe6lt1TuSIZbIEFMsjgeNHjqy2aSPW4JwUb0zbcGyPalk7oy6ET2HqsTmeT8XmQC+eQa0as1Jn7UGr2tcPByq/wsb6KYV0V02LnceweOszhPjHsnmEZRezdp+ADFIl8mu1Y8bvjGEQI5cuPKH6gG7Cj4iNKU99mo9BG5IEFR2TGNJeSQf8SIZR43+DJ4fYUOjRkmnsmYowKgoJR/m7FnmEZM+1f/A270hZI6Az+90NYfwjZmEk2pxxGeV+R0BkHPfUxhzqMcmUriB7q3s74RecT1v8H8hQOe8g/dgsAAAAASUVORK5CYII="
      , LoanInfo = function(_React$Component) {
        function LoanInfo(props) {
            _classCallCheck(this, LoanInfo),
            _React$Component.call(this, props),
            this.state = {}
        }
        return _inherits(LoanInfo, _React$Component),
        LoanInfo.prototype.getBorrowStatus = function(status) {
            return 1 == status ? "状态：民生银行暂未受理提现" : 2 == status ? "状态：民生银行已受理提现" : 3 == status ? "状态：已划付至指定收款方" : 4 == status ? "状态：暂未划付至指定收款方" : ""
        }
        ,
        LoanInfo.prototype.getBorrowerCategory = function(status) {
            var arr = [];
            switch (status) {
            case "PERSONAL":
                arr[0] = "承租人－个人",
                arr[1] = this.createPersonalHtml();
                break;
            case "ENTERPRISE":
                arr[0] = "承租人信息－公司",
                arr[1] = this.createEnterpriseHtml();
                break;
            default:
                arr[0] = "借贷人信息",
                arr[1] = this.createTransferHtml()
            }
            return arr
        }
        ,
        LoanInfo.prototype.createTransferHtml = function() {
            var info = this.props.info || {}
              , loan = info.loan || {}
              , borrower = (loan.pdlFlag,
            info.borrower || {})
              , userLoanRecord = info.userLoanRecord
              , isTransfer = this.props.isTransfer
              , loanIdDom = "";
            isTransfer && (loanIdDom = React.createElement("li", {
                className: "w26 li-p-b"
            }, React.createElement("span", {
                className: "pr20"
            }, "标的ID"), React.createElement("a", {
                target: "_blank",
                href: "/loan-" + loan.loanId + ".html"
            }, loan.loanId)));
            var age = borrower.birthDay ? this.birthDayChangeAge(borrower.birthDay) : ""
              , marriage = borrower.marriage ? this.getMarriage(borrower.marriage) : ""
              , nickName = loan.nickName || "";
            nickName = nickName.length > 34 ? nickName.slice(0, 34) + "..." : nickName;
            var result = React.createElement("div", {
                className: "loan-user-info"
            }, React.createElement("ul", null, loan.nickName ? React.createElement("li", {
                className: ""
            }, React.createElement("span", {
                className: "pr20"
            }, "昵称"), React.createElement("a", {
                target: "_blank",
                href: "/user/profile/profile?userId=" + loan.borrowerId
            }, nickName)) : "", loanIdDom, borrower.realName ? React.createElement("li", {
                className: ""
            }, React.createElement("span", {
                className: "pr20"
            }, "姓名"), React.createElement("em", {
                className: "other-color"
            }, borrower.realName)) : "", borrower.idNo ? React.createElement("li", {
                className: ""
            }, React.createElement("span", {
                className: "pr20"
            }, "身份证号"), React.createElement("em", {
                className: "other-color"
            }, borrower.idNo)) : "", borrower.gender ? React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "性别"), React.createElement("em", {
                className: "other-color"
            }, borrower.gender)) : "", borrower.mobile ? React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "手机号"), React.createElement("em", {
                className: "other-color"
            }, borrower.mobile)) : "", age ? React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "年龄"), React.createElement("em", {
                className: "other-color"
            }, age)) : "", borrower.graduation ? React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "学历"), React.createElement("em", {
                className: "other-color"
            }, borrower.graduation)) : "", marriage ? React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "婚姻"), React.createElement("em", {
                className: "other-color"
            }, marriage)) : "", borrower.salary ? React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "收入"), React.createElement("em", {
                className: "other-color"
            }, borrower.salary)) : "", borrower.hasHouse ? React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "房产"), React.createElement("em", {
                className: "other-color"
            }, 1 === borrower.hasHouse ? "有房产" : "无房产")) : "", null !== borrower.houseLoan ? React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "房贷"), React.createElement("em", {
                className: "other-color"
            }, borrower.houseLoan ? "有房贷" : "无房贷")) : "", borrower.hasCar ? React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "车产"), React.createElement("em", {
                className: "other-color"
            }, 1 === borrower.hasCar ? "有车产" : "无车产")) : "", null !== borrower.carLoan ? React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "车贷"), React.createElement("em", {
                className: "other-color"
            }, borrower.carLoan ? "有车贷" : "无车贷")) : "", borrower.officeDomain ? React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "公司行业"), React.createElement("em", {
                className: "other-color"
            }, borrower.officeDomain)) : "", borrower.officeScale ? React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "公司规模"), React.createElement("em", {
                className: "other-color"
            }, borrower.officeScale)) : "", borrower.position ? React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "岗位职位"), React.createElement("em", {
                className: "other-color"
            }, borrower.position)) : "", borrower.province && borrower.city ? React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "工作城市"), React.createElement("em", {
                className: "other-color"
            }, borrower.province + " " + borrower.city)) : "", borrower.workYears ? React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "工作时间"), React.createElement("em", {
                className: "other-color"
            }, borrower.workYears)) : "", void 0 !== info.hasOthDebt ? React.createElement("li", {
                className: "w-680"
            }, React.createElement("span", {
                className: "pr20"
            }, "其他负债"), React.createElement("em", {
                className: "other-color"
            }, info.hasOthDebt || "无")) : ""), React.createElement("div", {
                className: "ui-title"
            }, "信用信息"), React.createElement("ul", {
                className: "my-credit-info"
            }, React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "申请借款"), React.createElement("em", {
                className: "other-color"
            }, userLoanRecord.totalCount, "笔")), React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "信用额度"), React.createElement("span", {
                className: "other-color"
            }, utils.commaFloat(borrower.availableCredits), "元")), React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "逾期金额"), React.createElement("span", {
                className: "other-color"
            }, utils.commaFloat(userLoanRecord.overdueAmount), "元")), React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "成功借款"), React.createElement("span", {
                className: "other-color"
            }, userLoanRecord.successCount, "笔")), React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "借款总额"), React.createElement("span", {
                className: "other-color"
            }, utils.commaFloat(userLoanRecord.borrowAmount), "元")), React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "逾期次数"), React.createElement("span", {
                className: "other-color"
            }, userLoanRecord.overdueCount, "次")), React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "还清笔数"), React.createElement("span", {
                className: "other-color"
            }, userLoanRecord.alreadyPayCount, "笔")), React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "待还本息"), React.createElement("span", {
                className: "other-color"
            }, utils.commaFloat(userLoanRecord.notPayPrincipal + userLoanRecord.notPayInterest), "元")), React.createElement("li", null, React.createElement("span", {
                className: "pr20"
            }, "严重逾期"), React.createElement("span", {
                className: "other-color"
            }, userLoanRecord.failedCount, "笔"))));
            return result
        }
        ,
        LoanInfo.prototype.createTransferHtml1 = function() {
            var info = this.props.info
              , loan = info.loan
              , pdlFlag = loan.pdlFlag
              , borrower = info.borrower
              , userLoanRecord = info.userLoanRecord
              , hasOthDebt = info.hasOthDebt
              , hasOthDebtText = "无" == hasOthDebt ? "无信息" : hasOthDebt
              , re = [];
            "xxhb-rrjf" == loan.utmSource && "xxhb" == info.productRepayType ? 1 != loan.isYm && (re.push(React.createElement("ul", {
                key: "8"
            }, React.createElement("li", {
                className: "w100 li-line t-i-14"
            }, "培训信息"))),
            re.push(React.createElement("ul", {
                key: "9"
            }, React.createElement("li", {
                className: "w37 t-i-14"
            }, React.createElement("span", {
                className: "pr20"
            }, "培训院校"), React.createElement("span", {
                className: "other-color"
            }, loan.trainingInfo.college)), React.createElement("li", {
                className: "w37"
            }, React.createElement("span", {
                className: "pr20"
            }, "培训专业"), React.createElement("span", {
                className: "other-color"
            }, loan.trainingInfo.major))))) : (re.push(React.createElement("ul", {
                key: "8"
            }, React.createElement("li", {
                className: "w100 li-line t-i-14"
            }, "资产信息"))),
            pdlFlag ? re.push(React.createElement("ul", {
                key: "9"
            }, React.createElement("li", {
                className: "w37 t-i-14  "
            }, React.createElement("span", {
                className: "pr20"
            }, "收入"), React.createElement("span", {
                className: "other-color"
            }, "" != borrower.salary ? borrower.salary : "--")), React.createElement("li", {
                className: "w37  "
            }, React.createElement("span", {
                className: "pr20"
            }, "房产"), React.createElement("span", {
                className: "other-color"
            }, borrower.hasHouse ? "有房产" : "无房产")))) : (re.push(React.createElement("ul", {
                key: "9"
            }, React.createElement("li", {
                className: "w37 t-i-14 li-p-b"
            }, React.createElement("span", {
                className: "pr20"
            }, "收入"), React.createElement("span", {
                className: "other-color"
            }, "" != borrower.salary ? borrower.salary : "--")), React.createElement("li", {
                className: "w37 li-p-b"
            }, React.createElement("span", {
                className: "pr20"
            }, "房产"), React.createElement("span", {
                className: "other-color"
            }, borrower.hasHouse ? "有房产" : "无房产")), React.createElement("li", {
                className: "w26 li-p-b"
            }, React.createElement("span", {
                className: "pr20"
            }, "房贷"), React.createElement("span", {
                className: "other-color"
            }, borrower.houseLoan ? "有房贷" : "无房贷")))),
            re.push(React.createElement("ul", {
                key: "10"
            }, React.createElement("li", {
                className: "w37 t-i-14 li-p-t"
            }, React.createElement("span", {
                className: "pr20"
            }, "车产"), React.createElement("span", {
                className: "other-color"
            }, borrower.hasCar ? "有车产" : "无车产")), React.createElement("li", {
                className: "w37 li-p-t"
            }, React.createElement("span", {
                className: "pr20"
            }, "车贷"), React.createElement("span", {
                className: "other-color"
            }, borrower.carLoan ? "有车贷" : "无车贷")), React.createElement("li", {
                className: "w26 li-p-t-other"
            }, React.createElement("span", {
                className: "pr20"
            }, "其他"), React.createElement("span", {
                className: "other-color other-info"
            }, hasOthDebtText || "无"))))),
            re.push(React.createElement("ul", {
                key: "11"
            }, React.createElement("li", {
                className: "w100 li-line t-i-14"
            }, "工作信息"))),
            pdlFlag ? re.push(React.createElement("ul", {
                key: "12"
            }, React.createElement("li", {
                className: "w37 t-i-14 "
            }, React.createElement("span", {
                className: "pr20"
            }, "公司行业"), React.createElement("span", {
                className: "other-color"
            }, "" != borrower.officeDomain ? borrower.officeDomain : "--")), React.createElement("li", {
                className: "w37 "
            }, React.createElement("span", {
                className: "pr20"
            }, "工作城市"), React.createElement("span", {
                className: "other-color"
            }, "" != borrower.province ? borrower.province : "--", " ", borrower.city)), React.createElement("li", {
                className: "w26 "
            }, React.createElement("span", {
                className: "pr20"
            }, "岗位职位"), React.createElement("span", {
                className: "other-color"
            }, "" != borrower.position ? borrower.position : "--")))) : (re.push(React.createElement("ul", {
                key: "12"
            }, React.createElement("li", {
                className: "w37 t-i-14 li-p-b"
            }, React.createElement("span", {
                className: "pr20"
            }, "公司行业"), React.createElement("span", {
                className: "other-color"
            }, "" != borrower.officeDomain ? borrower.officeDomain : "--")), React.createElement("li", {
                className: "w37 li-p-b"
            }, React.createElement("span", {
                className: "pr20"
            }, "公司规模"), React.createElement("span", {
                className: "other-color"
            }, "" != borrower.officeScale ? borrower.officeScale : "--")), React.createElement("li", {
                className: "w26 li-p-b"
            }, React.createElement("span", {
                className: "pr20"
            }, "岗位职位"), React.createElement("span", {
                className: "other-color"
            }, "" != borrower.position ? borrower.position : "--")))),
            re.push(React.createElement("ul", {
                key: "13"
            }, React.createElement("li", {
                className: "w37 t-i-14 li-p-t"
            }, React.createElement("span", {
                className: "pr20"
            }, "工作城市"), React.createElement("span", {
                className: "other-color"
            }, "" != borrower.province ? borrower.province : "--", " ", borrower.city)), React.createElement("li", {
                className: "w37 li-p-t"
            }, React.createElement("span", {
                className: "pr20"
            }, "工作时间"), React.createElement("span", {
                className: "other-color"
            }, "" != borrower.workYears ? borrower.workYears : "--"))))));
            var marriage = this.getMarriage(borrower.marriage)
              , isTransfer = this.props.isTransfer
              , loanIdDom = ""
              , realNameClassName = "w26 li-p-b"
              , idNoClassName = "w37 t-i-14 li-p-t";
            isTransfer && (loanIdDom = React.createElement("li", {
                className: "w26 li-p-b"
            }, React.createElement("span", {
                className: "pr20"
            }, "标的ID"), React.createElement("a", {
                target: "_blank",
                href: "/loan-" + loan.loanId + ".html"
            }, loan.loanId)),
            realNameClassName = "w37 t-i-14  li-p-t ",
            idNoClassName = "w37 li-p-t ");
            var age = this.birthDayChangeAge(borrower.birthDay)
              , result = React.createElement("div", {
                className: "borrower-info"
            }, React.createElement("ul", {
                key: "1"
            }, React.createElement("li", {
                className: "w37 t-i-14 li-p-b"
            }, React.createElement("span", {
                className: "pr20"
            }, "昵称"), React.createElement("a", {
                target: "_blank",
                href: "/user/profile/profile?userId=" + loan.borrowerId
            }, loan.nickName)), React.createElement("li", {
                className: "w37 li-p-b"
            }, React.createElement("span", {
                className: "pr20"
            }, "信用评级"), React.createElement("em", {
                className: "credit-point",
                title: "信用分数：" + (borrower.sumCreditPoint > 0 ? borrower.sumCreditPoint : "0")
            }, React.createElement("i", null, borrower.creditLevel))), loanIdDom, React.createElement("li", {
                className: realNameClassName
            }, React.createElement("span", {
                className: "pr20"
            }, "姓名"), React.createElement("span", {
                className: "other-color"
            }, borrower.realName)), React.createElement("li", {
                className: idNoClassName
            }, React.createElement("span", {
                className: "pr20"
            }, "身份证号"), React.createElement("em", {
                className: "other-color"
            }, borrower.idNo))), React.createElement("ul", {
                key: "2"
            }, React.createElement("li", {
                className: "w100 li-line t-i-14"
            }, "基础信息")), React.createElement("ul", {
                key: "3"
            }, React.createElement("li", {
                className: "w37 t-i-14"
            }, React.createElement("span", {
                className: "pr20"
            }, "年龄"), React.createElement("span", {
                className: "other-color"
            }, age)), pdlFlag ? null : React.createElement("li", {
                className: "w37"
            }, React.createElement("span", {
                className: "pr20"
            }, "学历"), React.createElement("span", {
                className: "other-color"
            }, "" != borrower.graduation ? borrower.graduation : "--")), React.createElement("li", {
                className: "w26"
            }, React.createElement("span", {
                className: "pr20"
            }, "婚姻"), React.createElement("span", {
                className: "other-color"
            }, marriage ? marriage : "--"))), React.createElement("ul", {
                key: "4"
            }, React.createElement("li", {
                className: "w100 li-line t-i-14"
            }, "信用信息")), React.createElement("ul", {
                key: "5"
            }, React.createElement("li", {
                className: "w37 t-i-14 li-p-b"
            }, React.createElement("span", {
                className: "pr20"
            }, "申请借款"), React.createElement("span", {
                className: "other-color"
            }, userLoanRecord.totalCount, "笔")), React.createElement("li", {
                className: "w37 li-p-b"
            }, React.createElement("span", {
                className: "pr20"
            }, "信用额度"), React.createElement("span", {
                className: "other-color"
            }, utils.commaFloat(borrower.availableCredits), "元")), React.createElement("li", {
                className: "w26 li-p-b"
            }, React.createElement("span", {
                className: "pr20"
            }, "逾期金额"), React.createElement("span", {
                className: "other-color"
            }, utils.commaFloat(userLoanRecord.overdueAmount), "元"))), React.createElement("ul", {
                key: "6"
            }, React.createElement("li", {
                className: "w37 t-i-14 li-p-t li-p-b"
            }, React.createElement("span", {
                className: "pr20"
            }, "成功借款"), React.createElement("span", {
                className: "other-color"
            }, userLoanRecord.successCount, "笔")), React.createElement("li", {
                className: "w37 li-p-t li-p-b"
            }, React.createElement("span", {
                className: "pr20"
            }, "借款总额"), React.createElement("span", {
                className: "other-color"
            }, utils.commaFloat(userLoanRecord.borrowAmount), "元")), React.createElement("li", {
                className: "w26 li-p-t li-p-b"
            }, React.createElement("span", {
                className: "pr20"
            }, "逾期次数"), React.createElement("span", {
                className: "other-color"
            }, userLoanRecord.overdueCount, "次"))), React.createElement("ul", {
                key: "7"
            }, React.createElement("li", {
                className: "w37 t-i-14 li-p-t"
            }, React.createElement("span", {
                className: "pr20"
            }, "还清笔数"), React.createElement("span", {
                className: "other-color"
            }, userLoanRecord.alreadyPayCount, "笔")), React.createElement("li", {
                className: "w37 li-p-t"
            }, React.createElement("span", {
                className: "pr20"
            }, "待还本息"), React.createElement("span", {
                className: "other-color"
            }, utils.commaFloat(userLoanRecord.notPayPrincipal + userLoanRecord.notPayInterest), "元")), React.createElement("li", {
                className: "w26 li-p-t"
            }, React.createElement("span", {
                className: "pr20"
            }, "严重逾期"), React.createElement("span", {
                className: "other-color"
            }, userLoanRecord.failedCount, "笔"))), re);
            return result
        }
        ,
        LoanInfo.prototype.birthDayChangeAge = function(birthDay) {
            var age = "";
            if (birthDay) {
                var date = new Date
                  , nowYear = date.getFullYear()
                  , nowMonth = parseInt(date.getMonth()) + 1
                  , nowDay = date.getDate()
                  , birthArr = birthDay.split("-")
                  , year = birthArr[0]
                  , month = birthArr[1]
                  , day = birthArr[2];
                age = nowYear - year,
                month >= nowMonth && (nowMonth == month ? day > nowDay && age-- : age--)
            }
            return age
        }
        ,
        LoanInfo.prototype.getMarriage = function(status) {
            var marr = "";
            switch (status) {
            case "MARRIED":
                marr = "已婚";
                break;
            case "UNMARRIED":
                marr = "未婚";
                break;
            case "DIVORCED":
                marr = "离异";
                break;
            case "WIDOWED":
                marr = "丧偶"
            }
            return marr
        }
        ,
        LoanInfo.prototype.createEnterpriseHtml = function() {
            var info = this.props.info
              , borrowerJsonVo = info.borrowerJsonVo
              , result = React.createElement("div", {
                className: "borrower-info"
            }, React.createElement("ul", null, React.createElement("li", {
                className: "w37 t-i-14"
            }, React.createElement("span", {
                className: "pr20"
            }, "公司名称"), React.createElement("span", {
                className: "other-color"
            }, "" != borrowerJsonVo.office ? borrowerJsonVo.office : "--")), React.createElement("li", {
                className: "w37"
            }, React.createElement("span", {
                className: "pr20"
            }, "公司行业"), React.createElement("span", {
                className: "other-color"
            }, "" != borrowerJsonVo.officeDomain ? borrowerJsonVo.officeDomain : "--"))), React.createElement("ul", null, React.createElement("li", {
                className: "w37 t-i-14"
            }, React.createElement("span", {
                className: "pr20"
            }, "法人代表"), React.createElement("span", {
                className: "other-color"
            }, "" != borrowerJsonVo.corporation ? borrowerJsonVo.corporation : "--")), React.createElement("li", {
                className: "w37"
            }, React.createElement("span", {
                className: "pr20"
            }, "注册城市"), React.createElement("span", {
                className: "other-color"
            }, "" != borrowerJsonVo.officeProvince ? borrowerJsonVo.officeProvince : "--", borrowerJsonVo.officeCity))), React.createElement("ul", null, React.createElement("li", {
                className: "w37 t-i-14"
            }, React.createElement("span", {
                className: "pr20"
            }, "注册资金"), React.createElement("span", {
                className: "other-color"
            }, "" != borrowerJsonVo.registeredCapital ? borrowerJsonVo.registeredCapital : "--")), React.createElement("li", {
                className: "w37"
            }, React.createElement("span", {
                className: "pr20"
            }, "注册时间"), React.createElement("span", {
                className: "other-color"
            }, "" != borrowerJsonVo.registrationDate ? borrowerJsonVo.registrationDate : "--"))));
            return result
        }
        ,
        LoanInfo.prototype.createPersonalHtml = function() {
            var info = this.props.info
              , borrower = info.borrowerJsonVo
              , loanExtInfo = info.loanExtInfo
              , age = this.getAge(loanExtInfo.idNo)
              , result = React.createElement("div", {
                className: "borrower-info"
            }, React.createElement("ul", null, React.createElement("li", {
                className: "w37 t-i-14"
            }, React.createElement("span", {
                className: "pr20"
            }, "姓名"), React.createElement("span", {
                className: "other-color"
            }, loanExtInfo.realName, '（borrower.gender == "男"）}')), React.createElement("li", {
                className: "w37"
            }, React.createElement("span", {
                className: "pr20"
            }, "工作职位"), React.createElement("span", {
                className: "other-color"
            }, "" != borrower.position ? borrower.position : "--"))), React.createElement("ul", null, React.createElement("li", {
                className: "w37 t-i-14"
            }, React.createElement("span", {
                className: "pr20"
            }, "年龄"), React.createElement("span", {
                className: "other-color"
            }, age)), React.createElement("li", {
                className: "w37"
            }, React.createElement("span", {
                className: "pr20"
            }, "工作城市"), React.createElement("span", {
                className: "other-color"
            }, "" != borrower.workProvince ? borrower.workProvince : "--", borrower.workCity))), React.createElement("ul", null, React.createElement("li", {
                className: "w37 t-i-14"
            }, React.createElement("span", {
                className: "pr20"
            }, "学历"), React.createElement("span", {
                className: "other-color"
            }, "" != borrower.graduation ? borrower.graduation : "--")), React.createElement("li", {
                className: "w37"
            }, React.createElement("span", {
                className: "pr20"
            }, "房产"), React.createElement("span", {
                className: "other-color"
            }, "有" == borrower.hasHouse ? "有" : "无"))), React.createElement("ul", null, React.createElement("li", {
                className: "w37 t-i-14"
            }, React.createElement("span", {
                className: "pr20"
            }, "婚姻"), React.createElement("span", {
                className: "other-color"
            }, borrower.marriageStatus)), React.createElement("li", {
                className: "w37"
            }, React.createElement("span", {
                className: "pr20"
            }, "房贷"), React.createElement("span", {
                className: "other-color"
            }, "有" == borrower.houseLoan ? "有" : "无"))));
            return result
        }
        ,
        LoanInfo.prototype.createTable = function(table) {
            var tableData = table.creditInfo
              , arr = [];
            return tableData.forEach(function(index, i) {
                var uname = index.uname
                  , note = index.note
                  , status = index.status
                  , td = "";
                td = uname ? React.createElement("td", null, index.name, "（", React.createElement("a", {
                    href: index.url,
                    title: index.title
                }, uname), "）") : note ? React.createElement("td", null, index.name, "（", note, "）") : React.createElement("td", null, index.name);
                var complete = React.createElement("td", {
                    className: "green-color"
                });
                status && (complete = React.createElement("td", {
                    className: "green-color"
                }, "已完成")),
                arr.push(React.createElement("tr", {
                    key: i
                }, td, complete, React.createElement("td", null, index.date ? index.date : "--")))
            }),
            arr
        }
        ,
        LoanInfo.prototype.createCheckStatus = function() {
            var info = this.props.info || {}
              , borrower = info.borrower
              , _borrower$auditItems = borrower.auditItems
              , auditItems = void 0 === _borrower$auditItems ? "" : _borrower$auditItems
              , html = "";
            if (auditItems) {
                var auditItemsArr = auditItems.split("|");
                html = auditItemsArr.map(function(index, i) {
                    return React.createElement("div", {
                        className: "one-item",
                        key: i
                    }, React.createElement("span", null, index), React.createElement("em", null, React.createElement("img", {
                        src: iconImg
                    })))
                })
            } else {
                var tableData = LoanTable.init(info)
                  , tableHtml = this.createTable(tableData);
                html = React.createElement("table", {
                    className: "borrower-table"
                }, React.createElement("thead", null, React.createElement("tr", {
                    className: "other-color"
                }, React.createElement("td", null, "审核项目"), React.createElement("td", null, "状态"), React.createElement("td", {
                    width: "346px"
                }, "通过日期"))), React.createElement("tbody", null, tableHtml))
            }
            return html
        }
        ,
        LoanInfo.prototype.render = function() {
            var info = this.props.info
              , isLogin = this.props.isLogin
              , borrowerCategory = this.getBorrowerCategory(info.loanExtInfo.borrowerCategory)
              , borrowStatus = this.getBorrowStatus(info.borrowStatus)
              , infoData = "";
            infoData = isLogin ? borrowerCategory[1] : React.createElement("div", {
                className: "no-login"
            }, "请", React.createElement("a", {
                href: "/login"
            }, " 登录 "), "或", React.createElement("a", {
                href: "/passport/index/register"
            }, " 注册 "), " 后查看");
            var guaranteeMode = (info.loan,
            this.props.guaranteeMode)
              , guaranteeModeText = "";
            guaranteeModeText = 1 == guaranteeMode ? React.createElement("i", null, "用户利益保障机制") : 2 == guaranteeMode ? React.createElement("a", {
                className: "agreement-address",
                href: "/agreement/contract/currency/name/user.deposit_zhonghe",
                target: "_blank"
            }, "风险保障计划") : 3 == guaranteeMode ? React.createElement("a", {
                className: "agreement-address",
                href: "/agreement/contract/currency/name/user.deposit_jicheng",
                target: "_blank"
            }, "风险保障计划") : React.createElement("i", null, "暂无");
            var checkStatus = this.createCheckStatus();
            return React.createElement("div", {
                className: "wdt-info"
            }, React.createElement("div", {
                className: "wdt-info-title"
            }, borrowerCategory[0]), infoData, React.createElement("div", {
                className: "audit-status"
            }, React.createElement("div", {
                className: "status-title check-title"
            }, "审核状态"), React.createElement("div", {
                className: "check-status"
            }, checkStatus), React.createElement("div", {
                className: "list-desc"
            }, "1.人人贷及其合作机构将始终秉持客观公正的原则，严控风险，最大程度的尽力确保借款人信息的真实性，但不保证审核信息100%无误，亦不保证借款人能够按期偿还借款金额。"), React.createElement("div", {
                className: "list-desc"
            }, "2.人人贷仅为信息发布平台，未以任何明示或暗示的方式对出借人提供担保或承诺保本保息，出借人应根据自身的投资偏好和风险承受能力进行独立判断和作出决策，并自行承担资金出借的风险与责任，包括但不限于可能的本息损失。网贷有风险，出借需谨慎。")), React.createElement("div", {
                className: "audit-status"
            }, React.createElement("div", {
                className: "status-title"
            }, "资金运用情况"), React.createElement("div", {
                className: "list-desc"
            }, borrowStatus)), React.createElement("div", {
                className: "audit-status"
            }, React.createElement("div", {
                className: "status-title"
            }, "借款描述"), React.createElement("div", {
                className: "list-desc"
            }, info.loan.description)), React.createElement("div", {
                className: "audit-status"
            }, React.createElement("div", {
                className: "status-title"
            }, "其他相关信息"), React.createElement("ul", {
                className: "add-borrower-info"
            }, React.createElement("li", null, React.createElement("span", null, "借款人经营及财务状况："), React.createElement("i", null, info.manageFinanceInfo || "良好")), React.createElement("li", null, React.createElement("span", null, "借款人还款能力变化："), React.createElement("i", null, info.repayAbilityInfo || "暂无变化")), React.createElement("li", null, React.createElement("span", null, "借款人涉诉及受行政处罚情况："), React.createElement("i", {
                className: "punish-info"
            }, info.complaintPunishInfo || "暂无信息")), React.createElement("li", null, React.createElement("span", null, "还款保障措施："), guaranteeModeText))))
        }
        ,
        LoanInfo.prototype.getAge = function(idCard) {
            var birthday = idCard.substring(6, 14)
              , year = birthday.substring(0, 4)
              , month = birthday.substring(4, 6)
              , day = birthday.substring(6, 8)
              , nowDate = new Date
              , nowmonth = nowDate.getMonth() + 1
              , nowday = nowDate.getDate()
              , age = nowDate.getFullYear() - year;
            return (nowmonth > month || month == nowmonth && nowday >= day) && age++,
            age
        }
        ,
        LoanInfo
    }(React.Component);
    module.exports = LoanInfo
});
;/*!/client/widget/detail/loan/wdt-loan-investment/wdt-loan-investment.js*/
define("transfer:widget/detail/loan/wdt-loan-investment/wdt-loan-investment.js", function(require, exports, module) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    function _inherits(subClass, superClass) {
        if ("function" != typeof superClass && null !== superClass)
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    }
    var React = require("common:node_modules/react/react")
      , utils = require("common:widget/ui/utils/utils")
      , LoanInvestment = function(_React$Component) {
        function LoanInvestment(props) {
            _classCallCheck(this, LoanInvestment),
            _React$Component.call(this, props),
            this.state = {}
        }
        return _inherits(LoanInvestment, _React$Component),
        LoanInvestment.prototype.createData = function() {
            var tabData = this.props.tabData
              , list = tabData ? tabData.list : []
              , result = [];
            return list.map(function(index, i) {
                var num = parseInt(++i)
                  , time = new Date(parseInt(index.lendTime))
                  , lendTime = utils.formatDateAllTime(time);
                result.push(React.createElement("tr", {
                    key: num
                }, React.createElement("td", null, num), React.createElement("td", null, index.userNickName), React.createElement("td", null, utils.commaFloat(index.amount) || "0.00", "元"), React.createElement("td", null, lendTime[4])))
            }),
            result
        }
        ,
        LoanInvestment.prototype.render = function() {
            var tabData = this.props.tabData
              , investment = this.createData()
              , amount = utils.commaFloat(tabData.amount) || "0.00"
              , noData = React.createElement("p", {
                className: "loan-no-data"
            }, "暂无数据");
            return tabData && tabData.list.length > 0 && (noData = React.createElement("table", null, React.createElement("thead", null, React.createElement("tr", null, React.createElement("td", null, "序号"), React.createElement("td", null, "投标人"), React.createElement("td", null, "投标金额"), React.createElement("td", null, "投标时间"))), React.createElement("tbody", null, investment))),
            React.createElement("div", {
                className: "loan-investment"
            }, React.createElement("div", {
                className: "invest-total"
            }, React.createElement("span", null, "加入人次 ", tabData.joinCount || 0, "人，出借总额 ", amount, "元")), React.createElement("div", {
                className: "loan-list-table"
            }, noData))
        }
        ,
        LoanInvestment
    }(React.Component);
    module.exports = LoanInvestment
});
;/*!/client/widget/detail/loan/wdt-loan-transferred/wdt-loan-transferred.js*/
define("transfer:widget/detail/loan/wdt-loan-transferred/wdt-loan-transferred.js", function(require, exports, module) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    function _inherits(subClass, superClass) {
        if ("function" != typeof superClass && null !== superClass)
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    }
    var React = require("common:node_modules/react/react")
      , utils = require("common:widget/ui/utils/utils")
      , LoanTransferred = function(_React$Component) {
        function LoanTransferred(props) {
            _classCallCheck(this, LoanTransferred),
            _React$Component.call(this, props)
        }
        return _inherits(LoanTransferred, _React$Component),
        LoanTransferred.prototype.createData = function() {
            var tabData = this.props.tabData
              , list = tabData ? tabData.list : []
              , result = [];
            return list.map(function(index, i) {
                var num = parseInt(++i)
                  , time = new Date(parseInt(index.repayTime))
                  , repayTime = index.repayTime ? utils.formatDateAllTime(time) : ""
                  , listDataTime = index.actualRepayTime
                  , actualTime = new Date(parseInt(listDataTime))
                  , actualRepayTime = listDataTime ? utils.formatDateAllTime(actualTime)[4] : "--"
                  , allFee = utils.commaFloat(index.unRepaidFee + index.repaidFee);
                result.push(React.createElement("tr", {
                    key: num
                }, React.createElement("td", null, repayTime[3]), React.createElement("td", null, index.repayType), React.createElement("td", null, utils.commaFloat(index.unRepaidAmount) || "0.00", "元"), React.createElement("td", null, allFee || "0.00", "元"), React.createElement("td", null, actualRepayTime)))
            }),
            result
        }
        ,
        LoanTransferred.prototype.render = function() {
            var tabData = this.props.tabData
              , transferred = this.createData()
              , repaid = utils.commaFloat(tabData.repaid)
              , unRepaid = utils.commaFloat(tabData.unRepaid)
              , noData = React.createElement("p", {
                className: "loan-no-data"
            }, "暂无数据");
            return tabData && tabData.list.length > 0 && (noData = React.createElement("table", null, React.createElement("thead", null, React.createElement("tr", null, React.createElement("td", null, "合约还款日期"), React.createElement("td", null, "状态"), React.createElement("td", null, "应还本息"), React.createElement("td", null, "应付罚息"), React.createElement("td", null, "实际还款日期"))), React.createElement("tbody", null, transferred))),
            React.createElement("div", {
                className: "loan-investment"
            }, React.createElement("div", {
                className: "invest-total"
            }, React.createElement("span", null, "已还本息 ", repaid || "0.00", " 元，待还本息 ", unRepaid || "0.00", " 元")), React.createElement("div", {
                className: "loan-list-table"
            }, noData))
        }
        ,
        LoanTransferred
    }(React.Component);
    module.exports = LoanTransferred
});
;/*!/client/widget/detail/loan/wdt-loan-transfer/wdt-loan-transfer.js*/
define("transfer:widget/detail/loan/wdt-loan-transfer/wdt-loan-transfer.js", function(require, exports, module) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    function _inherits(subClass, superClass) {
        if ("function" != typeof superClass && null !== superClass)
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    }
    var React = require("common:node_modules/react/react")
      , utils = require("common:widget/ui/utils/utils")
      , LoanTransfer = function(_React$Component) {
        function LoanTransfer(props) {
            _classCallCheck(this, LoanTransfer),
            _React$Component.call(this, props),
            this.state = {}
        }
        return _inherits(LoanTransfer, _React$Component),
        LoanTransfer.prototype.createData = function() {
            var tabData = this.props.tabData
              , pdlFlag = this.props.pdlFlag
              , list = tabData ? tabData.list : []
              , result = [];
            return list.map(function(index, i) {
                {
                    var num = parseInt(++i);
                    pdlFlag ? React.createElement("td", null, "--") : React.createElement("td", null, index.share, "份")
                }
                result.push(React.createElement("tr", {
                    key: num
                }, React.createElement("td", null, num), React.createElement("td", null, index.nickName), React.createElement("td", null, utils.commaFloat(index.leftAmount) || "0.00", "元")))
            }),
            result
        }
        ,
        LoanTransfer.prototype.render = function() {
            var tabData = this.props.tabData
              , transferred = this.createData()
              , noData = React.createElement("p", {
                className: "loan-no-data"
            }, "暂无数据");
            return tabData && tabData.list.length > 0 && (noData = React.createElement("table", null, React.createElement("thead", null, React.createElement("tr", null, React.createElement("td", null, "序号"), React.createElement("td", null, "债权人"), React.createElement("td", null, "待收本金"))), React.createElement("tbody", null, transferred))),
            React.createElement("div", {
                className: "loan-investment"
            }, React.createElement("div", {
                className: "invest-total"
            }, React.createElement("span", null, "持有债权人数 ", tabData.count || 0, " 人")), React.createElement("div", {
                className: "loan-list-table"
            }, noData))
        }
        ,
        LoanTransfer
    }(React.Component);
    module.exports = LoanTransfer
});
;/*!/client/widget/detail/loan/wdt-loan-repayment/wdt-loan-repayment.js*/
define("transfer:widget/detail/loan/wdt-loan-repayment/wdt-loan-repayment.js", function(require, exports, module) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    function _inherits(subClass, superClass) {
        if ("function" != typeof superClass && null !== superClass)
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    }
    var React = require("common:node_modules/react/react")
      , utils = require("common:widget/ui/utils/utils")
      , LoanRepayment = function(_React$Component) {
        function LoanRepayment(props) {
            _classCallCheck(this, LoanRepayment),
            _React$Component.call(this, props),
            this.state = {}
        }
        return _inherits(LoanRepayment, _React$Component),
        LoanRepayment.prototype.createData = function() {
            var tabData = this.props.tabData
              , pdlFlag = this.props.pdlFlag
              , list = tabData ? tabData.list : []
              , result = [];
            return list.map(function(index, i) {
                var num = parseInt(++i)
                  , time = new Date(parseInt(index.createTime))
                  , createTime = utils.formatDateAllTime(time)
                  , sharesDom = pdlFlag ? React.createElement("td", null, utils.commaFloat(index.price) || "0.00", "元") : React.createElement("td", null, utils.commaFloat(index.price) || "0.00", "元");
                result.push(React.createElement("tr", {
                    key: num
                }, React.createElement("td", null, index.toUserId), React.createElement("td", null, index.fromUserId), sharesDom, React.createElement("td", null, createTime[4])))
            }),
            result
        }
        ,
        LoanRepayment.prototype.render = function() {
            var tabData = this.props.tabData
              , transferred = this.createData()
              , account = utils.commaFloat(tabData.account || 0)
              , noAccount = utils.commaFloat(tabData.noAccount || 0)
              , noData = React.createElement("p", {
                className: "loan-no-data"
            }, "暂无数据");
            return tabData && tabData.list.length > 0 && (noData = React.createElement("table", null, React.createElement("thead", null, React.createElement("tr", null, React.createElement("td", null, "债权买入者"), React.createElement("td", null, "债权卖出者"), React.createElement("td", null, "交易金额"), React.createElement("td", null, "交易时间"))), React.createElement("tbody", null, transferred))),
            React.createElement("div", {
                className: "loan-investment"
            }, React.createElement("div", {
                className: "invest-total"
            }, React.createElement("span", null, "已交易总额 ", account || "0.00", "元 待交易总额 ", noAccount || "0.00", "元")), React.createElement("div", {
                className: "loan-list-table"
            }, noData))
        }
        ,
        LoanRepayment
    }(React.Component);
    module.exports = LoanRepayment
});
;/*!/client/widget/detail/lend/lend-detail-tab/lend-detail-tab.js*/
define("transfer:widget/detail/lend/lend-detail-tab/lend-detail-tab.js", function(require, exports, module) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    function _inherits(subClass, superClass) {
        if ("function" != typeof superClass && null !== superClass)
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    }
    var React = require("common:node_modules/react/react")
      , $ = require("common:widget/lib/jquery/jquery")
      , utils = require("common:widget/ui/utils/utils")
      , LoanInfo = require("transfer:widget/detail/loan/wdt-loan-info/wdt-loan-info")
      , LoanInvestment = require("transfer:widget/detail/loan/wdt-loan-investment/wdt-loan-investment")
      , LoanTransferred = require("transfer:widget/detail/loan/wdt-loan-transferred/wdt-loan-transferred")
      , LoanTransfer = require("transfer:widget/detail/loan/wdt-loan-transfer/wdt-loan-transfer")
      , LoanRepayment = require("transfer:widget/detail/loan/wdt-loan-repayment/wdt-loan-repayment")
      , LendTab = function(_React$Component) {
        function LendTab(props) {
            _classCallCheck(this, LendTab),
            _React$Component.call(this, props),
            this.state = {
                isTransfer: this.props.isTransfer || "",
                index: "lend-one",
                info: this.props.info || "",
                investment: "",
                transferred: "",
                transfer: "",
                repayment: ""
            }
        }
        return _inherits(LendTab, _React$Component),
        LendTab.prototype.componentDidMount = function() {}
        ,
        LendTab.prototype.isLoanShow = function() {
            var isShow = !0
              , state = this.state
              , isTransfer = state.isTransfer
              , info = state.info
              , loan = info ? info.loan : {}
              , opStatus = utils.loanAllType(loan.status);
            return isShow = isTransfer || "OPEN" != opStatus && "READY" != opStatus && "UNKNOWN" != opStatus
        }
        ,
        LendTab.prototype.switchTab = function(num) {
            var th = this;
            if (this.setState({
                index: num
            }),
            this.props.isLogin)
                switch (num) {
                case "lend-two":
                    var investment = th.state.investment;
                    investment || this.getLendTabData("investment");
                    break;
                case "lend-four":
                    var transfer = th.state.transfer;
                    transfer || this.getLendTabData("transfer");
                    break;
                case "lend-five":
                    var repayment = th.state.repayment;
                    repayment || this.getLendTabData("repayment")
                }
            if ("lend-thr" == num) {
                var transferred = th.state.transferred;
                transferred || this.getLendTabData("transferred")
            }
        }
        ,
        LendTab.prototype.getLendTabData = function(tab) {
            var url = "/transfer/detail/loanInvestment"
              , stateData = {};
            switch (tab) {
            case "investment":
                url = "/transfer/detail/loanInvestment";
                break;
            case "transferred":
                url = "/transfer/detail/loanTransferred";
                break;
            case "transfer":
                url = "/transfer/detail/loanTransfer";
                break;
            case "repayment":
                url = "/transfer/detail/loanRepayment"
            }
            var loanId = this.props.loanId
              , th = this;
            $.ajax({
                type: "get",
                url: url,
                dataType: "json",
                data: {
                    loanId: loanId
                },
                success: function(data) {
                    if (0 == data.status) {
                        switch (tab) {
                        case "investment":
                            stateData.investment = data.data;
                            break;
                        case "transferred":
                            stateData.transferred = data.data;
                            break;
                        case "transfer":
                            stateData.transfer = data.data;
                            break;
                        case "repayment":
                            stateData.repayment = data.data
                        }
                        th.setState(stateData)
                    }
                }
            })
        }
        ,
        LendTab.prototype.render = function() {
            var isItem5 = this.isLoanShow()
              , index = this.state.index
              , tabName = isItem5 ? "len-tab-item5" : "len-tab-item2"
              , isLogin = this.props.isLogin
              , isTransfer = this.props.isTransfer
              , guaranteeMode = this.props.guaranteeMode
              , loan = this.props.info.loan
              , pdlFlag = loan.pdlFlag
              , html = React.createElement("div", {
                className: "no-login"
            }, "请", React.createElement("a", {
                href: "/login"
            }, " 登录 "), "或", React.createElement("a", {
                href: "/passport/index/register"
            }, " 注册 "), " 后查看")
              , investment = html
              , transferred = html
              , transfer = html
              , repayment = html;
            return isLogin && (investment = React.createElement(LoanInvestment, {
                tabData: this.state.investment
            }),
            transferred = React.createElement(LoanTransferred, {
                tabData: this.state.transferred
            }),
            transfer = React.createElement(LoanTransfer, {
                tabData: this.state.transfer,
                pdlFlag: pdlFlag
            }),
            repayment = React.createElement(LoanRepayment, {
                tabData: this.state.repayment,
                pdlFlag: pdlFlag
            })),
            React.createElement("div", {
                className: "lend-bottom"
            }, React.createElement("ul", {
                className: "lend-b-tab " + tabName + " " + index
            }, React.createElement("li", {
                className: "tab-lend-info"
            }, React.createElement("span", {
                onClick: this.switchTab.bind(this, "lend-one")
            }, "散标详情")), React.createElement("li", {
                className: "tab-lend-investment"
            }, React.createElement("span", {
                onClick: this.switchTab.bind(this, "lend-two")
            }, "投标记录")), React.createElement("li", {
                className: "tab-lend-transferred loan-hide",
                onClick: this.switchTab.bind(this, "lend-thr")
            }, React.createElement("span", null, "还款表现")), React.createElement("li", {
                className: "tab-lend-transfer loan-hide",
                onClick: this.switchTab.bind(this, "lend-four")
            }, React.createElement("span", null, "债权信息")), React.createElement("li", {
                className: "tab-lend-repayment loan-hide",
                onClick: this.switchTab.bind(this, "lend-five")
            }, React.createElement("span", null, "转让记录"))), React.createElement("div", {
                className: "lend-item-content " + index
            }, React.createElement("div", {
                className: "wdt-lend-info"
            }, React.createElement(LoanInfo, {
                info: this.props.info || "",
                isTransfer: isTransfer,
                isLogin: isLogin,
                guaranteeMode: guaranteeMode
            })), React.createElement("div", {
                className: "wdt-lend-investment"
            }, investment), React.createElement("div", {
                className: "wdt-lend-transferred loan-hide"
            }, transferred), React.createElement("div", {
                className: "wdt-lend-transfer loan-hide"
            }, transfer), React.createElement("div", {
                className: "wdt-lend-repayment loan-hide"
            }, repayment)))
        }
        ,
        LendTab
    }(React.Component);
    module.exports = LendTab
});
;/*!/client/widget/detail/loan/loan-detail-buy-template/loan-detail-buy-template.js*/
define("transfer:widget/detail/loan/loan-detail-buy-template/loan-detail-buy-template.js", function(require, exports, module) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    function _inherits(subClass, superClass) {
        if ("function" != typeof superClass && null !== superClass)
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    }
    var React = require("common:node_modules/react/react")
      , utils = require("common:widget/ui/utils/utils")
      , RWeDialog = require("common:widget/react-ui/RWeDialog/RWeDialog")
      , RCoupon = require("common:widget/react-ui/RCoupon/RCoupon")
      , $ = require("common:widget/lib/jquery/jquery")
      , $statistic = (require("common:node_modules/numeral/numeral"),
    require("common:node_modules/glpb-components-common/src/index").weStatistic)
      , LoanBugTemplate = function(_React$Component) {
        function LoanBugTemplate(props) {
            _classCallCheck(this, LoanBugTemplate),
            _React$Component.call(this, props);
            var selectDefault = ""
              , couponList = this.props.coupon;
            couponList.length > 0 && (selectDefault = couponList[0].couponId),
            this.state = {
                show: this.props.show,
                couponId: selectDefault,
                couponList: couponList,
                checked: !1,
                exceedRiskLimit: !0
            }
        }
        return _inherits(LoanBugTemplate, _React$Component),
        LoanBugTemplate.prototype.componentWillReceiveProps = function(props) {
            var show = this.state.show
              , nowprops = props.show
              , couponList = props.coupon
              , couponId = "";
            couponList && couponList.length > 0 && (couponId = couponList[0].couponId),
            nowprops != show && this.setState({
                show: nowprops,
                couponId: couponId,
                couponList: couponList
            })
        }
        ,
        LoanBugTemplate.prototype.checkAgree = function(e) {
            var that = e.currentTarget
              , checked = !0;
            $(that).hasClass("j-checked") && (checked = !1),
            this.setState({
                checked: checked
            })
        }
        ,
        LoanBugTemplate.prototype.ErrorText = function(text) {
            $(".error-text").text(text),
            $(".error-text").fadeIn(1500, function() {
                $(".error-text").fadeOut(1500)
            })
        }
        ,
        LoanBugTemplate.prototype.sureBugLoan = function() {
            var rememberme = $(".check-bug").hasClass("j-checked") ? !0 : !1
              , detail = this.props.detail
              , balanceMoney = detail ? detail.availablePoint : 0
              , payableNum = $(".payable-num").attr("data-amount");
            if (!rememberme)
                return this.ErrorText("投标前请阅读并同意协议"),
                !1;
            if (payableNum > balanceMoney)
                $(".list-hide").removeClass("list-hide");
            else {
                var transferBuy = this.refs.formBugTransfer;
                transferBuy.submit()
            }
        }
        ,
        LoanBugTemplate.prototype.hideDialog = function() {
            location.reload()
        }
        ,
        LoanBugTemplate.prototype.selectOnChange = function(selectDefault, list) {
            this.setState({
                couponId: selectDefault,
                couponList: list
            })
        }
        ,
        LoanBugTemplate.prototype.jumpToRisk = function() {
            var detail = this.props.detail
              , id = detail.loanId;
            location.href = "/user/risk/riskPc?type=loan&id=" + id
        }
        ,
        LoanBugTemplate.prototype.statisticRiskEvent = function() {
            $statistic.eventRaw({
                eventId: "click_join_money_limit_remeaure_word"
            })
        }
        ,
        LoanBugTemplate.prototype.jumpToBindCard = function() {
            location.href = "/user/trade/recharge"
        }
        ,
        LoanBugTemplate.prototype.getCouponValue = function(couponList, selectDefault) {
            var payableNum = 0;
            for (var i in couponList)
                couponList[i].couponId == selectDefault && (payableNum = couponList[i].couponValue);
            return payableNum
        }
        ,
        LoanBugTemplate.prototype.createBugLoanHtml = function() {
            var loan = this.props.detail
              , nodePayInfo = (this.props.riskInfo,
            this.props.nodePayInfo)
              , queryCoupon = (this.props.exceedRiskLimit,
            loan.loanId,
            {
                businessCategory: "LOAN",
                payAmount: loan.amount,
                bindScene: 1
            })
              , selectDefault = this.state.couponId
              , couponList = this.state.couponList
              , payableNum = this.getCouponValue(couponList, selectDefault)
              , btnDom = React.createElement("button", {
                className: "ui-button j-btn j-btn-orange j-dialog-btn-small",
                type: "submit",
                onClick: this.sureBugLoan.bind(this)
            }, "确 定");
            if (nodePayInfo) {
                var bindStatus = nodePayInfo.bindStatus;
                (0 == bindStatus || 3 == bindStatus) && (btnDom = React.createElement("div", {
                    className: "ui-button j-btn j-btn-orange j-dialog-btn-small",
                    onClick: this.jumpToBindCard.bind(this)
                }, "确定"))
            }
            var html = React.createElement("div", {
                className: "ui-confirm-content"
            }, React.createElement("ul", {
                className: "confirm-ul"
            }, React.createElement("li", {
                className: "transfer-list"
            }, React.createElement("span", {
                className: "transfer-list-left"
            }, "借款标题"), React.createElement("span", {
                className: "transfer-list-right"
            }, loan.title, " ")), React.createElement("li", {
                className: "transfer-list"
            }, React.createElement("span", {
                className: "transfer-list-left"
            }, "借款用户"), React.createElement("span", {
                className: "transfer-list-right"
            }, React.createElement("em", {
                "data-name": "shares"
            }, React.createElement("a", null, loan.nickName)))), React.createElement("li", {
                className: "transfer-list"
            }, React.createElement("span", {
                className: "transfer-list-left"
            }, "年利率"), React.createElement("span", {
                className: "transfer-list-right"
            }, React.createElement("em", {
                "data-type": "multishares"
            }, loan.interest), "%")), React.createElement("li", {
                className: "transfer-list"
            }, React.createElement("span", {
                className: "transfer-list-left"
            }, "还款期限"), React.createElement("span", {
                className: "transfer-list-right"
            }, React.createElement("em", {
                "data-type": "multishares"
            }, loan.months), "个月")), React.createElement("li", {
                className: "transfer-list"
            }, React.createElement("span", {
                className: "transfer-list-left"
            }, "还款方式"), React.createElement("span", {
                className: "transfer-list-right"
            }, React.createElement("em", {
                "data-type": "multishares"
            }, loan.repayTerm))), React.createElement("li", {
                className: "fn-clear"
            }, React.createElement("span", {
                className: "transfer-list-left"
            }, "出借金额"), React.createElement("span", {
                className: "transfer-list-right"
            }, React.createElement("em", {
                "data-type": "multishares"
            }, utils.commaFloat(loan.amount || 0)), " 元")), React.createElement("li", {
                className: "coupon-list"
            }, React.createElement(RCoupon, {
                selectDefault: selectDefault,
                queryCoupon: queryCoupon,
                coupon: couponList,
                selectOnChange: this.selectOnChange.bind(this)
            })), React.createElement("li", {
                className: "fn-clear"
            }, React.createElement("span", {
                className: "transfer-list-left"
            }, "应付金额"), React.createElement("span", {
                className: "transfer-list-right"
            }, React.createElement("em", {
                "data-type": "multishares",
                className: "payable-num",
                "data-amount": loan.amount - payableNum
            }, utils.commaFloat(loan.amount - payableNum)), " ", "元")), React.createElement("li", {
                className: "fn-clear list-hide"
            }, React.createElement("span", {
                className: "transfer-list-left"
            }), React.createElement("span", {
                className: "transfer-list-right"
            }, React.createElement("em", {
                className: "orange-color"
            }, "您的余额不足"), React.createElement("a", {
                className: "recharge-loan",
                href: "/user/trade/recharge"
            }, "充值"))), React.createElement("li", {
                className: "transfer-list-1-line"
            }, "遇流标情况，投标期内所冻结的金额将在流标后进行解冻。"), React.createElement("li", {
                className: "transfer-agreement"
            }, React.createElement("div", {
                className: this.state.checked ? "check-bug j-checked" : "check-bug",
                onClick: this.checkAgree.bind(this)
            }, React.createElement("input", {
                className: "",
                type: "checkbox",
                id: "rememberme",
                name: "agree-transfer",
                defaultChecked: "checked"
            }), React.createElement("span", {
                className: "check-img"
            }), React.createElement("span", null, "我已阅读并同意签署", React.createElement("a", {
                onClick: function(e) {
                    e.stopPropagation()
                },
                className: "more-than",
                href: "/p2p/contract/loan?loanId=" + loan.loanId,
                target: "_blank"
            }, "《借款协议》"), "及", React.createElement("a", {
                onClick: function(e) {
                    e.stopPropagation()
                },
                className: "more-than",
                href: "//www.renrendai.com/agreement/contract/currency/cmsId/5bb06ea3e141322c89974537",
                target: "_blank"
            }, "《风险揭示书》"))))), React.createElement("div", {
                className: "ui-confirm-submit-box"
            }, React.createElement("span", {
                className: "error-text"
            }, "投标前请阅读并同意协议"), btnDom, React.createElement("form", {
                name: "toMingSheng",
                ref: "formBugTransfer",
                id: "",
                action: "/transfer/detail/buyLoan",
                method: "POST"
            }, React.createElement("input", {
                type: "hidden",
                name: "loanId",
                value: loan.loanId
            }), React.createElement("input", {
                type: "hidden",
                name: "agreeContract",
                value: this.state.checked ? "on" : "off"
            }), React.createElement("input", {
                type: "hidden",
                name: "bidAmount",
                value: loan.amount
            }), React.createElement("input", {
                type: "hidden",
                name: "couponId",
                value: this.state.couponId
            }))));
            return html
        }
        ,
        LoanBugTemplate.prototype.render = function() {
            var show = this.state.show
              , showing = 2 == show ? !0 : !1
              , dialogContent = this.createBugLoanHtml()
              , weProps = {
                showing: showing,
                title: "确认出借",
                onRequestClose: this.hideDialog.bind(this)
            };
            return React.createElement("div", {
                className: "loan-transfer-dialog"
            }, React.createElement(RWeDialog, weProps, dialogContent))
        }
        ,
        LoanBugTemplate
    }(React.Component);
    module.exports = LoanBugTemplate
});
;/*!/client/widget/detail/loan/loan-detail-header/loan-detail-header.js*/
define("transfer:widget/detail/loan/loan-detail-header/loan-detail-header.js", function(require, exports, module) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    function _inherits(subClass, superClass) {
        if ("function" != typeof superClass && null !== superClass)
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    }
    var React = require("common:node_modules/react/react")
      , utils = require("common:widget/ui/utils/utils")
      , p2pUtil = utils.p2pUtil
      , service = require("common:widget/ui/service/service-factory")
      , p2pService = service.getService("p2p")
      , RWeStatusDialog = (require("common:widget/react-ui/RList/List"),
    require("common:widget/react-ui/RWeStatusDialog/RWeStatusDialog"))
      , RWeOpenAccount = require("common:widget/react-ui/ROpenAccount/ROpenAccount")
      , RWETooltip = require("common:widget/react-ui/RWETooltip/RWETooltip")
      , DialogTemplate = require("transfer:widget/detail/loan/loan-detail-buy-template/loan-detail-buy-template")
      , ReactTooltip = require("common:node_modules/react-tooltip/dist/index")
      , InvestDialog = require("common:widget/ui/investDialog/investDialog")
      , moment = require("common:node_modules/moment/moment")
      , LoanHeader = function(_React$Component) {
        function LoanHeader(props) {
            _classCallCheck(this, LoanHeader),
            _React$Component.call(this, props);
            var buyResult = this.props.buyResult
              , show = buyResult ? !0 : !1;
            this.state = {
                show: 1,
                dialogData: {},
                couponList: [],
                errorText: "",
                inputValue: "",
                commonDialog: show,
                exceedRiskLimit: !1,
                riskDialogShow: !1,
                riskDialogType: 1,
                riskDialogResult: ""
            },
            this.closeRiskDialog = this.closeRiskDialog.bind(this),
            this.jumpToRisk = this.jumpToRisk.bind(this)
        }
        return _inherits(LoanHeader, _React$Component),
        LoanHeader.prototype.changeDialogProps = function() {
            var state = this.state || {}
              , type = state.riskDialogType
              , dialogProps = $.extend({}, {
                onRequestClose: this.closeRiskDialog,
                dialog: {
                    className: "r-risk-dialog"
                }
            });
            return 1 === type ? (dialogProps.message = state.riskDialogResult,
            dialogProps.buttons = [{
                text: "我知道了",
                event: this.closeRiskDialog,
                skin: "white"
            }, {
                text: "去测评",
                skin: "orange",
                event: this.jumpToRisk
            }]) : 2 === type ? (dialogProps.message = state.riskDialogResult,
            dialogProps.buttons = [{
                text: "我知道了",
                skin: "orange",
                event: this.closeRiskDialog
            }]) : 3 === type && (dialogProps.message = state.riskDialogResult,
            dialogProps.buttons = [{
                text: "我知道了",
                skin: "white",
                event: this.closeRiskDialog
            }, {
                event: this.jumpToRisk,
                text: "重新测评",
                skin: "orange"
            }]),
            dialogProps
        }
        ,
        LoanHeader.prototype.jumpToRisk = function() {
            var detail = this.props.detail
              , loan = detail.loan
              , loanId = loan.loanId;
            location.href = "/user/risk/riskPc?type=loan&id=" + loanId
        }
        ,
        LoanHeader.prototype.closeRiskDialog = function() {
            this.setState({
                riskDialogShow: !1
            })
        }
        ,
        LoanHeader.prototype.riskDialog = function() {
            var dialogProps = this.changeDialogProps()
              , riskDialogShow = this.state.riskDialogShow;
            return riskDialogShow ? React.createElement(RWeStatusDialog, dialogProps) : void 0
        }
        ,
        LoanHeader.prototype.getLoanRisk = function() {
            var _this2 = this
              , state = this.state
              , detail = this.props.detail
              , loan = detail.loan
              , loanId = loan.loanId;
            p2pService.checkLoanRisk({
                loanId: loanId
            }).then(function(loanResult) {
                var loanData = loanResult.data || {}
                  , loanStatus = loanData.status;
                if (0 === loanStatus) {
                    var loanRiskData = loanData.data || {}
                      , checkLoanRiskFlag = loanRiskData.checkLoanRiskFlag || "";
                    if (checkLoanRiskFlag)
                        _this2.setState({
                            riskDialogResult: React.createElement("div", null, "您的风险等级为", React.createElement("span", {
                                className: "text-orange-color"
                            }, loanRiskData.currentRiskLevel), "，达到", React.createElement("span", {
                                className: "text-orange-color"
                            }, loanRiskData.nextRiskLevel), "才可出借此项目"),
                            riskDialogShow: !0,
                            riskDialogType: 3
                        });
                    else {
                        var amount = state.inputValue;
                        p2pService.checkRiskLimit({
                            amount: amount
                        }).then(function(result) {
                            var data = result.data || {}
                              , status = data.status;
                            if (0 === status)
                                _this2.sendLoanDialog();
                            else if (80030 === data.status)
                                _this2.setState({
                                    riskDialogShow: !0,
                                    riskDialogType: 2,
                                    riskDialogResult: "您当前在平台的出借本金已超出您的风险承受能力，为了您的资金安全，您将不能继续在平台出借。"
                                });
                            else if (80029 === data.status) {
                                var resultData = data.data || {};
                                _this2.setState({
                                    riskDialogResult: React.createElement("div", null, "您的风险等级为", React.createElement("span", {
                                        className: "text-orange-color"
                                    }, resultData.currentRiskLevel), "，达到", React.createElement("span", {
                                        className: "text-orange-color"
                                    }, resultData.nextRiskLevel), "才可出借此项目"),
                                    riskDialogShow: !0,
                                    riskDialogType: 3
                                })
                            } else
                                _this2.setState(80007 === data.status || 80025 === data.status ? {
                                    riskDialogShow: !0,
                                    riskDialogType: 1,
                                    riskDialogResult: "授权出借前需完成风险测评"
                                } : {
                                    riskDialogShow: !0,
                                    riskDialogType: 1,
                                    riskDialogResult: "网络错误,请稍后再试!"
                                })
                        })
                    }
                } else
                    _this2.setState({
                        riskDialogShow: !0,
                        riskDialogType: 1,
                        riskDialogResult: "网络错误,请稍后再试!"
                    })
            })
        }
        ,
        LoanHeader.prototype.sendLoanDialog = function() {
            var detail = this.props.detail
              , loan = detail.loan
              , money = this.state.inputValue
              , share = parseInt(money / 50)
              , loanId = loan.loanId
              , _this = this
              , queryData = {
                businessCategory: "LOAN",
                payAmount: parseFloat(money),
                businessId: loanId
            };
            $.ajax({
                dataType: "json",
                type: "get",
                url: "/transfer/detail/couponList",
                data: queryData,
                success: function(coupon) {
                    if (0 == coupon.status) {
                        var dialogData = _this.getDialogData();
                        dialogData.amount = utils.fixFloat2(money),
                        dialogData.share = share,
                        _this.setState({
                            dialogData: dialogData,
                            show: 2,
                            couponList: coupon.data
                        })
                    }
                }
            })
        }
        ,
        LoanHeader.prototype.bugLoan = function(e) {
            var _this3 = this
              , target = e.currentTarget
              , disable = $(target).hasClass("disable")
              , money = this.state.inputValue;
            if (!money)
                return this.setState({
                    errorText: "输入金额不能为空"
                }),
                !1;
            if (disable)
                return !1;
            var isLogin = this.props.isLogin
              , hasAccount = this.props.hasAccount;
            if (!isLogin)
                return location.href = "/login",
                !1;
            if (!hasAccount)
                return this.setState({
                    commonDialog: !0
                }),
                !1;
            var switcher = !1;
            $.ajax({
                url: "/autoinvest/product/riskSwitchStatus",
                type: "post",
                dataType: "json",
                async: !1,
                success: function(res) {
                    0 === res.status && (switcher = res.data.display)
                },
                timeout: 2e3
            }),
            switcher ? new InvestDialog({
                type: "RISK",
                id: "risk",
                submitCallback: function() {
                    _this3.riskInfoDialog()
                }
            }).show() : this.riskInfoDialog()
        }
        ,
        LoanHeader.prototype.riskInfoDialog = function() {
            var _props$riskInfo = this.props.riskInfo
              , riskFlag = _props$riskInfo.riskFlag
              , isRisk = _props$riskInfo.isRisk;
            if (riskFlag) {
                if (!isRisk)
                    return this.setState({
                        riskDialogShow: !0,
                        riskDialogType: 1,
                        riskDialogResult: "授权出借前需完成风险测评"
                    }),
                    !1;
                this.getLoanRisk()
            } else
                this.sendLoanDialog()
        }
        ,
        LoanHeader.prototype.handleChange = function(e) {
            var target = e.target
              , value = target.value;
            value = isNaN(value) ? this.state.inputValue : value;
            var loanAllType = target.getAttribute("data-type")
              , maxNum = target.getAttribute("data-max")
              , errorText = "";
            1 == loanAllType ? (value % 50 != 0 && (errorText = "输入金额需为50元的整数倍"),
            parseInt(value) > parseInt(maxNum) && (errorText = "您最多只能购买" + maxNum + "元")) : (1e3 > value && (errorText = "输入金额需大于1000元"),
            (value - 1e3) % 1e3 != 0 && (errorText = "递增金额需为1000元的整数倍"));
            var moneyStr = value.toString();
            moneyStr.indexOf(" ") >= 0 && (errorText = "输入金额不能有空格"),
            this.setState({
                errorText: errorText,
                inputValue: value
            })
        }
        ,
        LoanHeader.prototype.getAllStatusHtml = function() {
            var detail = this.props.detail
              , loan = detail.loan
              , isLogin = this.props.isLogin
              , status = loan.status
              , pdlFlag = loan.pdlFlag
              , isFirstLoan = !!loan.loanPeriod
              , html = ""
              , surplusShares = "";
            surplusShares = "debx-cf" == loan.utmSource ? loan.surplusAmount / 1e3 : loan.surplusAmount / 50;
            var loanBalance = ""
              , unknownStatus = ""
              , availablePoint = detail.availablePoint ? utils.commaFloat(detail.availablePoint) : "0.00";
            isLogin ? (loanBalance = React.createElement("div", {
                className: "loan-balance"
            }, React.createElement("p", null, "可用金额 ", React.createElement("em", null, availablePoint), "元"), React.createElement("a", {
                target: "_blank",
                href: "/user/trade/recharge"
            }, "充值")),
            unknownStatus = React.createElement("div", {
                className: "loan-box-bottom"
            }, React.createElement("p", null, availablePoint, "元"), React.createElement("div", {
                className: "loan-unkown-status"
            }, React.createElement("span", null, "可用金额 "), React.createElement("a", {
                target: "_blank",
                href: "/user/trade/recharge"
            }, "充值")))) : (loanBalance = React.createElement("div", {
                className: "loan-balance"
            }, React.createElement("p", null, "可用金额 ", React.createElement("a", {
                href: "/login"
            }, "登录"), "后可见")),
            unknownStatus = React.createElement("div", {
                className: "loan-box-bottom"
            }, React.createElement("p", null, "可用金额 "), React.createElement("div", {
                className: "loan-login-status"
            }, React.createElement("a", {
                href: "/login"
            }, "登录"), "后可见"))),
            status = utils.loanAllType(status);
            {
                var periodUnit = isFirstLoan ? "期" : "月";
                isFirstLoan ? null : React.createElement("span", null, surplusShares + "份")
            }
            switch (status) {
            case "OPEN":
                var inputDesc = "输入金额需为50元的整数倍"
                  , loanAllType = 1
                  , errorText = this.state.errorText
                  , disable = errorText ? "disable" : "";
                "debx-cf" == loan.utmSource && (inputDesc = "起投金额1000元，递增金额1000元",
                loanAllType = 1),
                html = React.createElement("div", {
                    className: "loan-con-r",
                    key: "OPEN"
                }, loanBalance, React.createElement("div", {
                    className: errorText ? "bug-loan error-border" : "bug-loan"
                }, React.createElement("input", {
                    "data-max": loan.surplusAmount,
                    value: this.state.inputValue,
                    type: "text",
                    "data-type": loanAllType,
                    onChange: this.handleChange.bind(this),
                    name: "amount",
                    placeholder: inputDesc,
                    className: "loan-value"
                }), React.createElement("span", null, "元")), React.createElement("div", {
                    className: "can-bug-num"
                }, React.createElement("p", null, "剩余金额 ", React.createElement("i", null, " ", utils.commaFloat(loan.surplusAmount)), "元"), React.createElement("div", {
                    className: errorText ? "error-text error-show" : "error-text"
                }, errorText)), React.createElement("button", {
                    className: "go-bug " + disable,
                    onClick: this.bugLoan.bind(this)
                }, "出借"));
                break;
            case "APPLY":
                html = React.createElement("div", {
                    className: "loan-content-right-desc"
                }, React.createElement("div", {
                    className: "loan-box-top"
                }, React.createElement("p", null, React.createElement("span", {
                    className: "time-style font-34px"
                }, detail.remainTime)), React.createElement("em", null, "申请剩余时间")), React.createElement("div", {
                    className: "stamp-new"
                }, React.createElement("img", {
                    src: "//www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/" + status + ".png"
                })));
                break;
            case "READY":
                html = React.createElement("div", {
                    className: "loan-content-right-desc"
                }, React.createElement("div", {
                    className: "loan-box-top"
                }, React.createElement("p", null, React.createElement("span", {
                    className: "time-style font-30px"
                }, detail.fullTime || "")), React.createElement("em", null, "满标用时")), React.createElement("div", {
                    className: "loan-box-bottom"
                }, React.createElement("p", null, detail.joinCount + " 人次"), React.createElement("em", null, "加入人次")), React.createElement("div", {
                    className: "stamp-new"
                }, React.createElement("img", {
                    src: "//www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/" + status + ".png"
                })));
                break;
            case "FAILED":
                html = React.createElement("div", {
                    className: "loan-content-right-desc"
                }, React.createElement("div", {
                    className: "loan-box-top"
                }, React.createElement("p", null, React.createElement("span", {
                    className: "fail-style font-48px"
                }, "已流标"))), React.createElement("div", {
                    className: "stamp-new"
                }, React.createElement("img", {
                    src: "//www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/" + status + ".png"
                })));
                break;
            case "REPAYING":
                var remainingDom = pdlFlag ? React.createElement("div", {
                    className: "loan-box-top"
                }, React.createElement("p", null, React.createElement("span", null, loan.leftDays), React.createElement("i", null, "天")), React.createElement("em", null, "剩余天数")) : React.createElement("div", {
                    className: "loan-box-top"
                }, React.createElement("p", null, React.createElement("span", null, loan.leftMonths), React.createElement("i", null, periodUnit)), React.createElement("em", null, "剩余期数"))
                  , repaymentDom = pdlFlag ? React.createElement("div", {
                    className: "loan-box-bottom"
                }, React.createElement("p", null, detail.nextRepayDate), React.createElement("em", null, "还款日")) : React.createElement("div", {
                    className: "loan-box-bottom"
                }, React.createElement("p", null, detail.nextRepayDate), React.createElement("em", null, "下一还款日"));
                html = React.createElement("div", {
                    className: "loan-content-right-desc"
                }, remainingDom, repaymentDom, React.createElement("div", {
                    className: "stamp-new"
                }, React.createElement("img", {
                    src: "//www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/" + status + ".png"
                })));
                break;
            case "OVERDUE":
                html = React.createElement("div", {
                    className: "loan-content-right-desc"
                }, React.createElement("div", {
                    className: "loan-box-top"
                }, React.createElement("p", null, React.createElement("span", {
                    className: "font-36px"
                }, utils.commaFloat(detail.overDueAmount)), React.createElement("i", null, "元")), React.createElement("em", null, "逾期金额")), React.createElement("div", {
                    className: "loan-box-bottom"
                }, React.createElement("p", null, detail.overDays + "天"), React.createElement("em", null, "逾期天数")), React.createElement("div", {
                    className: "stamp-new"
                }, React.createElement("img", {
                    src: "//www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/" + status + ".png"
                })));
                break;
            case "BADDEBT":
                html = React.createElement("div", {
                    className: "loan-content-right-desc"
                }, React.createElement("div", {
                    className: "loan-box-top"
                }, React.createElement("p", null, React.createElement("span", {
                    className: "font-36px"
                }, utils.commaInteger(detail.guaranteedAmount)), React.createElement("i", null, "元")), React.createElement("em", null, "垫付金额")), React.createElement("div", {
                    className: "loan-box-bottom"
                }, React.createElement("p", null, utils.formatDateAllTime(new Date(loan.repaidByGuarantorTime))[2]), React.createElement("em", null, "垫付时间")), React.createElement("div", {
                    className: "stamp-new"
                }, React.createElement("img", {
                    src: "//www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/" + status + ".png"
                })));
                break;
            case "CLOSED":
                html = React.createElement("div", {
                    className: "loan-content-right-desc"
                }, React.createElement("div", {
                    className: "loan-box-top"
                }, React.createElement("p", null, React.createElement("span", {
                    className: "font-36px time-style"
                }, utils.formatDateAllTime(new Date(loan.closeTime))[2]), React.createElement("i", null)), React.createElement("em", null, "还清时间")), React.createElement("div", {
                    className: "stamp-new"
                }, React.createElement("img", {
                    src: "//www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/" + status + ".png"
                })));
                break;
            default:
                html = React.createElement("div", {
                    className: "loan-content-right-desc"
                }, React.createElement("div", {
                    className: "loan-box-top"
                }, React.createElement("p", null, React.createElement("span", {
                    className: "font-36px"
                }, utils.commaInteger(loan.surplusAmount)), React.createElement("i", null, "元")), React.createElement("em", null, "剩余金额")), unknownStatus, React.createElement("div", {
                    className: "stamp-new"
                }, React.createElement("img", {
                    src: "//www.we.com/cms/5864b0d6a24d131067ef7956/uplan/stamp/UNKNOWN.png"
                })))
            }
            return html
        }
        ,
        LoanHeader.prototype.getGuaranteeValue = function() {
            var detail = this.props.detail
              , loan = detail.loan
              , guaranteeType = "FXHB" == loan.loanType || 1 == loan.allProtected
              , guaranteeValue = guaranteeType ? "用户利益保障机制" : "本金";
            return guaranteeValue
        }
        ,
        LoanHeader.prototype.getRepayTerm = function() {
            var detail = this.props.detail
              , loan = detail.loan
              , repayTerm = "QUARTER" == loan.repayType ? "按季还款" : "按月还款"
              , repayMethod = "DEBX" == loan.loanType ? "等额本息" : "付息还本"
              , repayDesc = repayTerm + "/" + repayMethod;
            return "xxhb-rrjf" == loan.utmSource && "xxhb" == detail.productRepayType && (repayDesc = loan.xxhbMonth ? loan.xxhbMonth + "个月先息后本，" + loan.debxMonth + "个月等额本息" : repayTerm + "/" + repayMethod),
            repayDesc
        }
        ,
        LoanHeader.prototype.getDialogData = function() {
            var detail = this.props.detail
              , loan = detail.loan
              , dialogData = {
                title: loan.title,
                loanId: loan.loanId,
                nickName: loan.nickName,
                interest: utils.fixFloat2(loan.interest),
                months: loan.months,
                repayTerm: this.getRepayTerm(),
                amount: "",
                share: "",
                availablePoint: detail.availablePoint,
                guaranteeValue: this.getGuaranteeValue()
            };
            return dialogData
        }
        ,
        LoanHeader.prototype.createLeftDom = function() {
            var detail = this.props.detail
              , riskInfo = this.props.riskInfo
              , nodePayInfo = this.props.nodePayInfo
              , loan = detail.loan
              , opStatus = loan.status
              , pdlFlag = loan.pdlFlag
              , lastList = []
              , isFirstLoan = !!loan.loanPeriod
              , isW290 = !1;
            if ("OPEN" == opStatus) {
                var remainTime = detail.remainTime
                  , totalprogress = parseInt(loan.finishedRatio || 0);
                totalprogress = totalprogress > 99 && 100 > totalprogress ? 99 : totalprogress,
                lastList.push(React.createElement("li", {
                    key: "5"
                }, React.createElement("i", {
                    className: "loan-li-desc"
                }, "投标进度"), React.createElement("span", {
                    className: "progress-bar"
                }, React.createElement("i", {
                    style: {
                        width: totalprogress + "%"
                    }
                })), React.createElement("span", {
                    className: "progress-num"
                }, totalprogress + "%"))),
                isW290 = !0,
                remainTime && (lastList.push(React.createElement("li", {
                    className: "w290",
                    key: "15"
                }, React.createElement("i", {
                    className: "loan-li-desc"
                }, "剩余时间"), React.createElement("span", null, remainTime))),
                isW290 = !1)
            }
            var repayDesc = (this.getGuaranteeValue(),
            this.getRepayTerm())
              , tips = this.createRepatTips(loan)
              , interestDate = detail.interestDate
              , interestTime = "";
            interestTime = pdlFlag ? interestDate ? utils.formatDateAllTime(new Date(interestDate))[2] : "放款日次日" : interestDate ? utils.formatDateAllTime(new Date(interestDate))[2] : "放款日当日";
            var repaySource = detail.repaySource || "--"
              , sourceOrPeriod = React.createElement("li", {
                key: "7",
                className: isW290 ? "w290" : ""
            }, React.createElement("i", {
                className: "loan-li-desc"
            }, "还款来源"), React.createElement("span", null, repaySource))
              , periodDom = pdlFlag ? React.createElement("p", {
                className: "w150"
            }, React.createElement("em", null, loan.days), React.createElement("span", null, "天")) : React.createElement("p", {
                className: "w150"
            }, React.createElement("em", null, loan.months), React.createElement("span", null, "个月"))
              , repaymentType = pdlFlag ? React.createElement("li", {
                key: "4",
                className: "w290"
            }, React.createElement("i", {
                className: "loan-li-desc"
            }, "还款方式"), React.createElement("span", null, "一次性还本付息")) : React.createElement("li", {
                key: "4",
                className: "w290"
            }, React.createElement("i", {
                className: "loan-li-desc"
            }, "还款方式"), React.createElement("span", null, repayDesc), React.createElement("a", {
                target: "_blank",
                href: "https://www.renrendai.com/help/investment/586f4bda1538f40e27736390"
            }, React.createElement(RWETooltip, {
                tip: tips,
                delayHide: 700,
                html: !0,
                place: "right"
            })))
              , info = this.props.info
              , borrower = info.borrower || {}
              , creditLevel = borrower.creditLevel || ""
              , deadlineTips = null;
            isFirstLoan && (deadlineTips = React.createElement(RWETooltip, {
                tip: "一个月是指一个完整自然月（即当月某日至次月对日的期间，次月无对日的，为次月最后一日），但第一个月为自放款日至第一期还款日的期间",
                delayHide: 700,
                html: !0,
                place: "right"
            }));
            var firstBillDate = null
              , billStatus = utils.loanAllType(opStatus);
            !isFirstLoan || "OPEN" != billStatus && "APPLY" != billStatus && "READY" != billStatus || (firstBillDate = React.createElement("li", {
                key: "8",
                className: isW290 ? "" : "w290"
            }, React.createElement("i", {
                className: "loan-li-desc"
            }, "首期还款日"), React.createElement("span", null, moment(loan.firstBillDate).format("YYYY-MM-DD"))));
            var result = React.createElement("div", {
                className: "loan-con-l loan-alone-style"
            }, React.createElement("div", {
                className: "loan-l-number"
            }, React.createElement("p", {
                className: "w285"
            }, React.createElement("em", {
                className: "con-font"
            }, utils.commaInteger(loan.amount)), React.createElement("span", {
                className: "con-font"
            }, "元")), React.createElement("p", {
                className: "w205"
            }, React.createElement("em", null, utils.fixFloat2(loan.interest)), React.createElement("span", {
                className: "txt-color"
            }, "%")), periodDom), React.createElement("div", {
                className: "loan-l-number-desc"
            }, React.createElement("span", {
                className: "w285"
            }, "标的总额"), React.createElement("span", {
                className: "w205"
            }, "年利率"), React.createElement("span", {
                className: "w150"
            }, "还款期限", deadlineTips)), React.createElement("ul", null, React.createElement("li", {
                key: "1"
            }, React.createElement("i", {
                className: "loan-li-desc"
            }, "起息日"), React.createElement("span", null, interestTime)), React.createElement("li", {
                key: "2",
                className: "w290"
            }, React.createElement("i", {
                className: "loan-li-desc"
            }, "提前还款费率"), React.createElement("span", {
                className: "orange"
            }, utils.fixFloat2(detail.inRepayPenalFee) + "%")), React.createElement("li", {
                key: "3"
            }, React.createElement("i", {
                className: "loan-li-desc"
            }, "风险等级"), React.createElement("span", null, creditLevel)), repaymentType, lastList, sourceOrPeriod, firstBillDate), React.createElement(DialogTemplate, {
                detail: this.state.dialogData,
                riskInfo: riskInfo,
                exceedRiskLimit: this.state.exceedRiskLimit,
                nodePayInfo: nodePayInfo,
                coupon: this.state.couponList,
                show: this.state.show
            }));
            return result
        }
        ,
        LoanHeader.prototype.createRepatTips = function(loan) {
            var utmSource = loan.utmSource
              , tipsText = "";
            return tipsText = "xxhb-rrjf" == utmSource ? "1. 先息后本还款法是在还款期内，每月只偿还利息，到期再还本金。</br>\n                2. 等额本息还款法是在还款期内，每月偿还同等数额的贷款(包括本金和利息)。</br>借款人每月还款额中的本金比重逐月递增、利息比重逐月递减" : "DEBX" == loan.loanType ? "等额本息还款法是在还款期内，每月偿还同等数额的贷款(包括本金和利息)。</br>借款人每月还款额中的本金比重逐月递增、利息比重逐月递减。" : "付息还本是在还款期内，每月偿还利息，到期偿还本金的方式。"
        }
        ,
        LoanHeader.prototype.closeCommonDialog = function() {
            this.setState({
                commonDialog: !1
            })
        }
        ,
        LoanHeader.prototype.renderCommonDialog = function() {
            var commonDialog = this.state.commonDialog
              , buyResult = this.props.buyResult
              , dialog = React.createElement(RWeOpenAccount, {
                onRequestClose: this.closeCommonDialog.bind(this)
            });
            if (buyResult) {
                var dialogProps = {
                    onRequestClose: this.closeCommonDialog.bind(this),
                    status: 2,
                    message: buyResult.message
                };
                dialog = React.createElement(RWeStatusDialog, dialogProps)
            }
            var errorDialog = commonDialog ? dialog : null;
            return errorDialog
        }
        ,
        LoanHeader.prototype.render = function() {
            var detail = this.props.detail
              , loan = detail.loan
              , LeftDom = this.createLeftDom()
              , displayLoanType = p2pUtil.loanAllType(loan.displayLoanType)
              , RightDom = this.getAllStatusHtml()
              , CommonDialog = this.renderCommonDialog()
              , otherSource = null;
            "debx-cf" == loan.utmSource && (otherSource = React.createElement("a", {
                target: "_blank",
                href: "/about/resources/cfrz"
            }, "创富融资租赁"));
            var LoanId = loan.loanId
              , loanTitle = "NO." + LoanId + loan.title
              , riskTipsData = this.props.riskTipsData
              , cmsData = riskTipsData.loan
              , riskDialog = this.riskDialog();
            return React.createElement("div", {
                className: "loan-header"
            }, React.createElement("div", {
                className: "loan-agreement"
            }, React.createElement("i", null, displayLoanType[1]), React.createElement("p", null, loanTitle), otherSource, React.createElement("div", {
                className: "transfer-header-tips"
            }, React.createElement("div", {
                className: "tips-text"
            }, cmsData.detailText), React.createElement("div", {
                "data-tip": cmsData.informContent,
                "data-for": "introduce-sadFace",
                className: "icon-we-tips"
            }), React.createElement(ReactTooltip, {
                id: "introduce-sadFace",
                html: "true",
                type: "light",
                effect: "solid",
                place: "bottom",
                border: !0
            })), React.createElement("div", {
                className: "agreement-container"
            }, React.createElement("a", {
                className: "agreement-right",
                target: "_blank",
                href: "/p2p/contract/loan?loanId=" + loan.loanId
            }, "借款协议（范本）"), this.props.showLoanContractRisk ? React.createElement("span", {
                style: {
                    paddingLeft: 0
                }
            }, React.createElement("span", {
                style: {
                    paddingLeft: 0
                }
            }, "、"), React.createElement("a", {
                className: "agreement-right",
                href: "/p2p/contract/loanRisk?loanId=" + loan.loanId,
                target: "_blank"
            }, "风险揭示书")) : "")), React.createElement("div", {
                className: "loan-content"
            }, LeftDom, RightDom, React.createElement("input", {
                type: "hidden",
                className: "loanId",
                value: loan.loanId
            })), CommonDialog, riskDialog)
        }
        ,
        LoanHeader
    }(React.Component);
    module.exports = LoanHeader
});
;/*!/client/widget/list/list-main/list-main.js*/
define("transfer:widget/list/list-main/list-main.js", function(require, exports, module) {
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function")
    }
    var React = require("common:node_modules/react/react")
      , numeral = (require("common:node_modules/react-dom/index"),
    require("common:node_modules/numeral/numeral"))
      , utils = require("common:widget/ui/utils/utils")
      , TransferListMain = function() {
        function TransferListMain() {
            _classCallCheck(this, TransferListMain)
        }
        return TransferListMain.prototype.resolveMaxLength = function(string) {
            return string.length > 7 ? string.substring(0, 7) + "..." : string
        }
        ,
        TransferListMain.prototype.renderHeader = function() {
            var data = {
                headItems: [{
                    sortName: "TRANSFER_INTEREST",
                    sortNameC: "年利率",
                    sortType: "asc",
                    isOrder: !1,
                    liClassName: "h-rate"
                }, {
                    sortNameC: "借款标题",
                    isSelected: !1,
                    isOrder: !1,
                    liClassName: "h-name"
                }, {
                    sortName: "TRANSFER_LEFTPHASECOUNT",
                    sortNameC: "剩余期限",
                    sortType: "asc",
                    isOrder: !1,
                    liClassName: "h-limit"
                }, {
                    sortName: "TRANSFER_DISCOUNTRATIO",
                    sortNameC: "转让系数",
                    sortType: "asc",
                    isOrder: !1,
                    liClassName: "h-transfer"
                }, {
                    sortNameC: "转让价格",
                    isOrder: !1,
                    liClassName: "h-price"
                }, {
                    sortNameC: "重置",
                    isSelected: !1,
                    isOrder: !1,
                    liClassName: "h-action icon-we-zhongzhiicon"
                }]
            };
            return data
        }
        ,
        TransferListMain.prototype.renderRow = function(item, index) {
            var isCompleted = 0 == item.share
              , transfer = numeral(item.discountRatio).format("0%")
              , badge = this.getBadge(item.displayLoanType)
              , amount = utils.commaFloat(item.share * item.resultPice);
            return isCompleted && (amount = utils.commaFloat(item.initialShare * item.resultPice)),
            React.createElement("div", {
                className: "loan-list-item" + (index % 2 == 1 ? " even" : "")
            }, React.createElement("div", {
                className: "rate"
            }, React.createElement("i", null, item.interest), React.createElement("span", null, "%")), React.createElement("div", {
                className: "name"
            }, React.createElement("div", {
                className: "name-top"
            }, React.createElement("span", {
                className: "badge"
            }, badge), " ", React.createElement("a", {
                href: "/transfer-" + item.id + ".html",
                target: "_blank"
            }, this.resolveMaxLength(item.title))), React.createElement("div", {
                className: "list-no"
            }, "NO." + item.id)), React.createElement("div", {
                className: "limit"
            }, item.leftPhaseCount, "个月"), React.createElement("div", {
                className: "transfer"
            }, transfer), React.createElement("div", {
                className: "price"
            }, amount, "元"), React.createElement("div", {
                className: "action"
            }, isCompleted ? React.createElement("a", {
                className: "completed",
                href: "/transfer-" + item.id + ".html",
                target: "_blank"
            }, "已完成") : React.createElement("a", {
                className: "btn",
                href: "/transfer-" + item.id + ".html",
                target: "_blank"
            }, "出借")))
        }
        ,
        TransferListMain.prototype.getBadge = function(type) {
            var typeMap = {
                SDRZ: "实",
                XYRZ: "信",
                JGDB: "保",
                ZNLC: "智"
            };
            return typeMap[type] ? typeMap[type] : ""
        }
        ,
        TransferListMain
    }();
    module.exports = new TransferListMain
});
