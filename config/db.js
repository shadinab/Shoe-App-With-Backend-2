import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlPaeser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      // useUnifiedTopology:true
    });

    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (err) {
    console.log(`${err}`.red);
  }
};

export default connectDB;
