
import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";



const app = express();
const logger = morgan("dev")

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false, 
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL })}));
//Router 전에 써야한대


app.get("/add-one", (req, res, next) => {
    req.session.potato += 1;
    return res.send(`${req.session.id}`);
});

app.use(flash());
app.use(localsMiddleware);
// localsMiddleware가 session 뒤에 있기 때문에 session을 받아 올 수 있다
app.use("/uploads", express.static("uploads"));
// 브라우저가 파일에 접근할 수 있게 만들어준거래, 사진이나 영상 파일 접근 때문에 
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);

export default app;


