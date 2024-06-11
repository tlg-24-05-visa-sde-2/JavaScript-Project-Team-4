"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../../models/user");
const bcrypt = require("bcrypt");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var jwt = require("jsonwebtoken");
const router = (0, express_1.Router)();
const saltRounds = 10;
const secretKey = process.env.JWT_KEY;
// SIGNUP
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password1, email, firstName, lastName, streetAddress, city, state, zip } = req.body;
    console.log("req.body", req.body);
    console.log("username: ", username);
    console.log("password: ", password1);
    console.log("saltRounds: ", saltRounds);
    try {
        const existingUser = yield user_1.User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User already exists, please log in!" });
        }
        // Hash the password
        const hashedPassword = yield bcrypt.hash(password1, saltRounds);
        // Create a new user instance with the hashed password
        const newUser = new user_1.User({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            streetAddress,
            city,
            state,
            zip
        });
        // Save the user to the database
        yield newUser.save();
        console.log("User saved to DB");
        // Return message to front end
        return res.status(200).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error("Error creating user", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
// LOGIN
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailOrUsername, password } = req.body;
    console.log("login reached");
    try {
        // Check if the user exists
        const user = yield user_1.User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
        });
        if (!user) {
            return res
                .status(401)
                .json({ message: "Credentials are not recognized" });
        }
        // Check if the password is correct
        const isPasswordValid = yield bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ message: "Credentials are not recognized" });
        }
        else {
            // If the credentials are valid, generate a JWT
            const token = jwt.sign({ userId: user._id }, secretKey, {
                expiresIn: "1h", // Token expiration time
            });
            // Set the token in the response cookies, CHANGE THE NAME OF THE COOKIE YOU WANT TO USE
            res.cookie("HHT", token, {
                httpOnly: true, // These cannot be accessed by javascript on the front end, create middlewear to handle the cookie parsing
                maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
                secure: false, // Change this when pushing to prod
            });
            // Send a success message
            return res.status(200).json({ message: "Login successful" });
        }
    }
    catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
// CHECK IF THE USER IS LOGGEDIN
router.get("/isLoggedIn", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies["HHT"];
    if (token) {
        try {
            const decoded = jwt.verify(token, secretKey);
            if (decoded) {
                res.status(200).json({ message: "You have access" });
            }
            else {
                res.status(401).json({ message: "Invalid or expired token" });
            }
        }
        catch (err) {
            res.status(401).json({ message: "Invalid or expired token" });
        }
    }
    else {
        res.status(401).json({ message: "No token provided" });
    }
}));
// LOGOUT
router.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("HHT", {
            httpOnly: true,
            secure: false, // Change this when pushing to prod
        });
        res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = router;
