// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET, // ← 🔑 ESTA LÍNEA ES OBLIGATORIA
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: any }) {
      console.log("🔐 NEXTAUTH_SECRET presente:", !!process.env.NEXTAUTH_SECRET);
      console.log("📧 Correo de Google:", user.email);
      const allowedEmails = ["rotafelipexx1@gmail.com"];
      return allowedEmails.includes(user.email);
    },
  },
  pages: {
    signIn: '/admin/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };