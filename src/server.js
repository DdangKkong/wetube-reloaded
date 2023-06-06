import "./db";
import "./models/Video";
// Video.js를 import함으로써 사용하지 않더라도 모두가 알 수 있게 됨
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev")

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true}));
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);


const handleListening = () => 
console.log(`✅ Server listenning on port http://localhost:${PORT} 🏹`);

app.listen(PORT, handleListening);
