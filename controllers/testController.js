const testController = (req, res) =>
  res.status(200).send({
    message: "test route 1",
    success: true,
  });

module.exports = { testController };
