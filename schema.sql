CREATE TABLE fire_location(
sr varchar primary key,
latitute varchar,
longitude varchar,
acq_date varchar);

CREATE TABLE forest_damage(
state varchar primary key,
totalforesthectares varchar,
totalforestburnthectares varchar,
percentforestburnt varchar);

CREATE TABLE fire_latest_news(
news_title varchar primary key,
news_paragraph varchar,
featured_image_url varchar);