const express = require('express');
const app = express();
const bcrypt = require('bcrypt')

//application to accept json
app.use(express.json())



//for local test purpose we will be storing user data in a variable
let users = []



//test
app.get('/test', (req, res) => {
    res.send('Server is running')
})


//get users end point
app.get('/users', (req, res) => {
    res.json(users)
})
    

// add users - creating users and adding it to users array
app.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log('This is converted data', hashedPassword)
        let user = {
            name: req.body.name,
            password:hashedPassword
        }
        users.push(user)
        res.status(201).send('User added')
    } catch{
        res.status(500).send()
    }
    
})


//login point - to check if user information is matching the details provided
app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name);
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    //in try block we will perform the comparision
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        } else {
            res.send('Not allowed')
        }
    } catch {
        res.status(500).send()
    }
})


app.listen(4000, () => {
    console.log('Server running on port 4000')
})




// const express = require('express')
// const app = express()
// const bcrypt = require('bcrypt')

// app.use(express.json())

// const users = []

// app.get('/users', (req, res) => {
//   res.json(users)
// })

// app.post('/users', async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10)
//     const user = { name: req.body.name, password: hashedPassword }
//     users.push(user)
//     res.status(201).send()
//   } catch {
//     res.status(500).send()
//   }
// })

// app.post('/users/login', async (req, res) => {
//   const user = users.find(user => user.name === req.body.name)
//   if (user == null) {
//     return res.status(400).send('Cannot find user')
//   }
//   try {
//     if(await bcrypt.compare(req.body.password, user.password)) {
//       res.send('Success')
//     } else {
//       res.send('Not Allowed')
//     }
//   } catch {
//     res.status(500).send()
//   }
// })

// app.listen(3000)