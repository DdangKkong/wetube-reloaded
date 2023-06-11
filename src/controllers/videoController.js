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
    const videos = await Video.find({}).sort({ createdAt: "desc" });
    // await는 database를 기다려준다, async 안에서 await를 사용하는것이 규칙, 이렇게 하면 순서대로 출력됨
    return res.render("home", { pageTitle: "Home", videos });
};
export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(video){
        return res.render("watch", { pageTitle: video.title, video });
    }
    return res.status(404).render("404", { pageTitle: "Video not found."});
};

export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res. render("404", { pageTitle: "Video not found."});
        // return을 넣지 않으면 계속해서 밑에있는 코드들도 실행되기때문에 return을 넣어서 끝내줘야한다
    }
    return res.render("edit", { pageTitle:`Edit: ${video.title}`, video });
}

export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({ _id: id });
    if (!video) {
        return res. render("404", { pageTitle: "Video not found."});
    }
    await Video.findByIdAndUpdate(id, {
        title, discription, hashtags: Video.formatHashtags(hashtags),
    });

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
        hashtags: Video.formatHashtags(hashtags),
        });
    return res.redirect("/");
    } catch(error){
        return res.status(400).render("upload", { pageTitle: "Upload Video", errorMessage: error._message, })};
};


export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
};


export const search = async (req, res) => {
    const { keyword } = req.query;
    let videos = [];
    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(keyword, "i"),
                // i 는 대문자와 소문자 구분을 하지 않는걸 말한대
            }, 
        });
    }
    return res.render("search", { pageTitle:"Search", videos });
    // 이 코드가 base.pug에서 쓰이기 때문에 pageTitle이 필요하다
};






