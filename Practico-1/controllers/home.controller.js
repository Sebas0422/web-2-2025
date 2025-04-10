exports.index = (req, res) => {
  const title = "Hola a todos";
  res.render("pages/index.ejs", { title });
};
