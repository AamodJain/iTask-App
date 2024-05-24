import { app } from "./app.js";
import { connectDB } from "./controllers/database.js";

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})