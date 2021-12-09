# Dependencies

from sqlalchemy import inspect
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
# Create an instance of Flask
import os
import psycopg2
from sqlalchemy.inspection import inspect
from sqlalchemy import create_engine
import numpy as np
import pandas as pd
# DATABASE_URL = ''
# DATABASE_URL='postgresql://postgres:monash123@localhost/bushFire_db'
# conn = psycopg2.connect(DATABASE_URL, sslmode='require')
# cur = conn.cursor()


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
Base.prepare(engine, reflect=True)
print(Base.classes.keys())
fire_loc = Base.classes.forest_damage

# Start a session to query the database
session = Session(engine)

results = session.query(fire_loc.state).all()
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
# # @app.route("/")
# # def home(): 

# #     # # Find data from Mongo DB
# #     # bushfire = mongo.db.bushfire.find_one()

# #     # Return template and data
# #     lat=db.query(fire_location.latitude).all()
# #     return render_template("index.html", bushfire = lat)

# # # Route that will trigger the scrape function
# # @app.route("/scrape")
# # def scrape():

# #     # Call to run the scrape function
# #     bushfire = scrape_fire.scrape()

# #     # Update the Mongo DB each time when new scrape happen
# #     mongo.db.bushfire.update({}, bushfire, upsert = True)

# #     # Back to the home page
# #     return redirect("/", code = 302)

if __name__ == "__main__":
    app.run(debug = True)









  