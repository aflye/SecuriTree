# SecuriTree
 EPI-USE Recruiting Exercise 2021. Completed by Keanu Swart.
## About SecuriTree
SecuriTree is an access control management application that provides a visual tree view of the security and access control units installed in a client’s system. This application will allow authorized security operatives to monitor and manage each physical security and access control unit, at a client’s premises from one central location.
## Technologies Used:
### Framework: Electron.js
Electron is an open-sourced framework, powered by Github that allows for the creation of desktop applications (GUI) by making use of web-technologies such as Node.js, HTML and CSS. The choice for Electron.js was made since the desktop application approach was made for the system, Electron being the most-reliable and widely-used desktop application development framework to date.
### Backend: Node.js
The backend technology chosen was Node.js, a Javascript runtime language. Node.js was chosen as it serves as the runtime environment for Electron.js and offers a very structured approach with regards to the framework, allowing for cohesive work/file management. Node.js makes use of an event-based model, allowing for asynchronous request handling which assists greatly towards database calling or even data retrieval, allowing for faster synchronization and system runtime especially working from page to page. Node.js in addition to Electron.js offer a large spectrum of libraries through npm which were used in the system, including ipc, bcrypt and BrowserWindow, allowing for faster production and smoother workflow.
### Frontend: HTML CSS
As standard procedure, HTML and CSS were used for the frontend technologies. They were used since they are the conventional go-to's regarding web-development and since Electron.js makes use of web-development technologies, HTML and CSS were great options since they are adequate with regards to page-structuring and styling, allowing the users experience to be as smooth and pleasing as possible.
### Database: MySQL
MySQL is an open-source Relational Database Management System (RDMS) which was used since it is very adaptable to the technologies already being used since it is so widely used over the world. MySQL offers 24/7 uptime which contributes to the users usability and performance since a connection to the database needed will always be available. In addition, MySQL offers intense Data Security measures to make sure your data in the database is always safe.
### Server: Amazon Web Service (AWS)
The system makes use of AWS as the database-hosting server. AWS is the world-leading cloud computing service that provides servers, remote computing and storage to users. AWS was chosen due to its MySQL compatibility and because of how simplistic it is to set-up the database-hosting server for free, making it very cost-effective. AWS also offers reliable security measures, making sure the data that you have stored on their servers will not be breached or leaked.

