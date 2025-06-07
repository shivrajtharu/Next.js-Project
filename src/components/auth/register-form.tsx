"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";

const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long!"),
    email: z.string().email("Please Enter Your valid email"),
    password: z.string().min(6, "Password must be at least 6 characters long!"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password donot Match",
    path: ["confirmPassword"],
  });

type registerFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps{
  onSuccess?: () => void
}

const RegisterForm = ({onSuccess}: RegisterFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<registerFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onRegisterSubmit = async (values: registerFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast("Failed to create account. Please try again");
        return;
      }

      toast("Your account has been created successfully. Please sign with email and password")

      if(onSuccess){
        onSuccess();
      }

    } catch (e) {
      console.log(e);
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(onRegisterSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your Password again"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account" : "Create Account"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
