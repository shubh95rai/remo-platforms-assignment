"use server";

import cloudinary from "@/config/cloudinary.js";
import db from "@/config/db.js";
import { writeFile } from "fs/promises";
import path from "path";

export async function addSchoolAction(formData) {
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
    "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [name, address, city, state, contact, imageUrl, email_id]
  );
}

export async function getSchoolsAction() {
  const [rows] = await db.execute(
    "SELECT id, name, address, city, image FROM schools"
  );
  return rows;
}
