import express from "express";

const router = express.Router()

let food = [
    { name: "Manzana", price: 10 },
    { name: "Hamburguesa", price: 250 },
    { name: "Pizza", price: 120 },
    { name: "Brocoli", price: 20 },
    { name: "Ensalada", price: 100 }
]

router.get('/food', (req, res) => {
    let testUser = {
        name: "Agustin",
        last_name: "Navarro",
        role: "admin"
    }

    res.render('index', {
        user: testUser,
        isAdmin: testUser.role === "admin",
        food
    })
})

router.get('/xfood', (req, res) => {
    let testUser = {
        name: "Sol",
        last_name: "Navarro",
        role: "user"
    }

    res.render('index', {
        style: "index.css",
        user: testUser,
        isAdmin: testUser.role === "admin",
        food
    })
})

export default router