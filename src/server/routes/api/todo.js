const Todolist = require("../../db/models/Todolist");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
  function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(401).send({ message: "knas" });

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      console.log(err);
      if (err) return res.status(403).send({ err: err });
      req.user = user;
      next();
    });
  }

  app.post("/updatetodo", authenticateToken, (req, res) => {
    let data = { username: req.body.username, todo: req.body.todo };

    Todolist.findOne({
      where: { username: data.username },
    }).then((user) => {
      if (!user) {
        Todolist.create({ username: data.username, todo: data.todo }).then(
          (resTwo) => {
            res.status(201).json(resTwo);
          }
        );
      } else {
        Todolist.update(data, { where: { username: data.username } }).then(
          (resTwo) => {
            res.status(200).json(resTwo);
          }
        );
      }
    });
  });

  app.post("/gettodo", authenticateToken, (req, res) => {
    const username = req.body.username;

    Todolist.findOne({ where: { username: username } }).then((resTwo) => {
      res.status(202).json(resTwo);
    });
  });
};
