const express = require("express");
const {
  addProperty,
  getAllProperties,
  editProperty,
  deleteProperty,
  getAllPropertiesPublic,
} = require("../controllers/propertyController");
const { jwtAuthMiddleWareUser } = require("../middlewares.js/authmiddleware");

const router = express.Router();

router.post("/login/AddProperty", jwtAuthMiddleWareUser, addProperty);
router.get("/login/allProperty", jwtAuthMiddleWareUser, getAllProperties);
router.put("/login/editProperty/:id", jwtAuthMiddleWareUser, editProperty);
router.delete("/login/deleteProperty/:id", jwtAuthMiddleWareUser, deleteProperty);
router.get("/login/properties", getAllPropertiesPublic);

module.exports = router;
