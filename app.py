# Dependencies
from sqlalchemy.sql.expression import null
import scrape_fire
from flask_pymongo import PyMongo
from flask import Flask, render_template, redirect
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
# Create an instance of Flask

engine = create_engine(f'postgresql://postgres:monash123@localhost/bushFire_db')
session = Session(engine)

# # reflect an existing database into a new model
Base = automap_base()
Base.prepare(engine, reflect=True)
fire_location=Base.classes.fire_location
print("firelocation is: "+fire_location)
results = session.query(bushFire_db.fire_location.latitude).all()
all_names = list(np.ravel(results))

print(all_names)
# Save reference to the table
# Fire = Base.classes.keys()
app = Flask(__name__)
session.close()
print(Fire)




# # Use PyMongo to establish Mongo connection
# # mongo = PyMongo(app, uri = "mongodb://localhost:27017/bushfire_db")
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:monash123@localhost/bushFire_db'
# # create a connection here
# db = SQLAlchemy(app)

# # psycopg2
# # sqlAlchemy
# # @app.route("/fetch/data")
# # def fetch_data():
    
# #     data = conn.query()
# #     return json(data)

# # Create route that renders index.html
# @app.route("/")
# def home(): 

#     # # Find data from Mongo DB
#     # bushfire = mongo.db.bushfire.find_one()

#     # Return template and data
#     lat=db.query(fire_location.latitude).all()
#     return render_template("index.html", bushfire = lat)

# # Route that will trigger the scrape function
# @app.route("/scrape")
# def scrape():

#     # Call to run the scrape function
#     bushfire = scrape_fire.scrape()

#     # Update the Mongo DB each time when new scrape happen
#     mongo.db.bushfire.update({}, bushfire, upsert = True)

#     # Back to the home page
#     return redirect("/", code = 302)

if __name__ == "__main__":
    app.run(debug = True)









  