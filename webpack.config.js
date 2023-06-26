const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

const BASE_JS = "./src/client/js/"

module.exports = {
    entry: {
        main: BASE_JS + "main.js",
        videoPlayer: BASE_JS + "videoPlayer.js",
        recorder: BASE_JS + "recorder.js",
        commentSection: BASE_JS + "commentSection.js",
    },
    mode: 'development',
    watch: true,
    // npm run dev, npm run assets 둘 다 했을때, 수정하고 저장시 자동으로 업데이트해준대
    plugins: [new MiniCssExtractPlugin({
        filename: "css/styles.css",
    })],
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "assets"),
        clean: true,
        // output 폴더를 시작하기 전에 clean 해준대 
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", { targets: "defaults" }]],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
                // loader는 뒤에 적힌 것부터 시작한대 그래서 설치 역순으로 써줬대
            },
        ],
    },
};






























