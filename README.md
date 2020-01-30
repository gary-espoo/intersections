## Full Stack Coding Challenge

Thank you for taking the time to take our full stack coding test which  is part of our full stack developer selection process.

We have generated a starter skeleton Nestjs Project for you in this repo, included in the root project directory, all the data you need to work with are in the data/data.json file

### Objectives

The aim of this challenge is for us to be able to: 

* Evaluate your coding abilities
* Judge your technical experience
* Understand how you design a solution
* Assess your ability to learn a framework
* Assess your problem solving skills

### Scoring

You will be scored on

* Coding standard, reactivity, comments and style
* Testing strategies
* Application of algorithms and data structures
* Overall solution design

## Installation

* Install the latest version of Node.js [Node.js](https://nodejs.org)
* Install the Nestjs cli globally on your system [Nestjs](https://docs.nestjs.com/)
```bash
npm i -g @nestjs/cli
```
* Please fork this repo into your own public repo to start, if you don't have an account on GitHub, please register a new account, or optionally clone this repo and submit your work on a zipped archive,
if you use this method, ensure you exclude the **node_modules** folder
* Install Node.js dependencies
```bash
npm install
```

### Instructions

* Please use universal JavaScript.
* You are required to use NestJs for the backend
* You can use Vuejs or React for the front end 
* Use the provided JSON file (data.json) as a data source
* Use any CSS framework of your choice
* Write as many Unit Tests as you can
* Deliver the final solution along with source code in a zipped archive (e.g. ```firstname_lastname.zip```) and upload it to the location shared in the email.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Challenge

Write a full stack application that exposes a RESTful web service API with a reactive client to manage time series event data filtering based on the specifications below:

![ui-diagram](https://user-images.githubusercontent.com/45851461/72795117-8685ef80-3c56-11ea-8829-05db8d4d9495.png)

### Data Model

The application manages a list of Speed Violations recorded from various Intersections down the road, those violations are grouped into a hierarchy structure as depicted in the figure below.

![data-model](https://user-images.githubusercontent.com/45851461/72795188-9f8ea080-3c56-11ea-9822-269ec2b859a7.png)

* The data belongs to intersections that belong to at least a Default Zone.
* Zones may contain multiple intersections and belong to at least one Project.
* Projects may contain multiple Zones.

The provided intersection data includes traffic violations with corresponding IDs, Violation Times and the speed of the vehicle when the violation occurred. 

### UI

The goal of the application is to explore violations using reactive cascading filters by date/time, by Project/Projects, by Zone/Zones, or by Intersection/Intersections in any combination which is essentially a combination of multiple data filter.  An example is depicted in the figure below.

![ui-diagram](https://user-images.githubusercontent.com/45851461/72795117-8685ef80-3c56-11ea-8829-05db8d4d9495.png)

Cascading filters are dynamic and flow top to bottom

A Project/Projects selection will affect the Zone/Zones which in turn will affect Intersection/Intersections.
Making a selection from any of the dropdown filters should reflect on the others and reactively cause a refetch of violations from the data source (Violations List)

**Note: When there is no selection in the filters, or when the filters are reset, all violations from all available Intersection options should be listed.**

### Design

Build a user interface as illustrated that displays a filtered list of violations and a filter panel

Implement dropdown filters in the order below:
* Start Date (Date/Time selector)
* End Date (Date/Time selector)
* Projects (multi-select dropdown)
* Zones (multi-select dropdown)
* Intersections (multi-select dropdown)

Provide an option to select a day of the week (Sunday to Saturday) and display the average speed of all violations recorded on the selected day from the filtered list, if Sunday is selected, all violation speeds from all Sundays included are averaged and displayed

Display the total Number of filtered violations below the list

Provide a Reset Filters button option to clear all the filters, for Date filters, display last week data by default

### Build Instructions

* Compile the client application into ES5 that can run in the browser
* Include the client in a static public folder on the same server port of the back end
* Compile/Build the backend NestJS Application using npm run build command
* The application should be runnable from the dist compiled folder using npm run main.js command.