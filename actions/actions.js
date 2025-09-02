"use server";

import cloudinary from "@/config/cloudinary.js";
import { getDB } from "@/config/db.js";

export async function addSchoolAction(formData) {
  const db = await getDB();

  const name = formData.get("name");
  const address = formData.get("address");
  const city = formData.get("city");
  const state = formData.get("state");
  const contact = formData.get("contact");
  const email_id = formData.get("email_id");
  const file = formData.get("image");

  let imageUrl = null;

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // const fileName = `${Date.now()}-${file.name}`;
    // const filePath = path.join(
    //   process.cwd(),
    //   "public",
    //   "schoolImages",
    //   fileName
    // );

    // await writeFile(filePath, buffer);

    const uploaded = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "schools" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    imageUrl = uploaded.secure_url;
  }

  await db.execute(
    "INSERT INTO schools1 (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [name, address, city, state, contact, imageUrl, email_id]
  );
}

export async function getSchoolsAction() {
  const db = await getDB();

  const [rows] = await db.execute(
    "SELECT id, name, address, city, image FROM schools1"
  );
  return rows;
}
