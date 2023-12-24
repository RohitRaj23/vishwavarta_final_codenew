import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../Models/UserModel.js';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, pic } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ message: "Please fill all the fields" })
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({ name, email, password: hashedPassword, pic });

        const jwtoken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        if (user) {
            const existingUser = { _id: user._id, name: user.name, email: user.email, pic: user.pic }
            res.status(201).json({ existingUser, token:jwtoken })
            // res.status(201).json({ _id: user._id, name: user.name, email: user.email, pic: user.pic, token: jwtoken })
        } else {
            res.status(400).json({ message: "Failed to Create User" })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({  existingUser, token })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// api/user/        --------- Main api 
// api/user?search=userName   --------- Login api


export const allUsers = async (req, res) => {
    try {
        const keyword = req.query.search
            ? {
                $or: [
                    { name: { $regex: req.query.search, $options: "i" } },
                    { email: { $regex: req.query.search, $options: "i" } },
                ],
            }
            : {};

        const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
        res.send(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

