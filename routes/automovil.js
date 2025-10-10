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

if (typeof auth !== 'function') throw new TypeError('middleware auth no es una función');
if (typeof deleteAutomovil !== 'function') throw new TypeError('deleteAutomovil no es una función en controllers/automovilController.js');

router.post("/", auth, createAutomovil);
router.get("/", getAutomoviles);
router.get("/:id", getAutomovilById);
router.put("/:id", auth, updateAutomovil);
router.delete("/:id", auth, deleteAutomovil);

module.exports = router;
