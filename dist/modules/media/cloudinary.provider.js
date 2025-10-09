"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryStorageConfig = void 0;
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = require("cloudinary");
exports.CloudinaryStorageConfig = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: async (req, file) => {
        const folder = 'articles';
        return {
            folder,
            resource_type: 'auto',
            public_id: file.originalname.replace(/\.[^/.]+$/, ''),
        };
    },
});
//# sourceMappingURL=cloudinary.provider.js.map