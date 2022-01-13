mkdir crud-api cd crud-api

{
 
    "name": "rest-harper",
     
    "version": "1.0.0",
     
    "description": "",
     
    "main": "index.js", "scripts": {
    "start": "nodemon index.js"
     
    },
     
    "keywords": [],
     
    "author": "",
     
    "license": "ISC", "dependencies": {
    "cors": "^2.8.5",
     
    "dotenv": "^10.0.0",
     
    "express": "^4.17.1",
     
    "harperive": "^2.0.1",
     
    "nodemon": "^2.0.13"
     
    }
     
    }

    const express = require("express");
    const app = express(); 
    app.use(express.json());

    const express = require("express");
    const app = express();
    require("dotenv").config();
    app.use(express.json());
 
const PORT = process.env.PORT || 5000;
  
app.use((req, res, next) => {
 
res.setHeader("Access-Control-Allow-Origin", "*"); res.setHeader(
"Access-Control-Allow-Methods",
 
"GET, POST, OPTIONS, PUT, PATCH, DELETE"
 
);
 
res.setHeader(
 
"Access-Control-Allow-Headers",
 
"X-Requested-With,content-type"
 
);
 
res.setHeader("Access-Control-Allow-Credentials", true);
 
next();
});

    app.use("/testing", require("./routes/testing.routes.js"));
    app.use("/students", require("./routes/students.routes.js"));
    app.listen(process.env.PORT, () => {
 console.log(`App is currently running at http://localhost:${PORT}`);
   });

    const harperive = require("harperive");
    const configuration = {
username: process.env.HARPER_INSTANCE_USERNAME, password: process.env.HARPER_INSTANCE_PASSWORD, schema: process.env.HARPER_INSTANCE_SCHEMA, harperHost: process.env.HARPER_HOST_INSTANCE_URL,
};
    const db = new harperive.Client(configuration); module.exports = db;

    const controller = require("../controllers/testing.controllers.js");
    const router = require("express").Router();
router.get("/appinfo", controller.getAppInfo); module.exports = router;

    const router = require("express").Router();
    const controller = require("../controllers/" + "students" + ".controllers");
 
router
 
.get("/", controller.getAllStudent)
 
.get("/:id", controller.getOneStudent)
 
.post("/", controller.createOneStudent)
 
.put("/:id", controller.updateOneStudent)
 
.delete("/:id", controller.deleteOneStudent); module.exports = router;

exports.getAppInfo = (req, res, next) => {
 
    return res.status(200).json({ "Aviyel CRUD API Testing": "v1.0.0" });
    };

    const client = require("../util/db");
 
    const DB_SCHEMA = process.env.HARPER_INSTANCE_SCHEMA; const TABLE = "students";

    //Get all the student
 exports.getAllStudent = async (req, res, next) => { try {
    const qry = `SELECT * FROM ${DB_SCHEMA}.${TABLE}`; const students = await client.query(qry); res.json(students);
    } catch (error) {
    console.error("ERROR while fetching all student " + "Student:", error); return res.status(500).json(error)}};
    
    //Get only one student
 
exports.getOneStudent = async (req, res, next) => {
  
    try {
     
    const qry = `SELECT * FROM ${DB_SCHEMA}.${TABLE} WHERE id="${req.params.id}"`; const student = await client.query(qry);
     
    res.json(student);
     
    } catch (error) {
     
    console.error("ERROR while fetching student " + "Student:", error); return res.status(500).json(error);
    }
     
    };

    
//create new student
 exports.createOneStudent = async (req, res, next) => { try {
    const user = await client.insert({ table: TABLE,
    records: [
     {
    username: req.body.username, password: req.body.password, rollNumber: req.body.rollNumber,
    },
     ],
    });
    res.json(user);
     } catch (error) { res.json(error);
    }};

    //update one student
 exports.updateOneStudent = async (req, res, next) => { try {
    const updateStudent = await client.update({ table: TABLE,
    records: [
      {
     id: req.params.id,
     username: req.body.username,
     },
     ],
     });
     password: req.body.password, rollNumber: req.body.rollNumber,
    res.json(updateStudent);
    } catch (error) { res.status(500).json(error);
    }
     };

     //Delete one student
 exports.deleteOneStudent = async (req, res, next) => { try {
    const qry = `DELETE FROM ${DB_SCHEMA}.${TABLE} WHERE id="${req.params.id}"`; const deleteStudent = await client.query(qry);
    res.json(deleteStudent);
     } catch (error) { res.status(500).json(error);
    }
     };

     