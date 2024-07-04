const express = require('express');
const app = express();

app.get('/',(req,res) => {
    res.send("The server is running on PORT 5000");
})

app.listen(5000, ()=>{
    console.logo("listening to port 5000");
});