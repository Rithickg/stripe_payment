import User from '../models/User.js'


const subscription_user = async (req, res) => {
    try {
        const user = await User.find()
        if (!user) {
            res.status(401).json({ message: "No User Found" });
            return;
        } else {
            res.json({ User: user });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error signing in' })
    }
}

const subscription_user_by_id = async (req, res) => {
    const { _id } = req.params.id;
    try {
        const user = await User.findById({ _id })
        if (!user) {
            res.status(401).json({ message: "Invalid User" });
            return;
        } else {
            res.json({ User: user });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error finding the user' })
    }
}

export default { subscription_user, subscription_user_by_id }