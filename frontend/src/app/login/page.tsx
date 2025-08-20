'use client';

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { useMutation } from '@apollo/client';
import { useRouter } from "next/navigation";
import { LOGIN_MUTATION, REGISTER_MUTATION } from "@/lib/graphql/mutations";
import { AuthForm } from "@/components/AuthForm";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [formValues, setFormValues] = useState({ name: '', email: '', password: '' });
  const { login } = useAuth();
  const router = useRouter();

  const [register, { loading: regLoading }] = useMutation(REGISTER_MUTATION, {
    onCompleted: (data) => {
      const token = data.register.token;
      login(token);
      router.push('/');
    },
    onError: (err) => {
      console.error('Registration failed:', err.message);
      alert('Registration failed');
    },
  });

  const [signIn, { loading: loginLoading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      const token = data.login.token;
      login(token)
      router.push('/');
    },
    onError: (err) => {
      console.error('Login failed:', err.message);
      alert('Login failed');
    },
  });

  const handleChange = (field: string, value: string) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      signIn({ variables: {email: formValues.email, password: formValues.password} })
    } else {
      register({ variables: formValues });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-800">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center py-2">
          <h1 className="text-2xl font-bold">
            {isLogin ? 'Welcom back' : 'Create an account'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isLogin ? 'Log in to your EventHub dashboard' : 'Join EventHub to manage events'}
          </p>
        </CardHeader>

        <CardContent className="">
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
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-blue-700 hover:underline"
              >
                Sign up
              </button>
          </div>
          ): (
            <div>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="text-blue-700 hover:underline"
              >
                Log in
              </button>
            </div>
          )}
        </CardFooter>
      </Card>
    </ div>
  )
}

export default LoginPage;
