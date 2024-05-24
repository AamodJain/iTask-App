import { app } from "./app.js";
import { connectDB } from "<div className="" />
<data value=""></data>/database.js";

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})