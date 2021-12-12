# Dependencies
import pandas as pd
from pprint import pprint
from splinter import Browser
from bs4 import BeautifulSoup as bs
from sqlalchemy import create_engine
from webdriver_manager.chrome import ChromeDriverManager


# Define function to choose the executable path
def init_browser():
    executable_path = {"executable_path": ChromeDriverManager().install()}
    return Browser("chrome", **executable_path, headless = False, user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36")

# Set variable for multiple use string
parser = "html.parser"

# Full Scrape function
def scrape():

    # Connect to Mars News Site
    browser = init_browser()    

    """ 9News Bushfire News """
    # Visit to 9News website
    bushfire_news_url = "http://www.9news.com.au/bushfires"
    browser.visit(bushfire_news_url)

    # HTML Object
    html = browser.html

    # Parse HTML with Beautiful Soup
    news_soup = bs(html, parser)

    # Retrieve the latest article's title
    news_title = news_soup.find("h3", class_ = "story__headline")
    news_title = news_title.text.strip()
    print(news_title)

    # Retrieve the latest article's paragraph
    news_paragraph = news_soup.find("div", class_ = "story__abstract")
    news_paragraph = news_paragraph.text.strip()
    print(news_paragraph)


    """ Featured Image from 9News"""
    # Parse HTML with Beautiful Soup
    image_soup = bs(html, parser)

    # Assign the full url string to a variable called "featured_image_url"
    featured_image = image_soup.body.find_all("figure", class_ = "feed__image")
    for i in featured_image:
        featured_image_url = i.img["src"]
    
    """ Data Dictionary """
    # Create dictionary for all Mars Data
    bushfire = {}

    # Append news_title and news_paragraph to mars_data
    bushfire["news_title"] = news_title
    bushfire["news_paragraph"] = news_paragraph  
    bushfire["featured_image_url"] = featured_image_url

    # Exit Browser
    browser.quit()
    
    # Store the scraped data into a DataFrame
    fire_news_df = pd.DataFrame.from_dict(bushfire, orient = "index")
    fire_news_df_t = fire_news_df.T
    fire_news_df_t = fire_news_df_t.set_index("news_title")
        
    # Connection to PostgreSQL
    connection_string = "postgres:HnF071019@localhost:5433/bushFire_db"
    engine = create_engine(f"postgresql://{connection_string}")

    # Store DataFrame into PostgreSQL
    fire_news_df_t.to_sql(name = "fire_latest_news", con = engine, if_exists = "append", index = True)

    return bushfire