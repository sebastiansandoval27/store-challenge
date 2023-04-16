import bcrypt from 'bcrypt'
export const hashPassword = (password: string): string => {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(password, salt)

  return hash
}
