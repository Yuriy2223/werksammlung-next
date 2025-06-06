// import { toast } from 'react-toastify';

// export const uploadImage = async (file: File): Promise<string | null> => {
//   const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
//   const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET_NAME;

//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', UPLOAD_PRESET);

//   try {
//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
//       {
//         method: 'POST',
//         body: formData,
//       }
//     );

//     if (!response.ok) throw new Error('Upload failed');

//     const data = await response.json();
//     toast.success('Image uploaded successfully!');
//     return data.secure_url;
//   } catch {
//     toast.error('Error uploading image');
//     return null;
//   }
// };
