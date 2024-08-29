import multer from "multer";

const storage = multer.memoryStorage();

export const singleUpload = multer({storage}).single("file");



//


// import express from 'express';
// import multer from 'multer';
// import isAuthenticated from './middleware/isAuthenticated';
// import { updateProfile } from './controllers/UserController';

// const upload = 