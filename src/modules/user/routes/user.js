const router = require("express").Router({ mergeParams: true });
const {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  createUser,
} = require("../controllers/user");
const { protect, authorize } = require("../../../middleware/auth");
const advanceResults = require("../../../middleware/advanceResults");
const User = require("../models/User");

// require token
router.use(protect);

// check if the user is admin from token
router.use(authorize("admin"));

router.route("/").get(advanceResults(User),getUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
