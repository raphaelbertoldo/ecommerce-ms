export const processOrder = (req, res) => {
  // TODO consume order
  res.status(200).send({ key: req.params.id });
};
