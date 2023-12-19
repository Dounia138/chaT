import { database } from '../database/database'

type User = { id: string, name: string }

const getUserData = (): User[] => {
  return database.users
}

export const findManyUsers = async () => {
  const users = getUserData()
  return users
}

export const findUserById = async (id: string) => {
  const users = getUserData()
  const user = users.find(user => user.id === id)
  return user
}

export const createUser = async (data: { name: string }) => {
  const users = getUserData()
  const user = { id: String(users.length + 1), ...data }
  users.push(user)
  return user
}
