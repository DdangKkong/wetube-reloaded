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










