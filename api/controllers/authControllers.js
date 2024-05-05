import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js'


const signup = async (req, res) => {
    try{
        const { name, username, email, password} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({error: 'Email already in use'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email
        })
        }
        else{
            res.status(400).json({error: "Invalid User Data"});
        }
    }
    catch(error){
        console.log('Error in sign up controller: ', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!email || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid email or password"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
        });
    }
    catch(error){
        console.log('Error in login controller: ', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const logout = async (req, res) => {
    try{
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});
    }
    catch(error){
        console.log('Error in logout controller: ', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

export {signup, login, logout};