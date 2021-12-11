# Dependencies

from sqlalchemy import inspect
from sqlalchemy import create_engine, func
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
# Create an instance of Flask
import scrape_fire
import os
import psycopg2
from sqlalchemy.inspection import inspect
import numpy as np
import pandas as pd
from flask import render_template
from flask import Flask, jsonify
# DATABASE_URL = ''
# DATABASE_URL='postgresql://postgres:monash123@localhost/bushFire_db'
# conn = psycopg2.connect(DATABASE_URL, sslmode='require')
# cur = conn.cursor()


engine = create_engine(f'postgresql://postgres:HnF071019@localhost/bushFire_db')

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
Base.prepare(engine, reflect=True)

fire_loc = Base.classes.fire_location

app = Flask(__name__)

# Start a session to query the database
session = Session(engine)

results = session.query(fire_loc.latitude).all()
# Unpack 
all_names = list(np.ravel(results))
print(all_names)

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
    # bushfire = mongo.db.bushfire.find_one()

    # Return template and data
    
    lat = session.query(fire_loc.latitude).all()
    return render_template("index.html", bushfire = lat)

# # # Route that will trigger the scrape function
@app.route("/scrape")
def scrape():

    # Call to run the scrape function
    bushfire = scrape_fire.scrape()

    # Back to the home page
    return jsonify(bushfire)

# # # Route that will trigger the scrape function
@app.route("/map")
def map():
    session = Session(engine)
    loc_table = session.query(fire_loc).all()
    session.close()
    return jsonify(loc_table)

# # # Route that will trigger the scrape function
@app.route("/graph")
def map():
    loc_table=session.query(fire_loc).all()##
    return jsonify(loc_table)

if __name__ == "__main__":
    app.run(debug = True)









  