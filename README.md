# HOMER_Challenge

This is the source code for the Homer code challenge. The framework used was nodejs with Mongo as DB. 

## Demo
In a web browser, curl, PostMan or any app that can process http(s) requests:
point to: http://40.75.93.209:8080/get_weather/<ZIP CODE>
          http://40.75.93.209:8080/get_weather/90210  

  
## Pre-requisites
Operating system: Any Linux (debian, ubuntu, etc)
nodejs version > 8.10
MongoDB: 5.0.2 
Port: 8080 (Can be any available)

## Installation
git clone https://github.com/luballe/HOMER_Challenge

## Load ZIPcodes coordinates to NoSQL Database (MongoDB):
node insert_zips_coords.js

## Run
cd HOMER_Challenge/
npm run start

## Test a ZIP Code
Example: get forecast info for the zipcode 90210
point to http://localhost:8080/get_weather/90210

## Relevant source code:
Please check https://github.com/luballe/HOMER_Challenge/blob/main/api/controllers/weatherController.js 
  
Note: For time reasons, I only managed to finish the RESTFul API
