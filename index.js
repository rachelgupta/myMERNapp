const express = require('express');
const fs = require('fs');
const app = express();

const users = require('./MOCK_DATA'); //loads the JSON file into memory as a JavaScript array.
const PORT = 8000;

//Middleware - help to transfer form data to body
app.use(express.urlencoded({ extended: false }));
//It checks the request header if the content type is applications/x-wwww-form-urlencoded
//Then only processes the request. Skips if content type is HTML, JSON

app.use((req,res,next)=>{
    req.myusername = "Rachel";
    next();
});

app.use((req,res,next)=>{
    console.log("Hello from M-2",req.myusername);
    next();
})

app.get('/', (req, res) => {
    res.send("Welcome to Home Page");
});

app.get('/users', (req, res) => {
    return res.json(users);
});

app.route('/users/:id').get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})
.put((req,res)=>{
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    if(index===-1) res.send("User not Found");
    users.splice(index,1);

    const body = req.body;
    users.push({ ...body, id: id });

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        res.send(`User with id=${id} edited successfully.`);
    });

})
.delete((req,res)=>{
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    if(index===-1) res.send("User not Found");
    users.splice(index,1);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        res.send(`User with id=${id} deleted successfully.`);
    });

});

app.post('/users', (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        res.send("User added successfully");
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});