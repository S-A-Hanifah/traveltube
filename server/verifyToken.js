import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token + " " + "***END HERE***" + " ")
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.PRIV_KEY, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};
