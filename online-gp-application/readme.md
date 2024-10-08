

An automated System for Local GPs:

##Overview
An automated System for local GPs is a web-based application where all the users such as patients, doctors/nurses and admin can login to the application and access the health care services.

##Features
1. User Authentication 
2. Patient Appointment Booking System
3. Patient Profile System
4. Patient Information Hub
5. Prescription Management System
6. Doctor Scheduling System
7. Doctor Prescription System
8. Analytics Dashboard
9. Add Doctor Profile
10. Patient  Support Chat
11. Admin Support Requests
12. Notification System
13. Doctor Patient details
14. Prescription Payment Functionality

##Code Structure
Folders in SVN Path ( svn_working_dir\svn_project\code\trunk -> 
1. gpapplication –  Back end ( Java) - svn_working_dir\svn_project\code\trunk-> backend
2. onlinegp – Front end (React JS) - svn_working_dir\svn_project\code\trunk-> frontend
3. onlinegp.sql - MYSQL database file

##IDE Setup
Executing Java Spring Boot Application in Eclipse :
Install Java JDK, JRE version as '17' to execute this project.
Download MySQL Workbench
Download Visual Studio Code

##Open existing project in Eclipse IDE
Download ()project  file -> Open the project -> Import project in Eclipse ->Existing  Maven Projects -> Add MYSQL properties in application.properties(src/main/resources)  file.
Add mysql properties  in application.properties file . It consists of 3 parameters datasource.url, username, password . Please add values of mysql jdbc url, username , password for testing the application.
(If application is still unable to run , check pom.xml (Any error exists) . Click on Window -> Preferences -> Maven -> Download Artifact Java Doc (Check the option).
Execute the below spring boot project with a class name of GPApplication.java -> Run As -> Java Application
Change below details / MYSQL DB properties in application.properties file
server.port = 8083
spring.datasource.url
spring.datasource.username
spring.datasource.password

Path of this file : Project Folder-> online-gp/src/main/java-> GPApplication.java
To execute the back-end services code , import the MySQL as DB
 After executing the java project , Tomcat server will be running on localhost server with the port 8083.
 
##Setup Mysql DB :
 Create database onlinegp.
MySQL File Path :
onlinegp.sql file 
Run onlinegp.sql file statements in MySQL DB.
The author have added required tables in this database.

##Install libraries, node modules,  in VSCode
 To create a new React project using Vite in
Terminal, follow these steps:
1. Entering ‘npm create vite@latest’ command in the VSCode Terminal.
2. It displays a list of frameworks to choose from. Please use arrow keys to select 'React'.
3. After selecting the framework, we can set the language preference to 'JavaScript'.
4. The 'npm install or npm i' commands will select the necessary tools and frameworks and
install all the node modules.
5. Later, by clicking ‘npm run dev’ in the terminal, The project is running on the default port.
The author can change the port number by adding the preferred port number in the
‘vite.config.js’ file.
6. Run this command ‘npm install react react-dom react-chartjs-2’ in the terminal.
7. Run this command ‘npm install chart.js’ in the terminal.
8. Run this command ‘npm install axios’ in the terminal.

##Open existing project in VSCode

Open 'online-gp' folder and import into Visual Studio Code . Right Click On Project Folder -> Open in Integrated Terminal -> terminal will be displayed . 
Enter npm run dev command in terminal and application will be starting in 3000 port.
In Google Chrome , Online GP Application is started as shown in http://localhost:3000/login.



