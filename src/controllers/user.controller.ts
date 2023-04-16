import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'

import { User } from '@/models/User.model'
import { comparePassword, hashPassword } from '@/utils/hashPassword'
import { validateIsEmail } from '@/utils/validateEmail'
import { readFileSync, writeFileSync } from '@/utils/writeFile'

const PATH_ROUTE = '../database/users.json'

export class UserController {
  constructor() {
    this.getUsers = this.getUsers.bind(this)
    this.getUserByEmail = this.getUserByEmail.bind(this)
    this.createUser = this.createUser.bind(this)
    this.login = this.login.bind(this)
  }

  async getUsers(req: Request, res: Response) {
    try {
      let users: User[] = []

      const data = await readFileSync(PATH_ROUTE)

      if (!data) {
        res.status(404).json({ error: 'Users not found' })
      }
      const fileData = data?.data
      users = fileData
      // Deleete password
      users = users.map((user: User) => {
        delete user.password
        return user
      })
      res.json(users)
    } catch (err: Error | any) {
      res.status(500).json({ error: err.message })
    }
  }

  async getUserByEmail(email: string) {
    try {
      if (!email) {
        return false
      }

      if (!validateIsEmail(email)) {
        return false
      }

      const data = await readFileSync(PATH_ROUTE)
      if (!data?.file) {
        return false
      }

      const users: User[] = data?.data
      const user = users.find((user: User) => user.email === email)

      if (!user) {
        return false
      }
      return user
    } catch (err: Error | any) {
      return false
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body

      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Invalid data' })
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' })
      }

      if (!validateIsEmail(email)) {
        return res.status(400).json({ error: 'Invalid email' })
      }

      const userExists = await this.getUserByEmail(email)
      if (userExists) {
        return res.status(400).json({ error: 'Email already exists' })
      }

      const passwordHash = hashPassword(password)

      const user: User = { id: uuidv4(), name, email, password: passwordHash, created_at: new Date() }

      let file = await readFileSync(PATH_ROUTE)

      file = file

      if (!file) {
        await writeFileSync(PATH_ROUTE, [user])
        return res.status(201).json(user)
      } else {
        const users: User[] = JSON.parse(file.file)
        if (users) {
          users.push(user)
        }
        writeFileSync(PATH_ROUTE, users)
        delete user.password
        return res.status(201).json(user)
      }
    } catch (err: Error | any) {
      return res.status(500).json({ error: err.message })
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({ error: 'Invalid data' })
      }

      const user = await this.getUserByEmail(email)



      if (!user) {
        return res.status(400).json({ error: 'Invalid Credentials' })
      }

      if (user.password) {
        const comparePasswords = await comparePassword(password, user.password)


        if (comparePasswords) {
          delete user.password
          return res.json(user)
        } else {
          return res.status(400).json({ error: 'Invalid Credentials' })
        }
      } else {
        return res.status(400).json({ error: 'Invalid Credentials' })
      }
    } catch (err: Error | any) {
      return res.status(500).json({ error: err.message })
    }
  }
}
