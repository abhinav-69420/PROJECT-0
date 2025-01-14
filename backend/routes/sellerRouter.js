const express = require("express");
const sellerRouter = express.Router();
const sellerController = require("../controller/sellerControllers");
const authMiddleware = require("../middleware/userAuth");
const roleMiddleware = require("../middleware/roleMiddleware");
const { validateSeller } = require("../utils/validation");


sellerRouter.post("/signupseller",sellerController.signupSeller);
sellerRouter.post("/loginseller", validateSeller, sellerController.loginSeller);
sellerRouter.get("/profileseller", authMiddleware, sellerController.getSeller);
sellerRouter.put("/updateseller", authMiddleware, sellerController.updateSeller);
sellerRouter.delete("/deleteseller", authMiddleware, sellerController.deleteSeller);

// View All Sellers (Admin Only)
sellerRouter.get("/allsellers", authMiddleware, roleMiddleware("admin"), sellerController.viewSellers);
sellerRouter.get("/allbuyers", authMiddleware, roleMiddleware("admin"), sellerController.viewBuyers);


// Error Handling Middleware
sellerRouter.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
  });


module.exports = sellerRouter;