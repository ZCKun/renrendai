# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html
import xlwt
import os

from xlutils.copy import copy
from xlrd import open_workbook


class RenrendaiPipeline(object):       

    def process_item(self, item, spider):
        self.file_path = '/Volumes/HDD500G/Documents/Python/Scrapy/renrendai/renrendai/renrendai.xls'
        self.count = item.get('count')
        data_title = item.get('data_title')
        data = item.get('data')
        if self.count == 1:
            self.sheet_init(data_title)
        self.save_to_excel(data)
        self.count += 1
        return '====>第 {} 条数据，loanId：{}'.format(self.count,item.get('loan_id'))

    def sheet_init(self, data_title):
        self.rows = None
        # 如果指定文件不存在，就按正常步骤创建workbook
        if not os.path.exists(self.file_path):
            self.excel = xlwt.Workbook()
            self.sheet = self.excel.add_sheet('renrendai')
            for i, v in enumerate(data_title):
                self.sheet.write(0, i, v)
        # 如果存在，就直接复制文件内内容，然后接着后面插入数据
        else:
            # 打开指定路径的文件
            rexcel = open_workbook(self.file_path, formatting_info=True)
            # 获取行数
            self.rows = rexcel.sheets()[0].nrows
            print('----------------------- sheet init 一共{}行'.format(self.rows))
            # 复制
            self.excel = copy(rexcel)
            # 获取sheet
            self.sheet = self.excel.get_sheet(0)

    def save_to_excel(self, data):
        # 如果rows不为None，说明是复制的，直接 +=1
        if self.rows is not None:
            self.rows += 1
        for i, v in enumerate(data):
            if self.rows is not None:
                self.sheet.write(self.rows, i, v)
            else: 
                self.sheet.write(self.count + 1, i, v)
        self.excel.save(self.file_path)
