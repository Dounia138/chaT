import { z } from 'zod'

import { findUserById } from '../repositories/user'
import { publicProcedure } from '../trpc'

export const userByIdProcedure = publicProcedure
  .input(z.string())
  .query(async (opts) => {
    const { input } = opts
    const user = await findUserById(input)
    return user
  })
