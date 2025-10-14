export async function uploadImageToCloudinary(file: File): Promise<string> {
  const cloud = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
  const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string;

  const url = `https://api.cloudinary.com/v1_1/${cloud}/image/upload`;
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", preset);

  const res = await fetch(url, { method: "POST", body: fd });
  if (!res.ok) throw new Error("Error subiendo imagen");
  const json = await res.json();
  return json.secure_url as string; // <- úsala como urlImage
}
