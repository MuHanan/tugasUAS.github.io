{
    "name":"rest",
    "version":"1.0.0",
    "description":"",
    "main":"index.js", "scripts":{
    "start":"nodemon server.js"
    },
     
    "keywords":[
     ],
    "author":"",
    "license":"ISC", "dependencies":{
    "cors":"^2.8.5",
    "dotenv":"^10.0.0",
    "express":"^4.17.1",
    "mongoose":"^6.0.8",
    "nodemon":"^2.0.13"
    }
    }

    const express = require("express");
 const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// listen app.listen(PORT, () =>
console.log(`Server is running on http://localhost:${PORT}`)
);
const mongoose = require("mongoose"); 
require("dotenv").config();
 const dbURL = process.env.MONGO_DB_URL;
 const configDatabase = async () => { try {
await mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true,
 });
console.log("Database connected");
} catch (err) { console.log(err); process.exit(1);
}
};
  
module.exports = configDatabase;

const express = require("express");
 const cors = require("cors");
const configDatabase = require("./dbConfig/database.js");
 const dotenv = require("dotenv");
 dotenv.config();
 const app = express();
 const PORT = process.env.PORT || 5000;
 //connecting to the mongodb database configDatabase();
 app.use(cors({ origin: true, credentials: true }));
 // add the middlewares app.use(express.json({ extended: false })); app.get("/", (req, res) =>
res.send("Hello there!! Cheers !! The server is up and running")
);
 
 // listen app.listen(PORT, () =>
console.log(`Server is running on http://localhost:${PORT}`)
);

const mongoose = require("mongoose");
 const TodoListSchema = new mongoose.Schema({ title: {
type: String, required: true,
},
description: { type: String,
},
date: {
 type: Date,
 default: Date.now,
},
});
 
const Todo = mongoose.model("todo", TodoListSchema);
module.exports = Todo;

const express = require("express");
 const router = express.Router();
 const { listAllTodo, createTodo, updateTodo, deleteTodo,
} = require("../controllers/todo.controller.js");
 router.get("/", listAllTodo);
 router.post("/", createTodo);
 router.put("/:id", updateTodo);
 router.delete("/:id", deleteTodo);
 module.exports = router;

const Todo = require("../models/todo.models.js");

exports.listAllTodo = (req, res) => { Todo.find()
.then((todo) => { console.log({ todo }); res.json(todo);
})
.catch((err) => { res
.status(404)
.json({ message: "There isnt any todo available", error: err.message });
});
};

exports.createTodo = (req, res) => { Todo.create(req.body)
.then((todo) => { console.log({ todo }); res.json({
message: "Cheers!! You have successfully added TODO", todo,
});
})
.catch((err) => { res.status(404).json({
message: "Sorry your todo list cannot be added", error: err.message,
});
});
};

exports.updateTodo = (req, res) => { Todo.findByIdAndUpdate(req.params.id, req.body)
.then((todo) => { console.log({ todo }); return res.json({
message: "Cheers!! You have successfully updated TODO", todo,
});
})
.catch((err) => { res.status(404).json({
message: "Sorry your todo list cannot be updated", error: err.message,
});
});
};

exports.deleteTodo = (req, res) => { Todo.findByIdAndRemove(req.params.id, req.body)
.then((todo) => { console.log({ todo }); res.json({
message: "Cheers!! You have successfully deleted your TODO", todo,
});
})
.catch((err) => { res.status(404).json({
message: "Sorry your todo is not there", error: err.message,
});
});
};

const express = require("express"); 
const cors = require("cors");
const configDatabase = require("./dbConfig/database.js");
 const todo = require("./routes/todo.routes.js");
 const dotenv = require("dotenv");
 dotenv.config();
 const app = express();
 const PORT = process.env.PORT || 5000;
 
 //connecting to the mongodb database configDatabase();
 app.use(cors({ origin: true, credentials: true }));
 // add the middlewares app.use(express.json({ extended: false })); app.get("/", (req, res) =>
res.send("Hello there!! Cheers !! The server is up and running")
);
// using our routes app.use("/api/todo", todo);
 
// listen app.listen(PORT, () =>
console.log(`Server is running on http://localhost:${PORT}`)
);
