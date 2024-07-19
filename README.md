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