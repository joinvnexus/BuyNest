import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImages(files: File[]): Promise<string[]> {
  const uploadPromises = files.map(async (file) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'image', folder: 'ecommerce/products' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result!.secure_url);
        }
      );

      const bufferStream = new Readable();
      bufferStream.push(file);
      bufferStream.push(null);
      bufferStream.pipe(stream);
    });
  });

  return Promise.all(uploadPromises) as Promise<string[]>;
}

