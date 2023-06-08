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
export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    return res.render("watch", { pageTitle: video.title, video });
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

export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    try {
        await video.create({
        title: title,
        description: description,
        hashtags: hashtags.split(",").map((word) => `#${word}`),
        });
    return res.redirect("/");
    } catch(error){
        return res.render("upload", { pageTitle: "Upload Video", errorMessage: error._message, });
    }
};
