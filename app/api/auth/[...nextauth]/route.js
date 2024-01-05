import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"

import { connectToDB } from "@utils/database";
import User from "@models/user";
// console.log({
//     clientId: process.env.GOOGLE_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET
// });

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            httpOptions: {
                timeout: 3500
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    callbacks: {
        async session({ session, token, user }) {
            // console.log('NextAuth.session');
            // console.log('session', session);
            // console.log('token', token);
            // console.log('user', user);

            const sessionUser = await User.findOne({
                email: session.user.email
            })
            // When you create a new document with the automatically added _id property, Mongoose creates a new _id of type ObjectId to your document.
            session.user.id = sessionUser._id.toString()
            return session
        },
        async signIn({ user, account, profile, email, credentials }) {
            // console.log('NextAuth.signIn');
            // console.log('user', user);
            // console.log('account', account);
            // console.log('profile', profile);
            // console.log('email', email);
            // console.log('credentials', credentials);
            try {
                await connectToDB()

                const userExists = await User.findOne({ email: profile.email })
                console.log("userExists", userExists, userExists.image);
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.avatar_url
                    })
                }
                return true
            } catch (error) {
                console.log(error);
                return false
            }
        }
    }

})

export { handler as GET, handler as POST }