import { Router } from 'express'
import { UserController } from '@/controllers/user.controller'

const userRouter = Router()

const userController = new UserController()

userRouter.get('/', userController.getUsers)
userRouter.post('/', userController.createUser)
userRouter.post('/login', userController.login)

export default userRouter
