import DiscordOauth from 'discord-oauth2'
import Server from 'socket.io'

import { Logger } from './Logger'

export const io = Server()
export const port = 3000

const oauth = (new (DiscordOauth as any)() as DiscordOauth.oauth)
const logger: Logger = new Logger('Socket')

io.on('connect', socket => {

  logger.info('Connection!')
})
