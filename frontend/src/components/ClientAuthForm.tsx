'use client';

import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { LOGIN_MUTATION, REGISTER_MUTATION } from "@/lib/graphql/mutations";
import { AuthForm } from "@/components/AuthForm";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

type ClientAuthFormProps = {
  mode?: string;
};

const ClientAuthForm = ({ mode }: ClientAuthFormProps) => {
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [formValues, setFormValues] = useState({ name: "", email: "", password: "" });

  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsLogin(mode === "login");
  }, [mode]);

  const [registerMutation, { loading: regLoading }] = useMutation(REGISTER_MUTATION, {
    onCompleted: (data) => {
      const token = data.register.token;
      login(token);
      router.push("/");
    },
    onError: (err) => alert("Registration failed: " + err.message),
  });

  const [loginMutation, { loading: loginLoading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      const token = data.login.token;
      login(token);
      router.push("/");
    },
    onError: (err) => alert("Login failed: " + err.message),
  });

  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      loginMutation({ variables: { email: formValues.email, password: formValues.password } });
    } else {
      registerMutation({ variables: formValues });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-800">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center py-2">
          <h1 className="text-2xl font-bold">{isLogin ? "Welcome back" : "Create an account"}</h1>
          <p className="text-sm text-muted-foreground">
            {isLogin ? "Log in to your EventHub dashboard" : "Join EventHub to manage events"}
          </p>
        </CardHeader>

        <CardContent>
          <AuthForm
            isLogin={isLogin}
            onSubmit={handleSubmit}
            values={formValues}
            onChange={handleChange}
            loading={regLoading || loginLoading}
          />
        </CardContent>

        <CardFooter className="justify-center">
          {isLogin ? (
            <div>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/auth?mode=register")}
                className="text-blue-700 hover:underline"
              >
                Sign up
              </button>
            </div>
          ) : (
            <div>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/auth?mode=login")}
                className="text-blue-700 hover:underline"
              >
                Log in
              </button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ClientAuthForm;
