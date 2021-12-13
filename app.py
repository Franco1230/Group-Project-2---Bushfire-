# Dependencies
import scrape_fire
from flask_pymongo import PyMongo

from sqlalchemy import inspect
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy.inspection import inspect
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.sql.operators import op

import numpy as np
import pandas as pd

from flask import render_template, Flask, jsonify, redirect

# DATABASE_URL = ''
# DATABASE_URL='postgresql://postgres:monash123@localhost/bushFire_db'
# conn = psycopg2.connect(DATABASE_URL, sslmode='require')
# cur = conn.cursor()

app = Flask(__name__)
engine = create_engine(f'postgresql://postgres:HnF071019@localhost:5433/bushFire_db')
mongo = PyMongo(app, uri = "mongodb://localhost:27017/bushfire_db")

# Use the Inspector to explore the database and print the table names
inspector = inspect(engine)
# print((inspector.get_table_names()))

# Use Inspector to print the column names and types
columns= inspector.get_columns('fire_location')
# for column in columns:
#     print(column["name"], column["type"])

# Use `engine.execute` to select and display 
print(engine.execute('SELECT * FROM fire_location LIMIT 5').fetchall())

# Reflect Database into ORM class
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

fire_loc = Base.classes.fire_location
forest_damage = Base.classes.forest_damage

# session = Session(engine)

# fire_news = session.query(fire_latest_news.news_title).all()
# print(fire_news)
# # # psycopg2
# # # sqlAlchemy
# # # @app.route("/fetch/data")
# # # def fetch_data():
    
# # #     data = conn.query()
# # #     return json(data)

# # # Create route that renders index.html
@app.route("/")
def home():
    
    session = Session(engine)

    # # Find data from Mongo DB
    bushfire = mongo.db.bushfire.find_one()

    results = session.query(fire_loc.latitude).all()
    example_embed='This string is from python'

    session.close()
    return render_template("index.html", bushfire = bushfire)

# # # Route that will trigger the scrape function
@app.route("/scrape")
def scrape():

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
    # all_names = list(np.ravel(results))
    # print(all_names)
    loc_table=session.query(fire_loc).all()
    session.close()
    cols=['sr','latitude','longitude','acq_date']
    r=[{col: getattr(d, col) for col in cols} for d in loc_table]
    
    return jsonify(r)

# @app.route("/bushFireData")
# def bfdata():
#     import requests
#     import json
    
#     params = {
#     "format": "json"
#     }
#     # Find one record of data from the mongo database
#     d=requests.get('http://127.0.0.1:5000/fetch/mapData',params=params)
#     # data = json.loads(d)
#     # Return template and data
#     with open('data.json','w') as f:
#         f.write(json.dumps(d))
#     return render_template("map_index.html")

# # # Route that will trigger the scrape function
@app.route("/graph")
def map():
    session = Session(engine)
    loc_table=session.query(fire_loc).all()
    return jsonify(loc_table)

if __name__ == "__main__":
    app.run(debug = True)