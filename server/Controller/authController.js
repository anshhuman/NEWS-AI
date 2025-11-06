import User from "../Model/model.js"

export const login = () => {}

export const register = async(req,res) => {
    const {name , email , password} = req.body;
    // console.log(req.body);
    try { 
        const checkUser = await User.findOne({email});

        if(checkUser){
            return res.status(404).json({message:"User already exists"})
        }

        const newUser = await User.create({name,email,password});
        res.status(201).
        json({
            data:newUser,
            message:"User Registered successfully"})
    } catch (error) {}
}
