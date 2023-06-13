import User from "../models/User"
import bcrypt from "bcrypt"

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async(req, res) => {
    const { name, username, email, password, password2, location } = req.body;
    const pageTitle = "Join"
    if(password !== password2){
        return res.status(400).render("join", { pageTitle, errorMessage:"Password confirmation does not match.", });
    };
    const exists = await User.exists({ $or: [{ username }, { email }] }); // username: req.body.username 을 username 으로 쓸 수 있다
    if(exists){
        return res.status(400).render("join", { pageTitle, errorMessage:"This username/email is already taken.", });
    };

    try {await User.create({
        name, username, email, password, location,
    });
    // create 하려면 await이 필요하대
    return res.redirect("/login");
    } catch(error){
        return res.status(400).render("join", { pageTitle: "Join", errorMessage: error._message, })}; // 내가 걍 pageTitle 을 Join으로 바꿔줌
};

export const postLogin = async(req, res) => {
    const { username, password } = req.body;
    const pageTitle = "Login";
    const user = await User.exists({ username });
    if (!user) {
        return res.status(400).render("login", {pageTitle, errorMessage: "An account with this username does not exists.",});
    };
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(400).render("login", { pageTitle, errorMessage: "Wrong password", });
    };
    req.session.loggedIn = true
    req.session.user = user;
    return res.redirect("/");
};

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const getLogin = (req, res) => res.render("login", { pageTitle: "Login"});
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See");














