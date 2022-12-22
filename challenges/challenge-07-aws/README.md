<!--
title: 'AWS Simple HTTP Endpoint example in NodeJS'
description: 'This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->
# Challenge 07: CRUD using Serverless Framework on AWS

##### This project was developed during the DIO's Bootcamp classes, using Serverless Framework.
##### The main objective was creating Lambda functions, with Node.js (version 14), for the following actions CRUD: create, update, get an item by id and get all the items. For each Lambda function were integrated with AWS DynamoDB and also with API Gateway, where it were armazenated all the endpoints.

##### Different from the teacher during the classes, I only had success by testing the endpoints at Postman when I created a table using the AWS Console (DynamoDB), and also change the table name for this new table in all JS files.

## Requisits

##### You must have an AWS account.
##### Install Node.js.
##### Install AWS CLI.

## Start project

##### Create an User in AWS account with Administrator Permission.
##### Configure credentials with the command: aws configure
##### Install Serverless Framework with the command: npm i -g serverless
##### Deploy the application with the command: serverless deploy
