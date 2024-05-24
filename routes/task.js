import { Router } from "express";
import { newTask ,myTasks,toggleIsDone,deleteTask,editTask} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = Router();
router.use(isAuthenticated)

router.post("/new",newTask)

router.get("/my",myTasks)

router.get("/edit/:id",editTask)

router.route("/:id").put(toggleIsDone).delete(deleteTask)


export const taskRouter = router ;