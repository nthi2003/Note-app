 require('dotenv').config()
const config = require('./config.json')
const mongoose = require('mongoose')
const User = require("./models/user")
const Note = require("./models/note")
mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));



const express = require('express');
const cors = require('cors');
const app = express()
const PORT = 8000

const jwt = require('jsonwebtoken')
const {authenToken}  = require("./utilities")

app.use(express.json())


app.use(
    cors({
        origin: "*"
    })
)
app.get('/' , (req , res) => {
    res.json({data: 'Hello'})
})
// Create Account
app.post("/create-account" , async (req, res) => {
    const {fullName , email , password} = req.body;
    if(!fullName) {
        return res.status(400).json({error : true , mes: "full Name is required"})

            
    }
    if(!email) {
        return res.status(400).json({error: true , mes : "email is required"})
    }
    if(!password) {
        return res.status(400).json({error: true , mes: "Password is required"})
    }
    const isUser = await User.findOne({ email: email})
    if (isUser) {
        return res.json({
            error: true,
            mes: "Email already exist "
        })
    }
    const user = new User({
        fullName,
        email,
        password
    })
    await user.save() // khoi tao va luu thong tin nhap tu user vao New user
    const accessToken = jwt.sign({ user } , process.env.ACCESS_TOKEN_SECRET , {
        expiresIn: "3d"
    })
    return res.json({
        error: false,
        user,
        accessToken, 
        mes: "Registration Successfully "
    })
})
app.post('/login' , async (req , res) => {
    const {email , password} = req.body // nhan 2 thang vao body

    if(!email) {
        return res.status(400).json({mes: "Email is required"});
    }
    if(!password) {
        return res.status(400).json({mes: " password is reuired"})
    }

    const userInfo = await User.findOne({ email : email});

    if (!userInfo) {
        return res.status(400).json({mes: "User not found"})
    }
    if(userInfo.email == email && userInfo.password == password) {
     const user = { user: userInfo}
     const accessToken = jwt.sign(user , process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3d"
     })
     return res.json({error: false , mes: "Login Successful", email , accessToken})

    } else {
        return res.status(400).json({error: false,  mes : "Invalid Credentials"})
    }
})
 app.get("/get-user" , authenToken , async (req, res) => {
    const {user} = req.user;

    const isUser = await User.findOne({_id: user._id})

    if (!isUser) {
        return res.sendStatus(401)
    }
    return res.json({
        user: {fullName: isUser.fullName, email: isUser.email, "_id": isUser._id},
        mes: ""
    })
 })
// Add note
app.post("/add-note" , authenToken , async ( req, res ) => {
   const {title , content , tags} = req.body
   const {user} = req.user
   if(!title) {
    res.status(400).json({error: true , mes: "Title is required"})
   }
   if(!content) {
    res.status(400).json({error: true , mes: "Content is required"})
   }
   try{
    const note = new Note({
        title, 
        content,
        tags: tags || [],
        userId : user._id
    })
    await note.save()
    return res.json({
        error: false,
        note,
        mes: "Note add successfully"
    })
   } catch (error) {
     res.status(500).json({ error:true , mes: "Internal Server Error"})

   }
} )
//Edit
app.put("/edit-note/:noteId" , authenToken, async (req, res) => {
    const noteId = req.params.noteId;
    const {title , content , tags , isPinned} = req.body;
    const {user} = req.user;
    if(!title && !content && !tags) {
        return res.status(400).json({error: true , mes: "No changes provided"})
    }
    try{
        const note = await Note.findOne({ _id: noteId, userId: user._id});
        if(!note) {
            return res.status(404).json({error: true , mes: "Note not found"})
        }
        if(title) note.title = title
        if(content) note.content = content
        if(tags) note.tags = tags
        if(isPinned) note.isPinned = isPinned

        await note.save()
        return res.json({error: false , note ,   mes: "Note updated successfully"})

    } catch(error) {
        return res.status(500).json({
            error:true,
            mes: "Internal Server Error"
        })
    }
    
})
//get all
app.get("/get-all-notes/", authenToken, async(req, res) => {
     const {user} = req.user;
     try {
        const notes = await Note.find({ userId: user._id
        }).sort({ isPinned: - 1});
        return res.json({
            error: false,
            notes,
            mes: " All notes retrieved successfully"
        })
     } catch (error){
        return res.status(500).json({
            error: true, 
            mes: "Internal Server Error"
        })
     }
})
//Delete Note
app.delete("/delete-note/:noteId", authenToken , async (req , res) => {
    const noteId = req.params.noteId
    const {user} = req.user;
    try{
        const note = await Note.findOne({_id: noteId , userId : user._id})
        if(!note) {
            return res.status(404).json({error: true, mes: "Note not found"})
        }
        await Note.deleteOne({ _id: noteId, userId: user._id  })
        return res.json({ error: false, mes : "Note detele successfull",

        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            mes: "Intrenal Server Error"
        })
    }
} )
app.put("/update-note-pinned/:noteId", authenToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned} = req.body;
    const {user} = req.user;
  
    try{
        const note = await Note.findOne({ _id: noteId, userId: user._id});
        if(!note) {
            return res.status(404).json({error: true , mes: "Note not found"})
        }
        
         note.isPinned = isPinned || false;

        await note.save()
        return res.json({error: false , note ,   mes: "Note updated successfully"})

    } catch(error) {
        return res.status(500).json({
            error:true,
            mes: "Internal Server Error"
        })
    }
})
app.get("/search-notes", authenToken , async (req, res) => {
    const {user} = req.user;
    const {query} = req.query;
    console.log(query);
    if(!query) {
        return res.status(400).json({error: true , mes: "Search query is required"})
    }
    try {
        const matchingNotes = await Note.find({
            userId: user._id,
            $or: [
                {title: {$regex: new RegExp(query, "i")}},
                {content: {$regex: new RegExp(query, "i")}},
            ]
        })
        return res.json({
            error: false,
            notes: matchingNotes,
            mes: "Notes matching the search query retrieved successfully"
        })

    } catch(error){
        return res.status(500).json({
            error: true,
            mes: "internal Server Error"
        })
    }
})
app.listen(PORT ,() => console.log(`Server is running on port ${PORT}`))
module.exports = app