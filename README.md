# Personal Trainer Dashboard Web Application
## Overview
This is a Personal Trainer Dashboard web application designed to help trainers manage their athletes, view workout trends, and track performance. The application provides a responsive user interface, analytics dashboards, and functionality for managing athletes, workout sessions, and exercise insights.

## Features for Functionality Criteria
- Athlete Management:
Manage athlete profiles. Athletes can be added via the athletes page, and deleted via the accounts page.
Search for athletes via a responsive search bar.

- Create Workout Programs:
Workout programs are made by navigating to the athletes calendar page, where sessions can be made for each date.
There is functionality to view and update existing sesisons, or create new ones.

- Manage Exercise Library:
New exercises can be added into the database via the workout management screens, where users can select 'new exercise' when selecting a specific exercise.
Exercises can also be deleted through the accounts page. 

- Analytics Dashboard:
View performance overview and exercise-specific insights.
Track trends such as total workouts, total weight lifted, and average performance per session.
Filter data by date and exercise.
This is connected to the database, but there is no functionality (from this users view) to adjust this data. This is based on user input via the mobile application. If you would like to see an example of how it communicates with the database, select Alex Johnson, with the any date between 2nd October and 15th October, with either Lunges or DB Press as your exercise. This is dummy data inputted for your convenience. I opted to display metrics in tabular form over data visualisation simply because there wasn't enough information being parsed into the database for these visuals to be useful.

- Calendar of Scheduled Coaching Sessions:
Navigating to any athletes calendar (from the dummy data) will show you existing sessions that have been created. You can add a workout session and see how this updates. 

- Advanced Feature:
I have used a custom database and a PostgREST API as my advanced feature. The database structure can be located in 'DB Structure.sql'.
## Technologies Used
### Frontend:
- React.js
- CSS
### API:
- PostgREST for RESTful endpoints to interact with the database.
- Custom API calls to fetch athlete details, performance data, and exercise insights, as well as Post and others.

### Database:
- PostgreSQL with the following key tables (found in DB Structure.sql for convenience):
  - users: Stores information about all users for both coaches and clients.
  - athletes: Stores athlete information such as name, age, and fitness goals.
  - exercises: Stores a list of all exercise usable in the system.
  - workout_sessions: Tracks workout sessions for each athlete.
  - workout_details: Tracks specific details of individual session.
  - workout_sets: Tracks specific sets for individual exercises in workout_details.
  - exercise_performance: Records performance metrics for each athlete and exercise.
  - workout_trends: Aggregates workout data to show trends over time.

## Setup Instructions
1. Install Dependencies
Ensure you have Node.js and npm installed. Then, install the necessary dependencies by running:  
npm install

2. Run the Development Server
To start the development server, run:  
npm start

3. The app will be available at http://localhost:3000.

## Gen AI Disclaimer
Generative AI has been used consistently throughout this project in an attempt to improve consistency among components, as well as improving readbility through refactoring. It was also used as an aid in quickly debugging errors.
