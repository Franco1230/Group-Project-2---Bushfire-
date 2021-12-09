# Dependencies
import scrape_fire
from flask_pymongo import PyMongo
from sqlalchemy import create_engine
from flask import Flask, render_template, redirect

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri = "mongodb://localhost:27017/bushfire_db")
# connection_string = "postgres:HnF071019@localhost:5432/bushFire_db"
# engine = create_engine(f"postgresql://{connection_string}")

# Create route that renders index.html
@app.route("/")
def home(): 

    # Find data from Mongo DB
    bushfire = mongo.db.bushfire.find_one()
    # bushfire = 

    # Return template and data
    return render_template("index.html", bushfire = bushfire)

# Route that will trigger the scrape function
@app.route("/scrape")
def scrape():

    # Call to run the scrape function
    bushfire = scrape_fire.scrape()

    # Update the Mongo DB each time when new scrape happen
    mongo.db.bushfire.update({}, bushfire, upsert = True)

    # Back to the home page
    return redirect("/", code = 302)

if __name__ == "__main__":
    app.run(debug = True)