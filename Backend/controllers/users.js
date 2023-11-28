import User from "./../models/user.js"

export const profile = async (req, res) => {
    try {
        const userID = req.params.userID;
        const user = await User.findbyID(userID);
        if (!user)
        {
            res.status(404).json({message: "User not found!"});
        }
        res.status(200).json({user});
    } catch (error)
    {
        res.status(500).json({message: "Error retrieving the user profile"})
    }
}