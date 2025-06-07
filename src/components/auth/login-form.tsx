"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid Email address!"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  // initialize form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginSubmit = async(values: LoginFormValues) => {
    setIsLoading(true);
    try{
        const {error} = await signIn.email({
          email: values.email,
          password: values.password,
          rememberMe: true
        })

        if(error){
          toast("login Failed!");
          return;
        }

        toast("login Success");
        router.push('/')

    }catch(e){
       console.log(e)
    }finally{
        setIsLoading(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onLoginSubmit)}>
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing In" : "Sign In"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
