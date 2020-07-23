
# this script adds neuvo job descriptions to a docx file
# requirements: pip install python-docx
# To run from CLI: python -m neuvo_scrap
from youtube_scrap import get_page
from docx import Document


def neuvo_scrap(url):
    path = r"S:\Altele\CV's\Aplicatii"

    # Get info
    page = get_page(url)
    title = page.find('title').text.replace('Job ', '') + ".docx"
    content = page.find('div', class_="view-job-description").text

    # Make document
    document = Document()
    document.add_paragraph(content)
    document.save(path + "\\" + title)
    # TODO: make it take arguments


if __name__ == '__main__':
    print("Working on it")
    neuvo_scrap(r"https://ie.neuvoo.com/view/?id=ca214c1afb48&pag=2&pos=3&utm_medium=email&source=neuvoo-email&tl1=s21_v27&tl2=ckr1_v27&tl3=ddp_v27&tl4=&tl5=hourly_limited_5d_daily_budget_v12&tlf=fcd_v27&user_id=48bb3504b2acdf1f14ee4b48439f888b&tgroup=MTA2&send_group=high&current_group=instant_full&email_source=view-b&refid=7b3e0f9b531e&email_datein=2020-06-24T15%3A27%3A11Z&email_datesent=2020-07-02T17%3A58%3A45Z&utm_source=gmail.com&email_status=active&wc_email=no&lang=en&splitab=1&action=emailAlert")
