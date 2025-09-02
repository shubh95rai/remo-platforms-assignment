"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { addSchoolAction } from "@/actions/actions.js";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("contact", data.contact);
    formData.append("email_id", data.email_id);

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    await addSchoolAction(formData);
    setSuccess(true);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Add School</h1>

      {success && (
        <p className="text-green-600 text-center mb-4">
          School added successfully!
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("name", { required: true })}
            placeholder="School Name"
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">Required</span>
          )}
        </div>

        <div>
          <input
            {...register("address", { required: true })}
            placeholder="Address"
            className="w-full border p-2 rounded"
          />
          {errors.address && (
            <span className="text-red-500 text-sm">Required</span>
          )}
        </div>

        <div>
          <input
            {...register("city", { required: true })}
            placeholder="City"
            className="w-full border p-2 rounded"
          />
          {errors.city && (
            <span className="text-red-500 text-sm">Required</span>
          )}
        </div>

        <div>
          <input
            {...register("state", { required: true })}
            placeholder="State"
            className="w-full border p-2 rounded"
          />
          {errors.state && (
            <span className="text-red-500 text-sm">Required</span>
          )}
        </div>

        <div>
          <input
            {...register("contact", { required: true })}
            placeholder="Contact Number"
            type="tel"
            className="w-full border p-2 rounded"
          />
          {errors.contact && (
            <span className="text-red-500 text-sm">Required</span>
          )}
        </div>

        <div>
          <input
            {...register("email_id", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
            })}
            placeholder="Email"
            type="email"
            className="w-full border p-2 rounded"
          />
          {errors.email_id && (
            <span className="text-red-500 text-sm">Enter valid email</span>
          )}
        </div>

        <div>
          <input
            {...register("image", {
              required: true,
            })}
            type="file"
            className="w-full border p-2 rounded"
          />
          {errors.image && (
            <span className="text-red-500 text-sm">Required</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
