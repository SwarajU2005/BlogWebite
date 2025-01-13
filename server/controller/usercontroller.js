import user from "../model/user.js";

export const signupUser = async(request,response) =>{
    try {
        const user = request.body;

        const newUser = new user(user);
        await newUser.save();

        return response.status(200).json({msg: 'signup succesfull'})
    } catch (error) {
        return response.status(500).json({msg: 'error while signup'})
    }
}