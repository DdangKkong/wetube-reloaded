
import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";



const app = express();
const logger = morgan("dev")

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true}));

app.use(session({secret: "Hello!", resave: true, saveUninitialized: true,}));
//Router 전에 써야한대


app.get("/add-one", (req, res, next) => {
    req.session.potato += 1;
    return res.send(`${req.session.id}`);
});


app.use(localsMiddleware);
// localsMiddleware가 session 뒤에 있기 때문에 session을 받아 올 수 있다
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;


