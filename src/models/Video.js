//데이터가 어떻게 생겼는가(형식)를 database에 알려주기 위해 필요한 파일

import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxLength: 80 },
    description: { type: String, required: true, trim: true, minLength: 20 },
    createdAt: { type: Date, required: true, default: Date.now },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, default: 0, required: true},
        rating: { type: Number, default: 0, required: true},
    },
    // 데이터에 대한 구체적은 설정은 굉장이 중요하다. 더 구체화할수록 보조해주는 trim같은 것들도 사용할 수 있기 때문에
    // 위의 중괄호 안에 있는 명령어?들은 mongoosejs.com 에서 확인 가능하다
    // 바꿀때마다 upload.pug도 업데이트한다 둘 다 해야된대, html만 하면 사용자들이 수정 가능해
});

/*
videoSchema.pre("save", async function () {
    this.hashtags = this.hashtags(0).split(",").map((word) =>word.startsWith("#") ? word : `#${word}`);
});
*/
// model을 만들기 전에 middleware를 만들어야한대, 더 좋은방법을 위해 지운대

videoSchema.static('formatHashtags', function(hashtags) {
    return hashtags.split(",").map((word) => (word.startsWith('#') ? word : `#${word}`));
})

/*
const Video = mongoose.model("Video", videoSchema);
export default Video;
위처럼 했던걸 애러가 나서 아래로 바꿈 (검색해서 찾음)
*/
export default mongoose.models.Video || mongoose.model("Video", videoSchema);
// default 사용했기 때문에 같은 형식으로 import됨





