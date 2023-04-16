import bcrypt from 'bcrypt'
export const hashPassword = (password: string): string => {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(password, salt)

  return hash
}

import { promisify } from 'util'

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  const compare = promisify(bcrypt.compare)
  try {
    const result = await compare(password, hash)
    return result
  } catch (err) {
    return false
  }
}
