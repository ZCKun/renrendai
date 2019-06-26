# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class RenrendaiItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    data = scrapy.Field()
    data_title = scrapy.Field()
    count = scrapy.Field()
    loan_id = scrapy.Field()
