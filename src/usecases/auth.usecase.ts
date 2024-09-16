import bcrypt from 'bcryptjs'

async function generateHash(password: string) {
  return bcrypt.hash(password, 10)
}

export default generateHash
