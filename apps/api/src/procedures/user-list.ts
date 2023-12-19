import { findManyUsers } from '../repositories/user'
import { publicProcedure } from '../trpc'

export const userListProcedure = publicProcedure
  .query(async () => {
    const users = await findManyUsers()
    return users
  })
