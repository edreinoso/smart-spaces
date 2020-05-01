# Smart Spaces

![aws-devops](https://personal-website-assets.s3.amazonaws.com/Projects/smart_spaces.png)

### Goal:
Sensing motion in a certain space to determine availability through a mobile application.

### Motivation:
When I was working for Deloitte, there was a real problem in getting a 60 minute phone since there was no way to know whether this was available or not. As they were first come first serve, the majority of the times practitioners had to end up spending over 5 minutes wandering around floors to look for one private room to have their meetings. This is where this application would help employees know which rooms are available.

### Use Cases:
There are a number of use cases that can be drawn with this concept of motion detection, among some are:
- Security systems
- Switching lights
- Automatic doors
among other posibilities

### Tech stack description:
This application uses a variety of technologies to accomplish the goal of showing availability on a certain space. It is primarly composed by a frontend, business logic and the backend. 
- Frontend is developed in React Native using Expo as testing and deployment mechanism. 
- Business logic is using the serverless framework, which deploys an AWS Lambda function and a DynamoDB table. 
  - Lambda function code runs on Node.js with Express Framework
  - DynamoDB would be the connection between the backend and the business logic
- Backend is a simple code that runs in the Raspberry Pi that would send data to the DynamoDB table as soon as the sensor captures motion.

### Directory structure:
- Pi:
  There is a file that handles the Pi connection with the motion sensor.
  - Language used: Python
  - Libraries: Boto3, GPIO

- Business Logic:
  This is composed by the serverless framework 
  - AWS Lambda: Node.js with Express Framework
  - serverless.yml contains all the configuration for the resources (function and ddb table) that are going to be launched
  
- Front:
  This directory has the React Native code for the application
  - Language: Javascript (React Native framework)
  - State Management: Redux
  - Libraries: Expo, React-Navigation