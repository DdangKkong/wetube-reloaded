import multer from "multer";
// 브라우저에 업로드한 이미지를 서버에 저장하고 파일을 지정된 폴더에 이름을 임의로 바꿔서 저장해줌

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    // If 대신 Boolean 사용해서 코딩했어
    res.locals.siteName = "Wetube";
    res.locals.loggedInUser = req.session.user || {};
    next();
    // next를 안하면 웹사이트 작동이 안돼
};


export const protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        return res.redirect("/login");
    }
};

export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        return next();
    } else {
        return res.redirect("/");
    }
};

export const avatarUpload = multer({ dest: "uploads/avatars/", limits: {
    fileSize: 3000000,
} });

export const videoUpload = multer({ dest: "uploads/videos/", limits: {
    fileSize: 100000000,
} });




















