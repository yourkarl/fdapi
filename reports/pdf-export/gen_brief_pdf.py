# -*- coding: utf-8 -*-
"""生成《其他事项（精简版）》单页速查PDF"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table,
                                TableStyle)
from reportlab.lib.styles import ParagraphStyle

pdfmetrics.registerFont(TTFont('YaHei', r'C:\Windows\Fonts\msyh.ttc'))
pdfmetrics.registerFont(TTFont('YaHeiBold', r'C:\Windows\Fonts\msyhbd.ttc'))

PRIMARY = colors.HexColor('#1a5276')
LIGHT = colors.HexColor('#eaf2f8')
GREY = colors.HexColor('#555555')

title_style = ParagraphStyle('title', fontName='YaHeiBold', fontSize=16,
                             leading=22, textColor=PRIMARY, alignment=1,
                             spaceAfter=2)
subtitle_style = ParagraphStyle('subtitle', fontName='YaHei', fontSize=9,
                                leading=13, textColor=GREY, alignment=1,
                                spaceAfter=6)
cat_style = ParagraphStyle('cat', fontName='YaHeiBold', fontSize=10.5,
                           textColor=colors.white, leading=14)
item_style = ParagraphStyle('item', fontName='YaHei', fontSize=9.5,
                            leading=14.5, textColor=colors.HexColor('#212f3d'))

SECTIONS = [
    ("行前准备", [
        "护照 / 机票 / 酒店 / 海外保险；去 DMT 办公带正装",
        "第一天用品：拖鞋、毛巾、洗漱（也可落地后去温超买）",
        "药品：感冒药、消炎药、维 C；<b>隐形眼镜药水国内带</b>（当地难买）",
        "女性带大围巾（薄款）：清真寺需长袖长裤+围巾包头",
    ]),
    ("支付通讯", [
        "办 Visa 卡（推荐）绑 Apple Pay",
        "提前 1 天开国际漫游，落地开数据漫游即用",
        "兑换迪拉姆现金（国内或落地兑均可）",
    ]),
    ("值机落地", [
        "海关可能抽查返程机票：携程订张 24h 免费取消的备用，落地后取消",
        "接机打车：Uber 绑 Visa 支付，或机场 Taxi 区现金付、<b>记得要发票</b>",
        "酒店：1F 早餐，16F 健身房 / 游泳池",
    ]),
    ("新人事项", [
        "采购：洗漱 / 防晒 / 泳衣；熟悉本地餐饮",
        "办理：SkyTower 门禁、DMT 门禁、工签【三个月 EID】、手机卡",
        "通勤：前几次跟同事走，<b>记下车地点和具体地址</b>；了解订餐",
        "拿到项目组织架构 + 联系方式表",
    ]),
    ("法律习俗", [
        "行人闯红灯罚 400 迪拉姆",
        "清真寺衣着言行得体；<b>不拍女性儿童</b>；禁带猪肉制品",
    ]),
    ("报销紧急", [
        "打车 + 漫游话费可报销，留好凭证",
        "登记海外 / 国内紧急联系人；报警 999、急救 998、火警 997",
    ]),
]

doc = SimpleDocTemplate(
    r'D:\UserData\Desktop\阿布扎比本地生活导引\其他事项速查（精简版）.pdf',
    pagesize=A4, leftMargin=15*mm, rightMargin=15*mm,
    topMargin=13*mm, bottomMargin=13*mm,
    title="其他事项速查（精简版）", author="出差随身卡片")

story = [
    Paragraph("阿布扎比出差 · 其他事项速查", title_style),
    Spacer(1, 2*mm),
    Paragraph("精简版 · 详细说明见《出差阿布扎比注意事项（详细版·整合）》第六章", subtitle_style),
]

for cat, items in SECTIONS:
    rows = [[Paragraph(cat, cat_style)]]
    header = Table(rows, colWidths=[180*mm])
    header.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), PRIMARY),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
    ]))
    body_rows = [[Paragraph("□", item_style), Paragraph(it, item_style)]
                 for it in items]
    body = Table(body_rows, colWidths=[8*mm, 172*mm])
    style = [
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('ALIGN', (0, 0), (0, -1), 'CENTER'),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('LINEBELOW', (0, 0), (-1, -2), 0.3, colors.HexColor('#d5dbdb')),
    ]
    for i in range(len(body_rows)):
        if i % 2 == 1:
            style.append(('BACKGROUND', (0, i), (-1, i), LIGHT))
    body.setStyle(TableStyle(style))
    story.append(header)
    story.append(body)
    story.append(Spacer(1, 3*mm))

doc.build(story)
print('OK')
