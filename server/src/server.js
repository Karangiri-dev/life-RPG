import app from "./app/app.js";
import connectDB from "./config/db.js";

console.log(process.env.MONGO_URI);

const PORT = process.env.PORT || 3000;

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});