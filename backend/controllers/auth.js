import { db } from "../db.js"
import jwt from "jsonwebtoken";


export const register = (req,res) => {

    const q = "SELECT * FROM users WHERE email = ? OR username = ?";

    db.query(q, [req.body.email, req.body.name], async (err,data) => {
        if(err) return res.json(err);
        if(data.length) return res.status(409).json("User already exists!");

        //const saltRounds = 10;
        //const myPlaintextPassword = req.body.password;

        //await bcrypt.hash(myPlaintextPassword, saltRounds).then((hash)=>{
            const q = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";
            const values = [req.body.username, req.body.email, req.body.password];

            db.query(q, [values], (err,data) => {
            if (err) return res.json(err);
            return res.status(200).json("User has been created successfully!");
            });
        //});
    
        
    });

}

export const login = (req,res) => {

    const q ="SELECT * FROM users WHERE email = ? and password = ?"

    db.query(q, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json(err);
        if (data.length > 0) {
            console.log(data[0].password);
            console.log(req.body.password);
            const token = jwt.sign({ id: data[0].id }, "jwtkey");
            const {password, ...other} = data[0];
            res.cookie("access_token", token, {
                httpOnly: true,
                secure: false
            }).status(200).json(other);
        }
        else {
            return res.status(404).json("Incorrect email or password");
        }
    });  
};

export const logout = (req,res) => {
 
    res.clearCookie("access_token",{domain: "localhost", path: "/"}).status(200).json("Logged Out")

}