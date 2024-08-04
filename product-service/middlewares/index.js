import jwt from "jsonwebtoken";
import "dotenv/config";

export const validateToken = async (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const token = authorizationHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).send({ message: `Invalid token ${err}` });
  }
};
