import time

import requests
import xlwt
import sys
import os
import re
import json
# 这个haipproxy是代理池程序的整个项目目录，如果不需要直接删除这行
sys.path.append('/Volumes/HDD500G/Documents/Python/haipproxy')


from xlutils.copy import copy
from xlrd import open_workbook
from datetime import datetime
from pathlib import Path
# 不需要代理这个也要删除
from haipproxy.client import ProxyFetcher


class Renrendai:

    def __init__(self):
        self.rows = None
        self.url = 'https://www.renrendai.com/loan-{}.html'
        self.book = xlwt.Workbook()
        self.sheet = self.book.add_sheet('renrendai')
        self.count = 1
        # redis数据库配置，不需要代理可以删除
        self.redis_args = {
            'host': '127.0.0.1',
            'password': '2h0n9',
            'port': 6379,
            'db': 0,
        }
        # ProxyFetcher代理池链接设置
        self.client_configs = {
            'strategy': 'greedy',
            'redis_args': self.redis_args
        }
        # 获取ProxyFetcher对象，https是获取的代理类型
        self.fetcher = ProxyFetcher('https', **self.client_configs)
        self.file_path = Path(f'renrendai.xls')
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.90 Safari/537.36',
        }

    def de_unicode(self, text):
        """
        解析unicode
        :param text:
        :return:
        """
        return text.replace('\\u0022', '"').replace('\\u005C', '').replace('\\u002D', '-')

    def de_json_str(self, text):
        """
         string 转 json
        :param text:
        :return:
        """
        return text.replace('"[', '[').replace(']"', ']')

    def request(self, loan_id):
        url = self.url.format(loan_id)
        try:
            self.fetcher.refresh()
            print('==========> 正在请求 {}, count: {}'.format(url, self.count))
            resp = requests.get(url, headers=self.headers)
            if resp.status_code != 200:
                return

            return resp.text
        except Exception as exc:
            print('请求{}异常，详情：{}'.format(url, repr(exc)))

    def ts_convert(self, ts, _format: str = '%Y-%m-%d'):
        """
        时间戳转换
        :param ts:
        :param _format:
        :return:
        """
        ts = int(str(ts)[0:10])
        return datetime.utcfromtimestamp(ts).strftime(_format)

    def get_loan(self, info, detail, loan, borrower):
        """
        获取贷款信息
        :param loan:
        :param borrower:
        :return:
        """
        result = {
            # loan id
            'loan_id': loan.get('loanId'),
            # 标的总额
            'borrow_amount': loan.get('amount'),
            # 年利率
            'interest': '{}%'.format(loan.get('interest')),
            # 还款期限
            'months': loan.get('months'),
            # 起息日
            'pass_time': self.ts_convert(loan.get('passTime')),
            # 风险等级
            'credit_level': borrower.get('creditLevel'),
            # 借款描述
            'description': loan.get('description'),
            # 还款来源
            'repay_source': '--' if info.get('repaySource') is None else info.get('repaySource'),
            # 提前还款率
            'in_repay_penal_fee': detail.get('inRepayPenalFee'),
            # 加入人次
            'join_count': detail.get('joinCount')
        }
        data_info = ['loanId', '标的总额(元)', '年利率', '还款期限(月)', '起息日', '风险等级', '借款描述', '还款来源', '提前还款率', '加入人次']

        left_months = loan.get('leftMonths')
        if left_months is None or left_months == 0:
            result.update({
                # 还清时间
                'close_time': self.ts_convert(loan.get('closeTime')),
            })
            data_info.append('还清时间')
        else:
            result.update({
                # 剩余期数
                'left_months': left_months,
                # 下一还款日
                'next_repay_date': detail.get('nextRepayDate'),
            })
            data_info.append('剩余期数')
            data_info.append('下一还款日')

        return result, data_info

    def get_borrower(self, info, borrower):
        """
        获取借款人信息
        :param borrower:
        :return:
        """
        data_info = ['用户ID', '名称', '头像', '性别', '生日', '婚姻', '工作城市', '公司行业', '公司规模', '岗位职位', '收入', '工作时间', '学历',
                     '房产', '房贷', '车产', '车贷', '公司详细地址', '姓名', '身份证', '手机号', '其他负债']

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

        result = {
            # 用户id
            'user_id': borrower.get('userId'),
            # 名称
            'nick_name': borrower.get('nickName'),
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
            # 公司详细地址
            'office': borrower.get('office'),
            # 姓名
            'real_name': borrower.get('realName'),
            # 身份证
            'id_no': borrower.get('idNo'),
            # 手机号
            'mobile': borrower.get('mobile'),
            # 其他负债 null为无
            'has_other_debt': 0 if info.get('hasOthDebt') is None else 1,
        }
        return result, data_info

    def get_status(self, info):
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

    # def sheet_init(self, data_info):
    #     for i in range(0, len(data_info)):
    #         self.sheet.write(0, i, data_info[i])
    #
    # def save_to_excel(self, data):
    #     for i, v in enumerate(data):
    #         print(v)
    #         self.sheet.write(self.count, i, v)
    #     self.book.save('renrendai.xls')
    def sheet_init(self, data_title):
        if not os.path.exists(self.file_path):
            self.excel = xlwt.Workbook()
            self.sheet = self.excel.add_sheet('renrendai')
            for i, v in enumerate(data_title):
                self.sheet.write(0, i, v)
        else:
            rexcel = open_workbook(self.file_path, formatting_info=True)
            # 获取行数
            self.rows = rexcel.sheets()[0].nrows
            print('==========> sheet init 复制文件一共{}行'.format(self.rows))
            self.excel = copy(rexcel)
            self.sheet = self.excel.get_sheet(0)

    def save_to_excel(self, data):
        for i, v in enumerate(data):
            if self.rows is not None:
                self.rows += 1
                self.sheet.write(self.rows, i, v)
            else:
                self.sheet.write(self.count, i, v)
        self.excel.save(self.file_path)

    def parser(self, html):
        """
        解析并保存到excel
        :param html:
        :return:
        """
        pattern = "var.?info.?=.?'(.*?)';?\n+?var.?detail.?=.?'(.*?)';?\n+?var.?isTransfer.?=.?'(.*?)';?\n+?var.?isLogin.?=.?'(.*?)';?\n+?var.?loanId.?=.?'(.*?)';?\n+?var.?hasAccount.?=.?'(.*?)';?\n+?var.buyResult.?=.?'(.*?)';?\n+?var.?guaranteeMode.?=.?'(.*?)';?\n+?var.?riskInfo.?=.?'(.*?)';?\n+?var.?nodePayInfo.?=.?'(.*?)';?\n+?var.?riskTipsData.?=.?'(.*?)';?\nvar.?showTransferContractRisk.?=.?'(.*?)';?\n+?var.?showLoanContractRisk.?=.?'(.*?)'"
        results = re.findall(pattern, html)[0]
        if len(results) != 13:
            return
        info = json.loads(self.de_json_str(self.de_unicode(results[0])))
        detail = json.loads(self.de_json_str(self.de_unicode(results[1])))
        loan_id = self.de_unicode(results[4])
        print('==========> 正在解析 loanId: ', loan_id)

        l = info.get('loan')
        b = info.get('borrower')
        ulr = info.get('userLoanRecord')

        data_info = []  # 保存数据标题
        data = []  # 保存数据内容

        # 贷款信息
        loan, loan_title = self.get_loan(info, detail, l, b)
        # 借款人信息
        borrower, borrower_title = self.get_borrower(info, b)
        # 信用信息
        user_loan_record, record_title = self.get_loan_record(ulr)
        # 审核状态
        passed_status, passed_title = self.get_status(info)

        for _ in loan_title: data_info.append(_)
        for _ in borrower_title: data_info.append(_)
        for _ in record_title: data_info.append(_)
        for _ in passed_title: data_info.append(_)

        for k in loan.keys(): data.append(loan.get(k))
        for k in borrower.keys(): data.append(borrower.get(k))
        for k in user_loan_record.keys(): data.append(user_loan_record.get(k))
        for k in passed_status.keys(): data.append(passed_status.get(k))

        if self.count == 1:
            self.sheet_init(data_info)
        self.save_to_excel(data)
        self.count += 1
        print('\n')
