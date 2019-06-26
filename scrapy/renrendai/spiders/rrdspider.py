# -*- coding: utf-8 -*-
import scrapy
import json
import time
import re
import sys
# 这个haipproxy是代理池程序的整个项目目录，如果不需要直接删除这行
sys.path.append('/Volumes/HDD500G/Documents/Python/haipproxy')

from renrendai.items import RenrendaiItem
from datetime import datetime
# 不需要代理这个也要删除
from haipproxy.client import ProxyFetcher


# 799700 - 2287800
class RrdspiderSpider(scrapy.Spider):

    name = 'rrdspider'
    allowed_domains = ['renrendai.com']

    def __init__(self, name=None, **kwargs):
        # redis 连接参数
        self.redis_args = {
            'host': '127.0.0.1',
            'password': '2h0n9',
            'port': 6379,
            'db': 0,
        }
        # redis连接配置
        self.client_configs = {
            'strategy': 'greedy',
            'redis_args': self.redis_args
        }
        self.fetcher = ProxyFetcher('https', **self.client_configs)
        self.count = 1
        
        self.url = 'https://www.renrendai.com/loan-{}.html'
        # 生成链接，range(<start>, <end>)，从start到end(不包括end，要包括需要+1)
        self.start_urls = ['https://www.renrendai.com/loan-{}.html'.format(_) \
            for _ in range(2056700, 2087800 + 1)]

    def request(self, url, callback):
        self.fetcher.refresh()
        # 添加代理
        request = scrapy.Request(url=url, callback=callback, meta={'proxy': self.fetcher.get_proxy()})
        request.cookies['headers'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
        return request

    def start_requests(self):
        for i, url in enumerate(self.start_urls):
            # time.sleep(0.3)
            yield self.request(url, self.parse_item)

    def parse_item(self, response):
        """
        解析出所有数据
        """
        # scrapy response 返回的body是byte类型，所以需要decode
        html = response.body.decode('utf-8')
        # 正则
        pattern = "var.?info.?=.?'(.*?)';?\n+?var.?detail.?=.?'(.*?)';?\n+?var.?isTransfer.?=.?'(.*?)';?\n+?var.?isLogin.?=.?'(.*?)';?\n+?var.?loanId.?=.?'(.*?)';?\n+?var.?hasAccount.?=.?'(.*?)';?\n+?var.buyResult.?=.?'(.*?)';?\n+?var.?guaranteeMode.?=.?'(.*?)';?\n+?var.?riskInfo.?=.?'(.*?)';?\n+?var.?nodePayInfo.?=.?'(.*?)';?\n+?var.?riskTipsData.?=.?'(.*?)';?\nvar.?showTransferContractRisk.?=.?'(.*?)';?\n+?var.?showLoanContractRisk.?=.?'(.*?)'"
        results = re.findall(pattern, html)[0]
        if len(results) != 13:
            return
        # 获取info
        info = json.loads(self.de_json_str(self.de_unicode(results[0])))
        # 获取detail
        detail = json.loads(self.de_json_str(self.de_unicode(results[1])))
        # loan id
        loan_id = self.de_unicode(results[4])

        l = info.get('loan')
        b = info.get('borrower')
        ulr = info.get('userLoanRecord')

        # 贷款信息
        loan, loan_title = self.get_loan(info, detail, l, b)
        # print('===== loan id =====>', loan.get('loan_id'))
        # 借款人信息
        borrower, borrower_title = self.get_borrower(info, b)
        # 信用信息
        user_loan_record, record_title = self.get_loan_record(ulr)
        # 审核状态
        passed_status, passed_title = self.get_pass_status(info)

        # 保存数据标题
        data_title = loan_title + borrower_title + record_title + passed_title
        # 保存数据内容
        data = list(loan.values()) + list(borrower.values()) + list(user_loan_record.values()) + list(passed_status.values())

        # 利用items将数据传输到pipelines进行清洗、去重等
        items = RenrendaiItem()
        items['data_title'] = data_title
        items['data'] = data
        items['count'] = self.count
        items['loan_id'] = loan.get('loan_id')
        self.count += 1
        yield items

    def de_unicode(self, text):
        """
        unicode转换，因为从response获取到的内容无法直接decode
        """
        return text.replace('\\u0022', '"').replace('\\u005C', '').replace('\\u002D', '-')

    def de_json_str(self, text):
        """
        替换[]括号，直接json.loads会因为[]原因报错
        """
        return text.replace('"[', '[').replace(']"', ']')

    def ts_convert(self, ts, _format: str = '%Y-%m-%d'):
        """
        时间戳转换
        :param ts: 时间戳
        :param _format: 格式化格式，str类型
        """
        if ts is None: return '--'
        ts = int(str(ts)[0:10])
        return datetime.utcfromtimestamp(ts).strftime(_format)

    def get_loan(self, info, detail, loan, borrower):
        """
        获取贷款信息
        :param loan:
        :param borrower:
        :return:
        """
        repay_type = loan.get('repayType')
        loan_type = loan.get('loanType')
        repay_desc = '{}/{}'\
            .format('按季还款' if repay_type == 'QUARTER' else '按月还款',
                    '等额本息' if loan_type == 'DEBX' else '付息还本')
        repay_source = info.get('repaySource')
        result = {
            # loan id
            'loan_id': loan.get('loanId'),
            # 标的总额
            'borrow_amount': loan.get('amount'),
            # 年利率
            'interest': '{}%'.format(loan.get('interest')),
            # 还款期限
            'months': '{}个月'.format(loan.get('months')),
            # 起息日
            'pass_time': '{}'.format(self.ts_convert(loan.get('passTime'))),
            # 风险等级
            'credit_level': '{}'.format(borrower.get('creditLevel')),
            # 借款描述
            'description': '{}'.format(loan.get('description')),
            # 还款来源
            'repay_source': '--' if repay_source is None or repay_source is '' or repay_source is '--' or repay_source is 'None' else repay_source,
            # 提前还款率
            'in_repay_penal_fee': '{}%'.format(detail.get('inRepayPenalFee')),
            # 还款方式
            'repay_desc': '{}'.format(repay_desc),
            # 加入人次
            'join_count': '{}人'.format(detail.get('joinCount')),
            # 还清时间
            'close_time': '--',
            # 剩余期数
            'left_months': '--',
            # 下一还款日
            'next_repay_date': '--'
        }
        data_info = ['loanId', '标的总额(元)', '年利率', '还款期限(月)', '起息日', '风险等级',
                    '借款描述', '还款来源', '提前还款率', '还款方式', '加入人次', '还清时间', '剩余期数', '下一还款日']

        left_months = loan.get('leftMonths')
        if left_months is None or left_months == 0:
            result.update({
                # 还清时间
                'close_time': self.ts_convert(loan.get('closeTime')),
            })
        else:
            result.update({
                # 剩余期数
                'left_months': left_months,
                # 下一还款日
                'next_repay_date': detail.get('nextRepayDate'),
            })

        return result, data_info

    def get_borrower(self, info, borrower):
        """
        获取借款人信息
        :param borrower:
        :return:
        """
        data_info = ['用户ID', '名称', '年龄', '头像', '性别', '生日', '婚姻', '工作城市', '公司行业', '公司规模', '岗位职位', '收入', '工作时间', '学历',
                    '房产', '房贷', '车产', '车贷', '其他负债', '散标状态']

        m = borrower.get('marriage')
        marriage = ''
        if m == 'MARRIED':
            marriage = '已婚'
        elif m == 'UNMARRIED':
            marriage = '未婚'
        elif m == 'DIVORCED':
            marriage = '离异'
        elif m == 'WIDOWED':
            marriage = '丧偶'

        bd = borrower.get('birthDay')
        now_year = datetime.utcfromtimestamp(int(time.time())).year
        age = now_year - int(str(bd).split('-')[0])

        s = info.get('loan').get('status')
        status = 0
        if s == 'OVERDUE' or s == 'OVER_DUE' or \
            s == 'BADDEBT' or s == 'BAD_DEBT' or\
                'OVER' in s or 'BAD' in s: status = 1

        result = {
            # 用户id
            'user_id': borrower.get('userId'),
            # 名称
            'nick_name': borrower.get('nickName'),
            # 年龄
            'age': age,
            # 头像
            'avatar': borrower.get('avatar'),
            # 性别
            'gender': borrower.get('gender'),
            # 生日
            'birth_day': borrower.get('birthDay'),
            # 婚姻
            'marriage': marriage,
            # 工作城市
            'work_city': '{} {}'.format(borrower.get('province'), borrower.get('city')),
            # 公司行业
            'office_domain': borrower.get('officeDomain'),
            # 公司规模
            'office_scale': borrower.get('officeScale'),
            # 岗位职位
            'position': borrower.get('position'),
            # 收入
            'salary': borrower.get('salary'),
            # 工作时间
            'work_years': borrower.get('workYears'),
            # 学历
            'graduation': borrower.get('graduation'),
            # 房产 1为有
            'has_house': 1 if borrower.get('hasHouse') == 1 else 0,
            # 房贷 true or false
            'house_loan': 1 if borrower.get('houseLoan') else 0,
            # 车产 1为有，其他数字为无
            'has_car': 1 if borrower.get('hasCar') == 1 else 0,
            # 车贷 true or false
            'car_loan': 1 if borrower.get('carLoan') else 0,
            # 其他负债 null为无
            'has_other_debt': 0 if info.get('hasOthDebt') is None else 1,
            # 状态
            'status': status,
        }
        return result, data_info

    def get_loan_record(self, user_loan_record):
        """
        获取用户信用信息
        :param user_loan_record:
        :return:
        """
        data_info = ['申请借款', '成功借款', '还清笔数', '信用额度', '借款总额', '待还本息', '逾期金额', '逾期次数', '严重逾期']
        result = {
            # 申请借款
            'total_count': user_loan_record.get('totalCount'),
            # 成功借款
            'success_count': user_loan_record.get('successCount'),
            # 还清笔数
            'already_pay_count': user_loan_record.get('alreadyPayCount'),
            # 信用额度
            'available_credits': user_loan_record.get('availableCredits'),
            # 借款总额
            'borrow_amount': user_loan_record.get('borrowAmount'),
            # 待还本息
            'not_pay': user_loan_record.get('notPayPrincipal') + user_loan_record.get('notPayInterest'),
            # 逾期金额
            'overdue_amount': user_loan_record.get('overdueAmount'),
            # 逾期次数
            'overdue_count': user_loan_record.get('overdueCount'),
            # 严重逾期
            'failed_count': user_loan_record.get('failedCount'),
        }
        return result, data_info

    def get_pass_status(self, info):
        """
        获取审核状态
        :param loan_id:
        :return:
        """
        passed_title = {
            "信用报告": "credit",
            "学历认证": "graduation",
            "身份认证": "identificationScanning",
            "工作认证": "work",
            "职称认证": "titles",
            "收入认证": "incomeDuty",
            "房产认证": "house",
            "车产认证": "car",
            "婚姻认证": "marriage",
            "居住地证明": "residence",
            "实地认证": "fieldAudit",
            "机构担保": "organization",
            "视频认证": "video",
            "手机认证": "mobileReceipt",
            "手机实名认证": "mobileAuth",
            "微博认证": "kaixin",
            "其他认证": "other"
        }
        passed_times = info.get('creditPassedTime')
        passed_status = {
            # 信用报告
            'credit': 0 if passed_times.get('credit') is None else 1,
            # 学历认证
            'graduation': 0 if passed_times.get('graduation') is None else 1,
            # 身份认证
            'identificationScanning': 0 if passed_times.get('identificationScanning') is None else 1,
            # 工作认证
            'work': 0 if passed_times.get('work') is None else 1,
            # 职称认证
            'titles': 0 if passed_times.get('titles') is None else 1,
            # 收入认证
            'incomeDuty': 0 if passed_times.get('incomeDuty') is None else 1,
            # 房产认证
            'house': 0 if passed_times.get('house') is None else 1,
            # 车产认证
            'car': 0 if passed_times.get('car') is None else 1,
            # 婚姻认证
            'marriage': 0 if passed_times.get('marriage') is None else 1,
            # 居住地证明
            'residence': 0 if passed_times.get('residence') is None else 1,
            # 实地认证
            'fieldAudit': 0 if passed_times.get('fieldaudit') is None else 1,
            # 机构担保
            'organization': 0 if passed_times.get('organization') is None else 1,
            # 视频认证
            'video': 0 if passed_times.get('video') is None else 1,
            # 手机认证
            'mobileReceipt': 0 if passed_times.get('mobilereceipt') is None else 1,
            # 手机实名认证
            'mobileAuth': 0 if passed_times.get('mobileauth') is None else 1,
            # 微博认证
            'kaixin': 0 if passed_times.get('kaixin') is None else 1,
            # 其他认证
            'other': 0 if passed_times.get('residotherence') is None else 1
        }
        return passed_status, list(passed_title.keys())

