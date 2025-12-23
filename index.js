const express = require('express');
const app = express();

const users = require('./MOCK_DATA');
const PORT = 8000;

app.get('/',(req,res)=>{
    res.send("Welcome to Home Page");
});

app.get('/users',(req,res)=>{
    return res.json(users);
});

app.get('/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id);
    return res.json(user);
});

app.post('/users',(req,res)=>{
    con
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});