## Architecture
### Architectural Style:
The Model-View-Controller (MVC) Architectural Style was chosen for this system. Since SecuriTree is a small-scale system with a small quantity of data that needs to be accessed, it was appropriate to make use of a simplistic yet effective architectural style that is considerate of all entities within the system. The View of the system being the UI being displayed through Electron.js by means of HTML and CSS and the Controller being the interface between the Model and View, in this system it would be the database and the ipc commands which serves as the links between Model and Controller as well as View and Controller, allowing the system to take in requests or data sent by the user from the View component, allow the request to be processed and updated by the Model into the Controller, which is the database. The Model of the architecture being the 
### Architectural Quality Requirements:
The quality requirements are the requirements pertaining to the quality attributes of the system and the service it provides. With this in mind, three core quality requirements were able to be looked into with respect to SecuriTree:
#### Performance:
Performance describes how well the system works during run time as well as how the server that provides the connection to the database works with the system. This is a quality requirement since performance of the system effects the usability. The system must possess the capacity to support the database - more specifically the users and the areas. In order for performance to be consistent and dependable, fast connection time as well as swift-and-speedy movement between pages was needed, in a way that still meets the basic requirements of connecting to the database and having a secure connection. Ontop of these features, making use of a desktop application allows the user to not be as dependent on internet connection as they would of been with regards to a web-based application.
#### Reliability:
Considering the systems core purpose is security, security among the users of the application was vital. In order to perform reliability adequate, encryption and decryption of the users password was needed in order to ensure safety and user protection. Among encryption of fields within the database, a secure connection from the server to the system was need which is why AWS was chosen as a technology as it supplies layers of security within their hosting server, including encryption server-side and key management. The system is expected to have almsot 100% up-time, the faulty being if the connection to the database is unavailable due to internet connection errors or weakness or if the connection to the AWS RDS is very weak.
#### Usability:
Usability covers the prioritization of optimizing the user experience by creating a visibly pleasing and easy-to-use application interface. The system supports the fact that it will be easy-to-use by users of any computer literacy level by having a clear and concise indication of what is being displayed and what is needed by the user. The interface is very simplistic thus making it easy to follow, navigate and read. It should take users a very little amount of time to login with correct details and ontop of that, very little time to navigate to the page that they need to go to. In addition, the interface makes use of a very pleasing colour-scheme that highlights the instructions of each page.
### Architectural Constraints:
There were very minimal constraints given for the deployment of this system. It is worth mentioning the difficulties however, which include hosting the MySQL Database through AWS and making sure connection and runtime worked inclusively and smooth.
### Architectural Diagram:
![MVC](https://user-images.githubusercontent.com/77483903/132148492-eb415d38-9cd0-4890-a10f-4347369d8067.jpg)
#### Client Machine:
This is the user, making use of the features of the system.
#### Model:
This is the representation of the data being transferred between the View and Controller as well as the retrieval and modification of data to and from the Database.
#### View:
The View of the system being the UI being displayed. This is the representation of the data and responses being passed through by the Model.
#### Controller:
Acting as the interface between the View and Model, the Controller accepts the requests from the Client Machine and invokes the Model to process the request. Once the Controller has accepted the request of the Client, if needed, it will update the View.
#### Database
Tis is where the data on the server will be stored and retrieved from when needed. It is directly connected to the Model since Model needs access to the data in order to fulfill requests of the Client.
## User Manual
### - Open your browser and navigate to the link: https://github.com/KeanuSwart/SecuriTree
### - Once on the page, click on the green 'Code' button and use any method of choice to clone the repository. You can use anywhere on your PC to clone the repository.
![image](https://user-images.githubusercontent.com/77483903/132152298-2db0a794-eb7c-41c3-83ae-27b5ea1a9901.png)
### - When the repository is cloned, please navigate to the 'SecuriTree' folder on your PC (wherever you cloned the repository to) and open your terminal/command prompt.
### - In your terminal/command prompt please type: 'npm i && npm run start'.
![image](https://user-images.githubusercontent.com/77483903/132152448-e5aae0ce-49e1-4779-8a8e-16bfd96388ee.png)
### - The application should run. Please give it time to start up since it needs to connect to the AWS initially and install packages.
If you are having issues with a non responsive login page, please re-run the application. This happens due to a poor connection to the AWS that is being used.
### - Please enter your valid login credentials on the Login Page (This is the page that you land on).
![image](https://user-images.githubusercontent.com/77483903/132153110-c66fdfef-8a9a-452c-b63f-8ba8c58ed47a.png)
### - Now that you are logged in you may navigate to 'View Security Entity Hierarchy', 'Manage Doors' or 'Logout'
![image](https://user-images.githubusercontent.com/77483903/132153205-0d506270-4068-49d7-8589-ff5e4cb4de1e.png)
### - If you navigate to 'View Security Entity Hierarchy', you will be met with the Security Hierarchy. Please give the page a few seconds to load. Press Esc to go back.
![image](https://user-images.githubusercontent.com/77483903/132153323-c8d755bf-1a8d-4493-b775-5926f7507435.png)
### - If you navigate to 'Manage Doors', you will be met with the Manage Doors Menu Options.
![image](https://user-images.githubusercontent.com/77483903/132153435-5099fb71-10ed-4007-91b1-bad50ef0ebba.png)
### - If you choose to Lock or Unlock the Door, the following pages will be displayed. Press Esc to go back.
#### Lock
![image](https://user-images.githubusercontent.com/77483903/132153514-0908b5db-dd11-4522-bebc-ec41690cfe00.png)
#### Unlock
![image](https://user-images.githubusercontent.com/77483903/132153558-ddad78fc-03a9-4f44-865f-30718c54be80.png)
### - Please enter a valid Door ID to lock or unlock. Press Esc to go back.
### - Once you are back to the 'Main Menu', you may press Esc to Log out or simply click 'Logout'.
I hope you enjoy using SecuriTree.
