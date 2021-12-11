# Dependencies

from sqlalchemy import inspect
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from flask import Flask, jsonify
# Create an instance of Flask
import os
import psycopg2
from sqlalchemy.inspection import inspect
from sqlalchemy import create_engine
import numpy as np
import pandas as pd
from flask import render_template
# DATABASE_URL = ''
# DATABASE_URL='postgresql://postgres:monash123@localhost/bushFire_db'
# conn = psycopg2.connect(DATABASE_URL, sslmode='require')
# cur = conn.cursor()

app = Flask(__name__)
engine = create_engine(f'postgresql://postgres:monash123@localhost/bushFire_db')

# Use the Inspector to explore the database and print the table names
inspector = inspect(engine)
print((inspector.get_table_names()))

# Use Inspector to print the column names and types
columns= inspector.get_columns('fire_location')
for column in columns:
    print(column["name"], column["type"])

# Use `engine.execute` to select and display 
print(engine.execute('SELECT * FROM fire_location LIMIT 5').fetchall())

# Reflect Database into ORM class
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
print(Base.classes.keys())
fire_loc = Base.classes.fire_location
forest_damage = Base.classes.forest_damage
fire_latest_news = Base.classes.fire_latest_news



# # # psycopg2
# # # sqlAlchemy
# # # @app.route("/fetch/data")
# # # def fetch_data():
    
# # #     data = conn.query()
# # #     return json(data)

# # # Create route that renders index.html
@app.route("/")
def home(): 

    # # Find data from Mongo DB
   
    return render_template("index.html")

# # # Route that will trigger the scrape function
@app.route("/scrape")
def scrape():

    # Call to run the scrape function
    bushfire = scrape_fire.scrape()

    # Update the Mongo DB each time when new scrape happen
    mongo.db.bushfire.update({}, bushfire, upsert = True)

    # Back to the home page
    return redirect("/", code = 302)

# # # Route that will trigger the mapData function
@app.route("/fetch/mapData")
def mapData():
    # Start a session to query the database
    session = Session(engine)

    results = session.query(fire_loc.latitude).all()
# Unpack 
    all_names = list(np.ravel(results))
    print(all_names)
    loc_table=session.query(fire_location).all()
    session.close()
    return jsonify(loc_table)
# @app.route("/bushFiremap")
# def home():

#     # Find one record of data from the mongo database
#     destination_data = db.items.find_one()

#     # Return template and data
#     return render_template("map_index.html", mars=destination_data,tables=destination_data['facts_html'])

# # # Route that will trigger the scrape function
@app.route("/graph")
def map():
    loc_table=session.query(fire_location).all()##
    return json(loc_table)

if __name__ == "__main__":
    app.run(debug = True)









  