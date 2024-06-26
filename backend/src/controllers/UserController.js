import { hashPassword, comparePassword } from "../auth.js";
import userModel from "../models/UserModel.js"
import jwt from "jsonwebtoken";

export default class UserController {
    static async signup(req, res) {
        const args = req.body;
        const hashedPassword = await hashPassword(args.password);
        args.password = hashedPassword;

        userModel.create(args).then(() => {
            console.log("User created successfully");
            res.status(200).json({message: "User created successfully"});
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
    }

    static login(req, res) {
        const args = req.body;

        userModel.get(args.email).then(async (user) => {
            if (user) {
                const valid = await comparePassword(args.password, user.password);
                if (valid) {
                    const token = jwt.sign(
                        {
                            userId: user.email
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "6h",
                            algorithm: "HS256"
                        }
                    );
                    console.log("Token created successfully");
                    res.status(200).json({ token });
                } else {
                    console.log("Invalid password");
                    res.status(401).json({ error: "Invalid password" });
                }
            } else {
                console.log("User not found");
                res.status(404).json({ error: "User not found" });
            }
        })
        .catch(err => {
            console.log("Error logging in user:", err);
            res.status(500).json({ error: "Error logging in user" });
        });
    }
}