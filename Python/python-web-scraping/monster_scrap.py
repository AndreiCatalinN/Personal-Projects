# this script filters monster jobs
import pprint
from youtube_scrap import get_page


def monster_scrap(url):

    job = {
        "title": "",
        "company": "",
        "location": ""
    }
    desired_job = input("Desired job: ")
    desired_location = input("Desired location: ")
    desired_company = input("Desired company: ")
    soup = get_page(url)
    # get all jobs
    results = soup.find(id='ResultsContainer')

    # get a job list
    job_elems = results.find_all('section', class_='card-content')
    for job_elem in job_elems:
        if job_elem.find('h2', class_="title"):
            job["title"] = job_elem.find('h2', class_="title").text.strip()
            job["company"] = job_elem.find('div', class_="company").text.strip()
            job["location"] = job_elem.find('div', class_="location").text.strip()
            if desired_job.lower() in job.get('title').lower() and \
                    desired_location.lower() in job.get('location').lower() and \
                    desired_company.lower() in job.get('company').lower():
                pprint.pprint(job)
                print()


if __name__ == '__main__':
    monster_scrap(r'https://www.monster.ie/jobs/search/?q=graduate')
