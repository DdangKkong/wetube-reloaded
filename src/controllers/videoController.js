import Video from "../models/video";

/*
console.log("start")
Video.find({}, (error, videos) => {
    if(error){
        return res.render("server-error");
    };
    return res.render("home", { pageTitle: "Home", videos });
});
console.log("finished")
*/
// mongoose 사이트에서 나와있는 함수 사용, promise로 대체/ 위처럼 하면 start, finished 이후에 videos 출력/ 아래를 하면 순서대로 출력됨

export const home = async(req, res) => {
    const videos = await Video.find({});
    // await는 database를 기다려준다, async 안에서 await를 사용하는것이 규칙
    return res.render("home", { pageTitle: "Home", videos });
};
export const watch = (req, res) => {
    const { id } = req.params;
    return res.render("watch", { pageTitle: `Watching` });
};
export const getEdit = (req, res) => {
    const { id } = req.params;
    return res.render("edit", { pageTitle:`Editing` });
}
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video"});
};

export const postUpload = (req, res) => {
    const { title } = req.body;

    return res.redirect("/");
};
