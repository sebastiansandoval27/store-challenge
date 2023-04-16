import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { User } from "@/models/User.model";

export class UserController {

  async getUsers(req: Request, res: Response) {
    try {
      let users: User[] = [];

      const data = fs.readFileSync(path.join(__dirname, '../database/users.json'), 'utf8');

      if (!data) {
        res.status(404).json({ error: 'Users not found' });
      }
      users = JSON.parse(data);
      res.json(users);
    } catch (err: Error | any) {
      res.status(500).json({ error: err.message });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        res.status(400).json({ error: 'Invalid data' });
      }
      const user: User = { id: uuidv4(), name, email, password, created_at: new Date() };

      const file = fs.readFileSync(path.join(__dirname, '../database/users.json'), 'utf8');

      if (!file) {
        fs.writeFileSync(path.join(__dirname, '../database/users.json'), JSON.stringify([user]));
        res.status(201).json(user);
      } else {
        const users: User[] = JSON.parse(file);
        users.push(user);
        fs.writeFileSync(path.join(__dirname, '../database/users.json'), JSON.stringify(users));
        res.status(201).json(user);
      }

      res.json(user);

    } catch (err: Error | any) {
      res.status(500).json({ error: err.message });
    }
  }
}
