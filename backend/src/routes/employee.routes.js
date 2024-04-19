import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  deleteEmployee,
  getAllEmployee,
  registerEmployee,
  updateEmployee,
  updatedEmployeeAvatar,
} from "../controllers/employee.controller.js";
import verifyJWt from "../middleware/auth.middleware.js";
const router = Router();

router
  .route("/register_employee")
  .post(verifyJWt, upload.single("avatar"), registerEmployee);

router
  .route("/update_employee")
  .post(verifyJWt, updateEmployee);

router.route("/avatar").patch(verifyJWt, upload.single("avatar"), updatedEmployeeAvatar);

router.route("/delete_employee").post(verifyJWt, deleteEmployee);

router.route("/get_employees").get(verifyJWt, getAllEmployee);


export default router;
