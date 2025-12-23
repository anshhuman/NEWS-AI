import User from "../Model/model.js";

export const Preferences = async(req,res) => {
    try {
        const {id} = await req.params;

        const user = await User.findById(id);

         console.log(req.body)

         console.log(req.body.preferences);

         if(!user){
            return res.status(404).json({
                message: "User not found"
            })
         };

          user.preferences = req.body.preferences;
          await user.save();
            return res.status(200).json({
                message: "Preferences saved successfully",
                preferences : user.preferences
            })

      console.log(user)
    } catch (error) {}
}
