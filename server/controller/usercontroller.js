import User from '../model/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Token from '../model/token.js'

dotenv.config();

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

export const loginUser = async(request, response) => {
    let user = await User.findOne({username : request.body.username});
    if(!user){
        return response.status(400).json({msg:'username doesnt match'});
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if(match){
            const accessToken = jwt.sign(user.toJSON(),process.env.ACCESS_TOKEN, {expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(),process.env.REFRESH_TOKEN, {expiresIn: '15m'});

            const newToken = new Token({token:refreshToken});
            await newToken.save();

            return response.status(200).json({accessToken: accessToken, refreshToken:refreshToken, name:user.name, username:user.username})
        }else{
            return response.match.status(400).json({msg:'password does not match'});
        }
    } catch (error) {
        return response.status(500).json({msg:'Error while login in user'});
    }
}