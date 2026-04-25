import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import User from "@/models/User";
import connectDB from "@/db/connectDB";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "github") {
        try {
          await connectDB();
          const currentUser = await User.findOne({ email: user.email });

          if (!currentUser) {
            await User.create({
              email: user.email,
              username: user.email.split("@")[0],
            });
          }
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      }
      return false;
    },

    async session({ session }) {
      try {
        await connectDB();
        const currentUser = await User.findOne({ email: session.user.email });
        if (currentUser) {
          session.user.username = currentUser.username;
          session.user.id = currentUser._id.toString();
        }
        return session;
      } catch (error) {
        console.error(error);
        return session;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };