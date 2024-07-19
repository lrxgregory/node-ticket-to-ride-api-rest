Start project nodeJS
npm init

Installer express.js
npm install express --save

Install nodemon (restart server when a change has been detected)
npm install --save-dev nodemon

Add script for npm start on the package.json file
  "scripts": {
    "start": "nodemon app.js"
  },

Install express.js
npm install express --save

Start with express on app.js : 

const express = require ('express')

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello express JS'))

app.listen(port, () => console.log(`App start on port ${port}`))

Install middle morgan to manage request HTTP
npm install morgan --save-dev

Install middleware to manage favicon
npm install serve-favicon --save

Install middleware to parse strings to JSON
npm install body-parser --save

Install ORM sequelize (Folder src\models get models for sequelize) 
npm install sequelize --save

Installer mariadb
npm install mariadb --save