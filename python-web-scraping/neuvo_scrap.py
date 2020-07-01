
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
    neuvo_scrap(r"https://ie.neuvoo.com/view/?id=7cde420336f0&pag=1&pos=1&utm_medium=email&source=neuvoo-email&tl1=s33_v27&tl2=c_default&tl3=d_default_en_v27&tl4=&tl5=hourly_limited_5d_daily_budget_v12&tlf=fcd_v27&user_id=48bb3504b2acdf1f14ee4b48439f888b&tgroup=MTA3&send_group=medium&current_group=instant_full&email_source=view-b&refid=42c7ccc9f9c3&email_datein=2020-07-01T13%3A15%3A54Z&email_datesent=2020-07-01T13%3A16%3A00Z&utm_source=gmail.com&email_status=active&wc_email=yes&lang=en&splitab=1&action=emailAlert")