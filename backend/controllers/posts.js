import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req,res) => {
    const q = "SELECT * FROM posts";

    db.query(q, (err,data) => {
        if (err) return res.status(403).send(err);

        return res.status(200).json(data);
    });
};

export const getPost = (req,res) => {
    const q = "SELECT p.id, username, name, contact, date, description, file FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";

    db.query(q, [req.params.id], (err,data) => {
        if (err) return res.status(403).json(err);

        return res.status(200).json(data[0]);
    });
}

export const addPost = (req,res) => {

    const token = req.cookies.access_token;
    console.log(req.body.file)
    if(!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token not valid");
    
        const q = "INSERT INTO posts(name, contact, date, description, file, uid) VALUES (?)"
        console.log( [
            req.body.name,
            req.body.contact,
            req.body.date,
            req.body.description,
            req.body.file,
            userInfo.id
        ]
    )
        const values = [
            req.body.name,
            req.body.contact,
            req.body.date,
            req.body.description,
            req.body.file,
            userInfo.id
        ]

        db.query(q, [values], (err,data) => {
            if (err) return res.status(500).json(err);

            return res.json("Post has been made")
        })

    })
}

export const deletePost = (req,res) => {
    
        const postId = req.params.id;
        const q = "DELETE FROM posts WHERE id = ?";

        db.query(q, [postId], (err,data) => {
            if (err) return res.status(403).json("You can't delete this post!");

            return res.json("Post has been deleted!");
        });
};

export const updatePost = (req,res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token not valid");
    
        const postId = req.params.id;
        console.log(postId)
        console.log([
            req.body.name,
            req.body.contact,
            req.body.date,
            req.body.description,
            req.body.file,
            userInfo.id
        ])
        const q = "UPDATE posts SET name = ?, contact = ?, date = ?, description = ?, file = ? WHERE id = ? AND uid = ?"
    
        const values = [
            req.body.name,
            req.body.contact,
            req.body.date,
            req.body.description,
            req.body.file,
            userInfo.id
        ];

        db.query(q, [...values, ], (err,data) => {
            if (err) return res.status(500).json(err);

            return res.json("Post has been updated!");
        });
    })
}

