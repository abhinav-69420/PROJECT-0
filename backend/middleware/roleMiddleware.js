const roleMiddleware = (role) => {
    return (req, res, next) => {
      if (req.user.role !== role) {
        return res.status(403).json({ message: "Access denied. You do not have the required role." });
      }
      next();
    };
  };
  
module.exports = roleMiddleware;