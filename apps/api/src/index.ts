import { createHTTPServer } from '@trpc/server/adapters/standalone'

import { userByIdProcedure } from './procedures/user-by-id'
import { userCreateProcedure } from './procedures/user-create'
import { userListProcedure } from './procedures/user-list'
import { router } from './trpc'

const appRouter = router({
  userList: userListProcedure,
  userById: userByIdProcedure,
  userCreate: userCreateProcedure,
})

export type AppRouter = typeof appRouter

const server = createHTTPServer({
  router: appRouter,
})

server.listen(3000)
