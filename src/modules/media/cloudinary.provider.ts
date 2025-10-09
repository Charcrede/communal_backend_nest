// src/media/cloudinary.provider.ts
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryStorageConfig = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folder = 'articles'; // Dossier Cloudinary
    return {
      folder,
      resource_type: 'auto', // auto = image, video, raw, etc.
      public_id: file.originalname.replace(/\.[^/.]+$/, ''), // supprime l'extension
    };
  },
});
