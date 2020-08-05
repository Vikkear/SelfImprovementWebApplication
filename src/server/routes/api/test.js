module.exports = (app) => {
  app.get("/asd", (req, res) => {
    res.json({ Message: "hej" });
  });
};
