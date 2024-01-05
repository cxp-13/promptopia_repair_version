import mongoose from "mongoose";

let isConnect = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if (isConnect) {
        console.log('MongoDB is already');
        return;
    }

    try {
        // /useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options.
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnect = true

        console.log("Mongodb connected");
    } catch (error) {
        console.log(error);
    }
}