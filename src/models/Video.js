//데이터가 어떻게 생겼는가(형식)를 database에 알려주기 위해 필요한 파일

import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: Date,
    hashtags: [{ type: String }],
    meta: {
        views: Number,
        rating: Number,
    },
});

/*
const Video = mongoose.model("Video", videoSchema);
export default Video;
위처럼 했던걸 애러가 나서 아래로 바꿈 (검색해서 찾음)
*/
export default mongoose.models.Video || mongoose.model("Video", videoSchema);
// default 사용했기 때문에 같은 형식으로 import됨





