import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
// Video.js를 import함으로써 사용하지 않더라도 모두가 알 수 있게 됨
import "./models/User";
import "./models/Comment";
import app from "./server";


const PORT = process.env.PORT || 4000;

const handleListening = () => 
console.log(`✅ Server listenning on port http://localhost:${PORT} 🏹`);

app.listen(PORT, handleListening);






