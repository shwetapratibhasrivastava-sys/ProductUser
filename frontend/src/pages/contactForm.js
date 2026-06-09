import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import * as yup from yup
import {Eye,Eyeoff} from lucide-react
import { toast,ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { useForm } from 'react-hook-form'


const schema=yup.object({
    email:yup
    .string()
    .email("Invalid Email")
    .required("Email is required"),
    
    password:yup
    .string()
    .min(8)
    .matches(/[A-Z]/,"One Upper Case")
    .required("Password is required"),
   
    repassword:yup
    .string()
    .oneOf([yup.ref("password")],"Password must match")
    .required("Confirm Repassword is required")
});


   const postFormData=async(formData)=>{
      const res=await fetch("  ",
      {
     method:'POST',
     body:JSON.stringify(formData),
     header:{
      "Content-Type":"application/json charset=UTF-8"
     }
      });
     
      if(!res.ok) throw new Error("Failed Submit")
      {
        return res.json()
      };


      function Form(){
        const [showpassword,setShowPassowrd]=useState(false)
         const [showrepassword,setShowRepassword]=useState(false)


         const{
            register,
            handleSubmit,
            formState:{error},
            reset
         }
         =useForm({
            resolver:yupResolver(schema)
        })
      


        const mutation=useMutation({
            mutationFn=postFormData,
        onSuccess:(data)=>{
            console.log("API Response",data);
            toast.success("Form Submitted successfully");
            reset();
        },
        onError:(error)=>{
            toast.error(error.message||"Something went wrong");
        }
         });

         

         const onSubmit=(data)=>{
          mutation.mutate(data);
         };

         const onError=()=>{
            toast.error("Please fix error");
         };



         return(
            
            <form onSubmit={handleSubmit(onSubmit,onError)}>
          
                <div>
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full border p-2 rounded-lg"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>
     

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Password"
            className="w-full border p-2 pr-10 rounded-lg"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        

        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className="w-full border p-2 pr-10 rounded-lg"
          />
          <span
            onClick={() => setShowRepassword(!showrepassword)}
            className="absolute right-3 top-2.5 cursor-pointer"
          >
            {showrepassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
          <p>
            {errors.confirmPassword?.message}
          </p>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}  
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {mutation.isPending ? "Submitting..." : "Submit"}   {/* showing the state */}
        </button>
            </form>
         )
      }
    }
export default Form