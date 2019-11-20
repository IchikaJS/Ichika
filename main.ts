import { Ichika as IchikaClass} from './src/Ichika'
import { io, port } from './src/util/socket'
import { Logger } from './src/util/Logger'

if (!process.env.DISCORD_TOKEN) throw new Error('DISCORD_TOKEN is not set in ENV')

export const Ichika = new IchikaClass(process.env.DISCORD_TOKEN)

const logger: Logger = new Logger('Core')

;(async() => {
  await Ichika.init()

  io.listen(port)
  logger.info(`IO listening on *:${port}`)
})()