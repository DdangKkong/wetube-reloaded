import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    avatarUrl: String,
    socialOnly: { type: Boolean, default:false },
    username: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String, required: true },
    location: String,
});


userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 5);
    // 여기서 this는 로그인하려는 유저를 가리킨대
});


const User = mongoose.model("User", userSchema);
export default User;
























