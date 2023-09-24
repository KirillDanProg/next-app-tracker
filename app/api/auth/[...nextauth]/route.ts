import NextAuth from "next-auth"
import authOptions from "@/configs/authConfig";

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
