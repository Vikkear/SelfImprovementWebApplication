const Todolist = require("../../db/models/Todolist");

module.exports = (app) => {
  app.post("/updatetodo", (req, res) => {
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

  app.post("/gettodo", (req, res) => {
    const username = req.body.username;

    Todolist.findOne({ where: { username: username } }).then((resTwo) => {
      res.status(202).json(resTwo);
    });
  });
};
