import User from "../Model/model.js";

export const getPreferences = async(req , res) => {
    try {
        const {userId} = req.params;
        console.log(userId)
        const user = await User.findById(userId);
        if(!user){
            return  res.status(404).json({message : "User not found"});
        }   
        res.status(200).json({preferences : user.preferences});
    } catch (error) {
    console.log("Error fetching user preferences:", error);
    res.status(500).json({message : "Server Error"});
}
}
