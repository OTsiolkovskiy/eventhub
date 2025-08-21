'use client';

import "../globals.css";
import { ApolloProvider } from '@apollo/client';
import { Header } from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";
import { apolloClient } from "@/lib/apollo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <ApolloProvider client={apolloClient}>
        <Header />
        {children}
      </ApolloProvider>
    </AuthProvider>
  );
}
