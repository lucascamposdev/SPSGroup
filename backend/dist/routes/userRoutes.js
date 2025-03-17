"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const isAdmin_1 = require("../middleware/isAdmin");
const router = express_1.default.Router();
router.get("/", authMiddleware_1.authenticate, userController_1.getUsers);
router.get("/:id", authMiddleware_1.authenticate, userController_1.getUserById);
router.post("/", authMiddleware_1.authenticate, isAdmin_1.isAdmin, userController_1.createUser);
router.put("/:id", authMiddleware_1.authenticate, isAdmin_1.isAdmin, userController_1.updateUser);
router.delete("/:id", authMiddleware_1.authenticate, isAdmin_1.isAdmin, userController_1.deleteUser);
exports.default = router;
