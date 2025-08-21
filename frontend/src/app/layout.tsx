'use client';

import "./globals.css";
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../lib/apollo';
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <AuthProvider>
          <ApolloProvider client={apolloClient}>
            {children}
          </ApolloProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
