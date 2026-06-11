import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Validation Schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
});

// API Call Function
const postFormData = async (formData) => {
  const res = await fetch("http://localhost:3000/api/mail/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("Failed to submit form");
  }

  return res.json();
};

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: postFormData,

    onSuccess: (data) => {
      console.log("API Response:", data);
      toast.success("Form submitted successfully!");
      reset();
    },

    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const onError = () => {
    toast.error("Please fix all errors");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-5 text-center">Contact Form</h2>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
          <div>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter Name"
              className="w-full border p-2 rounded-lg"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          <div>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter Email"
              className="w-full border p-2 rounded-lg"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          <div>
            <input
              type="text"
              {...register("subject")}
              placeholder="Enter Subject"
              className="w-full border p-2 rounded-lg"
            />
            <p className="text-red-500 text-sm">{errors.subject?.message}</p>
          </div>

          <div>
            <textarea
              {...register("message")}
              placeholder="Enter Message"
              rows="5"
              className="w-full border p-2 rounded-lg"
            />
            <p className="text-red-500 text-sm">{errors.message?.message}</p>
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {mutation.isPending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Form;
