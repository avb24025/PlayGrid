import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || 'your_cloud_name',
  api_key: process.env.API_KEY || 'your_api_key',
  api_secret: process.env.API_SECRET || 'your_api_secret',
});


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'turf-images',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 800, height: 600, crop: 'limit' }],
  },
});

export { cloudinary, storage };
