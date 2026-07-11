# -*- coding: utf-8 -*-
"""生成《阿布扎比出差常用英语50句》PDF卡片"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table,
                                TableStyle, KeepTogether)
from reportlab.lib.styles import ParagraphStyle

# 注册中文字体（微软雅黑）
pdfmetrics.registerFont(TTFont('YaHei', r'C:\Windows\Fonts\msyh.ttc'))
pdfmetrics.registerFont(TTFont('YaHeiBold', r'C:\Windows\Fonts\msyhbd.ttc'))
# 音标用 Segoe UI（IPA 字符覆盖全，雅黑缺字形会显示方框）
pdfmetrics.registerFont(TTFont('SegoeUI', r'C:\Windows\Fonts\segoeui.ttf'))

PRIMARY = colors.HexColor('#1a5276')   # 深蓝
ACCENT = colors.HexColor('#d4ac0d')    # 金色（阿布扎比风）
LIGHT = colors.HexColor('#eaf2f8')     # 浅蓝底
GREY = colors.HexColor('#555555')

title_style = ParagraphStyle('title', fontName='YaHeiBold', fontSize=20,
                             leading=26, textColor=PRIMARY, alignment=1,
                             spaceAfter=4)
subtitle_style = ParagraphStyle('subtitle', fontName='YaHei', fontSize=10,
                                leading=14, textColor=GREY, alignment=1,
                                spaceAfter=8)
cat_style = ParagraphStyle('cat', fontName='YaHeiBold', fontSize=12,
                           textColor=colors.white, leading=16)
en_style = ParagraphStyle('en', fontName='YaHeiBold', fontSize=10.5,
                          textColor=colors.HexColor('#212f3d'), leading=14)
ipa_style = ParagraphStyle('ipa', fontName='SegoeUI', fontSize=8.5,
                           textColor=colors.HexColor('#7f8c8d'), leading=11)
cn_style = ParagraphStyle('cn', fontName='YaHei', fontSize=9.5,
                          textColor=GREY, leading=13)
num_style = ParagraphStyle('num', fontName='YaHeiBold', fontSize=10,
                           textColor=ACCENT, alignment=1)
tip_style = ParagraphStyle('tip', fontName='YaHei', fontSize=9.5,
                           textColor=colors.HexColor('#212f3d'), leading=15,
                           leftIndent=4)
tip_title_style = ParagraphStyle('tiptitle', fontName='YaHeiBold', fontSize=12,
                                 textColor=PRIMARY, leading=16, spaceBefore=6,
                                 spaceAfter=4)

# 每条: (英文, 中文说明, 音标[可选，长单词标注])
DATA = [
    ("一、机场 / 过关", [
        ("Business trip.", "出差（海关问来干嘛，答这一句就够）",
         "business /ˈbɪznəs/"),
        ("One week.", "待一周（问停留多久，直接说数字+时间）", None),
        ("Where is the taxi?", "出租车在哪？", None),
        ("Where can I get my luggage? / My luggage is lost.",
         "去哪拿我的行李？/ 我行李丢了", "luggage /ˈlʌɡɪdʒ/"),
        ("Can I have a SIM card?", "我想买张电话卡", None),
    ]),
    ("二、打车 / 出行", [
        ("To this address, please.", "去这个地址（同时把手机上的地址给司机看）",
         "address /əˈdres/"),
        ("How much?", "多少钱？", None),
        ("Stop here, please.", "就停这儿", None),
        ("By card or cash?", "刷卡还是现金？", None),
        ("How long will it take?", "要多久？", None),
        ("Receipt, please.", "请给我发票（p不发音；餐厅、酒店要发票也是这句）",
         "receipt /rɪˈsiːt/"),
    ]),
    ("三、酒店", [
        ("I have a reservation.", "我有预订（报名字或出示手机订单）",
         "reservation /ˌrezərˈveɪʃn/"),
        ("Check in, please. / Check out, please.", "办入住 / 退房", None),
        ("What's the Wi-Fi password?", "Wi-Fi密码是多少？",
         "password /ˈpæswɜːrd/"),
        ("Can I have breakfast? What time?", "有早餐吗？几点？",
         "breakfast /ˈbrekfəst/"),
        ("The AC is not working.", "空调坏了（东西坏了都说 ... is not working）",
         None),
    ]),
    ("四、餐厅点餐", [
        ("A table for two, please.", "两个人，要个位子", None),
        ("Menu, please.", "请给我菜单", "menu /ˈmenjuː/"),
        ("This one, please.（指着菜单）", "就要这个（万能点餐句，配合手指用）", None),
        ("No spicy. / No pork.",
         "不要辣 / 不要猪肉（辣度：mild 微辣、medium 中辣、extra spicy 加辣）",
         "spicy /ˈspaɪsi/"),
        ("Bill, please.", "买单", None),
    ]),
    ("五、商务会面", [
        ("Nice to meet you.", "很高兴见到你", None),
        ("Sorry, my English is not good.", "抱歉我英语不太好（先说这句，对方会放慢语速）",
         None),
        ("Could you speak slowly, please?", "请说慢一点", "slowly /ˈsloʊli/"),
        ("Let me check and reply later.", "我查一下稍后回复（听不懂当场答不了时的救命句）",
         "reply /rɪˈplaɪ/"),
    ]),
    ("六、听不懂时的万能救场句 ★最重要", [
        ("Sorry? / Pardon?", "你说什么？（请对方重复）", "pardon /ˈpɑːrdn/"),
        ("Could you say that again?", "能再说一遍吗？", None),
        ("Can you write it down?", "能写下来吗？（写下来就能看懂，哑巴英语神器）", None),
        ("Can you type it here?（递手机翻译软件）", "能打在这里吗？", None),
        ("I understand. / I don't understand.",
         "我明白 / 我不明白（更口语：I see. 懂了 / I don't get it. 没懂）",
         "understand /ˌʌndərˈstænd/"),
    ]),
    ("七、购物 / 付款", [
        ("How much is this?", "这个多少钱？", None),
        ("Too expensive. Any discount?", "太贵了，有折扣吗？",
         "expensive /ɪkˈspensɪv/ · discount /ˈdɪskaʊnt/"),
        ("Can I pay by card?", "能刷卡吗？", None),
        ("Can I try it?", "能试试吗？", None),
        ("I'll take it.", "我买了", None),
    ]),
    ("八、问路 / 找地方", [
        ("Where is the toilet / washroom?",
         "洗手间在哪？（toilet / washroom / restroom 都可以）",
         "toilet /ˈtɔɪlət/ · washroom /ˈwɑːʃruːm/"),
        ("Where is the metro station?", "地铁站在哪？",
         "metro station /ˈmetroʊ ˈsteɪʃn/"),
        ("Is it far?", "远吗？", None),
        ("Can you show me on the map?", "能在地图上指给我看吗？", None),
        ("I'm looking for this place.（出示手机）", "我找这个地方", None),
    ]),
    ("九、电话 / 网络沟通", [
        ("Can you send me a message?",
         "能发消息给我吗？（也可说 Can you text me?；打电话听不懂，转文字）",
         "message /ˈmesɪdʒ/"),
        ("Please email me.", "请发邮件给我", None),
        ("What's your WhatsApp?", "你的WhatsApp是多少？（中东商务通用，相当于微信）",
         None),
        ("I'll call you back.", "我再回你电话", None),
        ("Sorry, I can't hear you.", "抱歉我听不清", None),
    ]),
    ("十、紧急 / 求助", [
        ("Can you help me?", "能帮我一下吗？", None),
        ("I need a doctor.", "我需要看医生", None),
        ("Call the police, please.", "请帮我报警", "police /pəˈliːs/"),
        ("I lost my passport.", "我护照丢了", "passport /ˈpæspɔːrt/"),
        ("Where is the Chinese Embassy?", "中国大使馆在哪？",
         "embassy /ˈembəsi/"),
    ]),
]

TIPS = [
    "<b>万能句型只有三个</b>：Where is ...?（找东西）、Can I have ...?（要东西）、How much?（问价格），掌握这三个能应付80%场景。",
    "<b>手机是你最好的翻译</b>：地址、订单、要买的东西，直接出示手机截图，配一句 \"This one\" 或 \"This place\" 就行。",
    "<b>打车要发票</b>：正规银色出租车说 \"Receipt, please.\" 即可打印小票；用 Careem / Uber 打车，发票自动发邮箱，报销更方便，全程不用开口。",
    "<b>别有心理负担</b>：阿布扎比服务业大量是印度、菲律宾、巴基斯坦人，他们英语也带口音，不介意你说得慢。",
    "<b>听不懂就求文字</b>：用第六类救场句让对方写下来或打字，比硬听有效得多。出发前下载 Google 翻译离线包（阿联酋可正常使用），支持语音对话和拍照翻译。",
]

doc = SimpleDocTemplate(
    "阿布扎比出差常用英语50句.pdf", pagesize=A4,
    leftMargin=15*mm, rightMargin=15*mm, topMargin=14*mm, bottomMargin=14*mm,
    title="阿布扎比出差常用英语50句", author="出差随身卡片")

story = [
    Paragraph("阿布扎比出差常用英语 50 句", title_style),
    Spacer(1, 3*mm),
    Paragraph("按场景分类 · 中英对照 · 随身速查卡", subtitle_style),
    Spacer(1, 2*mm),
]

num = 1
for cat, phrases in DATA:
    rows = []
    for en, cn, ipa in phrases:
        en_cell = [Paragraph(en, en_style)]
        if ipa:
            en_cell.append(Paragraph(ipa, ipa_style))
        rows.append([
            Paragraph(str(num), num_style),
            en_cell,
            Paragraph(cn, cn_style),
        ])
        num += 1
    header = Table([[Paragraph(cat, cat_style)]], colWidths=[180*mm])
    header.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), PRIMARY),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    body = Table(rows, colWidths=[10*mm, 82*mm, 88*mm])
    style = [
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
        ('LINEBELOW', (0, 0), (-1, -2), 0.3, colors.HexColor('#d5dbdb')),
    ]
    for i in range(len(rows)):
        if i % 2 == 1:
            style.append(('BACKGROUND', (0, i), (-1, i), LIGHT))
    body.setStyle(TableStyle(style))
    story.append(KeepTogether([header, body, Spacer(1, 5*mm)]))

story.append(Paragraph("实用提示", tip_title_style))
for t in TIPS:
    story.append(Paragraph("• " + t, tip_style))
    story.append(Spacer(1, 1.5*mm))

doc.build(story)
print("OK")
