const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createAutomovil,
  getAutomoviles,
  getAutomovilById,
  updateAutomovil,
  deleteAutomovil,
} = require("../controllers/automovilController");

router.post("/", auth, createAutomovil);
router.get("/", getAutomoviles);
router.get("/:id", getAutomovilById);
router.put("/:id", auth, updateAutomovil);
router.delete("/:id", auth, deleteAutomovil);

module.exports = router;
