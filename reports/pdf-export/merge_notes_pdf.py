# -*- coding: utf-8 -*-
"""将《其他事项.txt》整理为附加章节，追加到《出差阿布扎比注意事项（详细版）.pdf》末尾"""
import io
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import ParagraphStyle
from pypdf import PdfReader, PdfWriter

SRC = r'D:\UserData\Desktop\阿布扎比本地生活导引\出差阿布扎比注意事项（详细版）.pdf'
OUT = r'D:\UserData\Desktop\阿布扎比本地生活导引\出差阿布扎比注意事项（详细版·整合）.pdf'

# 与原文档风格一致：正文宋体、标题黑体
pdfmetrics.registerFont(TTFont('SimSun', r'C:\Windows\Fonts\simsun.ttc'))
pdfmetrics.registerFont(TTFont('SimHei', r'C:\Windows\Fonts\simhei.ttf'))

h1 = ParagraphStyle('h1', fontName='SimHei', fontSize=15, leading=22,
                    spaceBefore=4, spaceAfter=8)
h2 = ParagraphStyle('h2', fontName='SimHei', fontSize=12, leading=18,
                    spaceBefore=8, spaceAfter=4)
body = ParagraphStyle('body', fontName='SimSun', fontSize=11, leading=19,
                      firstLineIndent=0, leftIndent=14, spaceAfter=3,
                      bulletIndent=2)

SECTIONS = [
    ("行前准备清单", [
        "办理护照、预订机票与酒店、购买海外保险；需去 DMT 办公的同事准备正装。",
        "个人用品：拖鞋、毛巾、牙膏、牙刷、洗护用品、隐形眼镜药水等，用于应对落地第一天；如航班时间允许，也可到达后前往温超采购。",
        "日常药品：感冒药、消炎药、维生素 C 等。",
        "戴隐形眼镜的同事：隐形眼镜药水务必从国内携带，当地超市、美妆店均无售，需到正规药店购买，非常不便。",
        "女性同事建议携带一条大围巾（春夏季薄款）：参观阿布扎比清真寺时女士需着长袖长裤并以围巾包头，现场虽可购买但价格贵且样式一般。",
        "CK850 + 日常英语必备交流（提前熟悉常用口语）。",
    ]),
    ("支付与通讯", [
        "办理 Visa / MasterCard 国际消费信用卡（推荐 Visa），并绑定 Apple Pay。",
        "提前 1 天开通国际漫游流量，落地后打开数据漫游即可使用。",
        "兑换适量现金（迪拉姆），国内兑换或抵达阿布扎比后兑换均可。",
    ]),
    ("值机与落地接机", [
        "大兴机场值机时，可能被工作人员告知阿联酋海关会抽查返程机票。可先在携程预订一张支持 24 小时免费取消的机票备用，落地入住酒店后再取消（抽查概率很低，被抽到现场再订也来得及，记得练好口语应对抽查）。",
        "新人接机：在国内提前下载好 Uber 并绑定 Visa 卡，用于支付机场打车费用；或提前兑换迪拉姆，在机场 Taxi 区域打车，下车现金支付并记得索要发票。",
        "办理酒店入住。酒店设施：1F 早餐，16F 健身房与游泳池。",
    ]),
    ("新人落地事项", [
        "日常生活用品采购：洗漱用品、防晒物品、泳衣等；熟悉本地餐饮。",
        "办理各类证件与门禁：SkyTower 门禁、DMT 门禁、工签【三个月 EID】、当地手机卡（均有对应办理指南）。",
        "通勤打车：前几次与同事同行前往办公区，记住下车地点，最好记下同事使用的具体地址，否则可能被送到不同的门、找不到办公场所；了解工作日订餐方式。",
        "获取项目人员岗位组织架构及联系方式表，便于内部沟通对齐。",
    ]),
    ("法律与习俗补充提醒", [
        "当地法律严格：行人闯红灯罚款 400 迪拉姆，务必遵守交通规则。",
        "尊重宗教信仰与当地习俗：参观清真寺注意衣着言行得体。",
        "未经允许不得对女性、儿童拍照。",
        "穆斯林国家禁止携带猪肉制品入境。",
    ]),
    ("报销与紧急联系", [
        "打车费用与国际漫游话费可按公司规定报销，注意保留凭证。",
        "务必登记海外紧急联系人与国内紧急联系人，并牢记当地报警电话（阿联酋报警 999、急救 998、火警 997）。",
    ]),
]

buf = io.BytesIO()
doc = SimpleDocTemplate(buf, pagesize=A4,
                        leftMargin=25*mm, rightMargin=25*mm,
                        topMargin=25*mm, bottomMargin=25*mm)
story = [Paragraph("六、其他事项（行前清单与新人落地指引）", h1)]
for sec, items in SECTIONS:
    story.append(Paragraph(sec + "：", h2))
    for it in items:
        story.append(Paragraph(it, body, bulletText='•'))
doc.build(story)
buf.seek(0)

writer = PdfWriter()
for page in PdfReader(SRC).pages:
    writer.add_page(page)
for page in PdfReader(buf).pages:
    writer.add_page(page)
with open(OUT, 'wb') as f:
    writer.write(f)
print('OK, total pages:', len(writer.pages))
