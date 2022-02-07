const express = require("express")
const UserCtrl = require("../controllers/UserController")
const { authMdw, requireAdmin } = require("../middlewares/auth")
const router =express.Router()

router.get("/", authMdw, requireAdmin, async (req,res)=>{
    try {
        const users = await UserCtrl.getUsers(req.user)
        res.json(users)
    } catch (err) {
        res.status(403)
    }
})

router.get('/:id', authMdw, ()=>{})
module.exports = router