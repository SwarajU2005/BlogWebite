import User from '../model/user.js'
import bcrypt from 'bcrypt'

export const signupUser = async(request,response) =>{
    try {
        const hashPassword = await bcrypt.hash(request.body.password, 10)// generates the salt (ie random numbers) and appends in the password
        const user = {username: request.body.username, name:request.body.username, password:hashPassword };
        const newUser = new User(user);
        await newUser.save();
        console.log('User saved successfully:', newUser);

        return response.status(200).json({msg: 'signup succesfull'})
    } catch (error) {
        console.error('Error while saving user:', error);

        if (error.code === 11000) {
            return response.status(400).json({ msg: 'Username already exists' });
        }

        return response.status(500).json({ msg: 'Error while signup' });
    }
}