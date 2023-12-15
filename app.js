const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 3333; //Config env at the top
const connectDB = require("./db");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/auth");
const jwt = require("jsonwebtoken");
app.use(express.json()); //1
app.use(cors()); //2
connectDB();
const foodControllerRoutes = require("./controllers/foodController"); //router can be used like this too
const { router } = require("./controllers/foodController"); // destructring is better tho

//need error and input handler...

const User = require("./models/userModel");
// Middleware for JWT verification
app.use(async (req, res, next) => {
  const excludedPaths = [
    //authorize these paths
    "/auth/register",
    "/auth/login",
    "/api/food",
    "/api/food/latest",
  ];

  // Exclude certain routes from authentication
  if (excludedPaths.includes(req.path)) {
    return next();
  }
  const token = req.headers.authorization;

  if (!token) {
    console.log("no token");
    return res.status(401).json({ message: "Unauthorized" });
  }

  // console.log("Incoming Token:", token); //check token
  const secret = process.env.SECRET_KEY;
  try {
    // Adjust the secret key according to your JWT setup
    const decodedToken = jwt.verify(token, secret); //this key should be somewhat secret.

    // Retrieve user details from the database based on the decoded token
    const user = await User.findById(decodedToken.userId);
    console.log(user.role);
    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }

    // Make user details available in the request object
    req.user = user;
    // Check if the user has the 'admin' role
    if (user.role === "admin") {
      // Allow access to AddFood and RemoveFood routes for admin
      return next();
    } else {
      // Restrict access for other roles
      return res
        .status(403)
        .json({ message: `Your role is:  ${user.role} , so it is forbidden!` });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid token" });
  }
});
//middlewares
app.use("/auth", authRoutes);
app.use("/api/food", router);

app.listen(port, () => {
  // sayHello();
  console.log(`listening on port ${port}`);
});
