import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { User } from "@/models/user-model";
import { connectMongoDB } from "@/utils/database";


const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user?.email });
      if (session.user) {
        session.user.id = sessionUser?._id.toString();
      }
      return session;
    },
    async signIn({ user }) {
      try {
        await connectMongoDB();
        const userExists = await User.findOne({ email: user.email });
        if (!userExists) {
          await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
          });
        }
        return true;
      } catch (e) {
        console.log("Error while signing in");
        return false;
      }
    },
  },
};
export default authOptions;
