const adminMiddleware = (req, res, next) => {
  try {

    //   console.log(req.user);
      const adminRole = req.user.isAdmin;
      if (!adminRole) {
        return res.status(403).json({ message: "Unauthorized" });
      }
    // res.status(200).json({ message: req.user.isAdmin });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;
