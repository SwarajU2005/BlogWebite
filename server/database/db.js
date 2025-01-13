import mongoose from 'mongoose'

const Connection= async(USERNAME, PASSWORD) => {
    const URL =`mongodb+srv://${USERNAME}:${PASSWORD}@blogapp.ink20.mongodb.net/?retryWrites=true&w=majority&appName=Blogapp`;
    try {
        await mongoose.connect(URL);
        console.log(`Database succesfully connected`);
    } catch (error) {
        console.log(`Error while connecting the database -- ${error}`);
        
    }
}

export default Connection;