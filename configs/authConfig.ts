import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { User } from "@/models/user-model";
import { connectMongoDB } from "@/utils/database";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user?.email });
      session.user.id = sessionUser?._id.toString();
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
