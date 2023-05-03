# Solita pre-assignment

## Project description

Purpose for this application was to create a web application for displaying citybike data. The application's database is hosted in mongoDB Atlas which's free tier had storage only for around half of the data, so the database is filled with 1.5m journeys and the stations data.

The data is validated using Python [(notebook)](https://colab.research.google.com/drive/1W69s5jaew1L7bPouCLr2QHLOqxofv6P7#scrollTo=vaagiWcFLFcr) with the following requirements:

- Validate data before importing
- Don't import journeys that lasted for less than ten seconds
- Don't import journeys that covered distances shorter than 10 meters

The data was then imported onto mongoDB Atlas db using `mongoimport`

The application has following features:

### Journeys view

- Fetching and rendering the journeys data
- Pagination implementation together with fetching 20 results at a time
- Search bar for filtering the results by their departure/return stations
- Ordering results per column

### Stations view

- Fetching and rendering the stations data
- Pagination implementation together with fetching 20 results at a time
- Search bar for filtering the results by the station name

### Single station view

- Displays basic data about the station
- Shows total journeys starting/ending from/to the station
- Station location on a Google Map component
- Average distances for journeys starting/ending from/to the station
- Top 5 most popular return/departure stations for journeys starting/ending from/at the station
- Filtering the calculations by month

### Create station view

- API endpoints for new station creation
- UI for new station creation (can be accessed from stations view)

### Testing

- E2E tests with Cypress

## Instructions for running the application locally

- Clone repository in terminal and open it
- Run `npm install` to install dependencies
- Run `npm run dev` to start the application in development mode (so you don't need to build the app)
- process.env?

## E2E testing

The application has E2E tests with Cypress. To run the tests, you need 2 terminals open where you need to run commands as following:

- Terminal 1: `npm run dev`
- Terminal 2: `npx cypress open`

## Technologies

Short description for which technologies were used in the project and why.

For data validation, I chose to use Python because at the start of the year I had a neural network course where I did a lot of data validation using numPy and pandas libraries.

For the web application, I used Next.js 13 with TypeScript because I have just done a project using Next.js for my friends competing in a business idea competition. I like developing with Next.js alot especially because of the server side rendering aspect.

For data fetching, I was before this used to React Query and I had heard of Vercel's SWR, so I decided to just try it out for fun in this project. I also use the native fetch API where I create a form, because I had a problem using SWR's mutation.
