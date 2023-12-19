import { z } from 'zod'

import { createUser } from '../repositories/user'
import { publicProcedure } from '../trpc'

export const userCreateProcedure = publicProcedure
  .input(z.object({ name: z.string() }))
  .mutation(async (opts) => {
    const { input } = opts
    const user = await createUser(input)
    return user
  })
