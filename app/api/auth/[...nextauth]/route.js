import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import User from "@/models/User";
import connectDB from "@/db/connectDB";


export const authoptions = NextAuth({

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {

      if (account.provider === "github") {
        await connectDB();

        const currentUser = await User.findOne({ email: user.email });
        if (!currentUser) {

          const newUser = await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          });
        }
        return true;
      }
    },

    async session({ session, token, user }) {
      await connectDB();
      const currentUser = await User.findOne({ email: session.user.email });
      if (currentUser) {
      session.user.username = currentUser.username;
      session.user.id = currentUser._id.toString();
      }
      return session;
    }
  }
}
);

export { authoptions as GET, authoptions as POST };