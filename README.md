# Lynk - MEAN App

A MEAN stack application is located under `/lynk` directory. Both server and client code directories are as follows: 

- Web Server (`lynk/server.js`) implemented in node.js utilizing models and routes under (`lynk/app`)  directory.
- Angular App (`lynk/public/app`) that handles front-end logic. (`lynk/public/app.js`) is starting point for Angular, a main module that manages dependency injection. 

## How it works 

- When the server is fired up, go to (http://localhost:8080) in the browser, login page welcomes the user. If not registered, a sure can sign up using `Signup` link on the header. Upon successful login or signup actions, the user is redirected to `dashboard` which displays projects breakdown. Unless the user is logged in or signed up, it is not allowed to navigate to `dashboard`, `history`, and individual project pages. 
- The app uses `jwt` to authenticate the user, which stored in the local storage of the user's browser. 
- User can log out, which removes the token from the local storage, by clicking on the logout button on the header that appears upon authentication. 
- To mimick the real life situation, some project details were hard-coded to (`lynk/app/modelsprojects.js`) file. Each project as well as an expert is named after one of the Marvel Cinematic Universe heroes. When the server is up, it automatically writes those projects&experts to DB named `lynk`.
- On dashboard, the user can click on any of the project names, which immediately redirects the user to project details page by using the permanent links. Those can be used in any other browser if any authentication token is present in the given browser, which is required in order to display the project details and make any change.  
- On project details page, a user can reject or approve the expert assigned by using the toggle buttons. First the buttons are set to `off` mode, regardless of the expert status. Once either one clicked, the other will remain in the opposite state. Thus, one action can manage the state of both toggle buttons. Once clicked, project status is set to `PENDING`, the respective project is updated on the db and each toggle button writes the action to history DB.
- On history page, the user can inspect the actions taken only by himself. Sort the table by each column or go back to dashboard by clicking `Dashboard` on the header. 

## Assumptions made

- Using two toggle buttons to change the expert status initially seemed problematic from the UI perspective. I tried to hide either one when it is set to 'on' but it ended up not observing the transition from green to red color on the button thus reverted to former case. 
- As mentioned above, some test data has been filled into DB in order to check if the app is functioning properly and if the project date is expired, the status was manually set to `EXPIRED`, therefore no date comparison function was implemented. In this case, when the server is fired up, only `NEW` and `EXPIRED` projects are present in the DB, and when the user either approve or reject the expert, the project status is set to `PENDING` and it is automatically reflected on the project DB.

## How to launch the app

* Run `npm install` to install dependencies. 
* Run `npm start` (starts the web server on port:8080).
* Open (http://localhost:8080) in the browser. 

## Prerequisites:

* Node.js v4.2 or later
* Google Chrome 46 or later

