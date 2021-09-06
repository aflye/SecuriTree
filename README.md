# SecuriTree
 EPI-USE Recruiting Exercise 2021. Completed by Keanu Swart.
## About SecuriTree
SecuriTree is an access control management application that provides a visual tree view of the security and access control units installed in a client’s system. This application will allow authorised security operatives to monitor and manage each physical security and access control unit, at a client’s premises from one central location.
## Technologies Used:
### Framework: Electron.js
### Backend: Node.js
### Frontend: HTML CSS
### Database: MySQL
### Server: AWS
## Architecture
### Architectural Style:
The Model-View-Controller (MVC) Architectural Style was chosen for this system. Since SecuriTree is a small-scale system with a small quantity of data that needs to be accessed, it was appropriate to make use of a simplistic yet effective architectural style that is considerate of all entites within the system. The View of the system being the UI being displayed through Electron.js by meands of HTML and CSS and the Controller being the interface between the Model and View, in this system it would be the database and the ipc commands which serves as the links between Model and Controller as well as View and Controller, allowing the system to take in requests or data sent by the user from the View component, allow the request to be processed and updated by the Model into the Controller, which is the database.
### Architectural Quality Requirements:
The quality requirements are the requirements pertaining to the quality attributes of the system and the service it provides. With this in mind, three core quality requirements were able to be looked into with respect to SecuriTree:
#### Performance:
Performance describes how well the system works during run time as well as how the server that provides the connection to the database works with the system. This is a quality requirement since performance of the system effects the usability. The system must possess the capacity to support the database - more specifically the users and the areas. In order for performance to be consistent and dependable, fast connection time as well as swift-and-speedy movement between pages was needed, in a way that still meets the basic requirements of connecting to the database and having a secure connection. Ontop of these features, making use of a desktop application allows the user to not be as dependent on internet connection as they would of been with regards to a web-based application.
#### Reliability:
Considering the systems core purpose is security, security among the users of the application was vital. In order to perform reliability adequate, encryption and decryption of the users password was needed in order to ensure safety and user protection. Among encryption of fields within the database, a secure connection from the server to the system was neeed which is why AWS was chosen as a technology as it supplies layers of security within their hosting server, including encryption server-side and key management. The sytsem is expected to have 99% up-time, the faulty being if the connection to the databse is unavailable due to internet connection errors or weakness or if the connection to the AWS RDS is very weak.
#### Usability:
Usability covers the prioritisation of optimising the user experience by creating a visably pleasing and easy-to-use application interface. The system supports the fact that it will be easy-to-use by users of any computer literacy level by having a clear and concise indication of what is being displayed and what is needed by the user. The interface is very simplistic thus making it easy to follow, navigate and read. It should take users a very little amount of time to login with correct details and ontop of that, very little time to navigate to the page that they need to go to. In addition, the interface makes use of a very pleasing colour-scheme that highlights the instructions of each page.
### Architectural Constriaints:
There were very minimal constraints given for the deployment of this system. It is worth mentioning the difficulties however, which include hosting the MySQL Database through AWS and making sure connection and runtime worked inclusively and smooth.
### Architectural Diagram:
## User Manual
