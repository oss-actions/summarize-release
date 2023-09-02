"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
exports.default = JSON.parse((0, fs_1.readFileSync)((0, path_1.resolve)(__dirname, "../package.json")).toString()).version;
