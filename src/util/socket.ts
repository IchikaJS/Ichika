import DiscordOauth from 'discord-oauth2'
import Server from 'socket.io'

import { API, Logger } from '.'
import { Ichika } from '../../main'

export const io = Server()
export const logger = new Logger('IO')
export const port = 3000

const oauth = (new (DiscordOauth as any)() as DiscordOauth.oauth)

io.on('connect', socket => {
  let loggedIn: boolean = false

  logger.info(`Connected to socket client with ID ${socket.id}`)

  socket.on('oauthCode', async (code: string, redirectUri: string, scope: string, ack) => {
    ack(await oauth.tokenRequest({
      client_id: Ichika.user.id,
      client_secret: (process.env.OAUTH_SECRET as string),
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
      code,
      scope,
    }))
  })

  socket.on('login', async token => {
    if (loggedIn) return

    console.log('login')

    loggedIn = true

    const api = new API(token, (process.env.DISCORD_TOKEN as string))

    let me: any = null

    socket.on('me', async ack => {
      logger.debug('ran!')
      if (typeof ack !== 'function') return

      ack(me = await api.me())
    })

    socket.on('guilds', async ack => {
      if (typeof ack !== 'function') return

      ack(await api.guilds())
    })

    socket.on('guild', async (id, ack) => {
      if (typeof id !== 'string') return
      if (typeof ack !== 'function') return

      ack(await api.guild(id))
    })
  })
})