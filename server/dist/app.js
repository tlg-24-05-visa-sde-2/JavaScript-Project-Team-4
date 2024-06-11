"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const controllers_1 = __importDefault(require("./controllers"));
const connection_1 = __importDefault(require("./config/connection"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
console.log("Server starting...");
connection_1.default.on("error", (error) => console.error(error));
connection_1.default.once("open", () => console.log("Connected to db"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'https://hometownharvest-91162a140111.herokuapp.com'],
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use(controllers_1.default);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../client/build')));
    app.get('/*', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../client/build/index.html'));
    });
}
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../client/build/index.html'));
});
exports.default = app;
