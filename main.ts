import { Ichika as IchikaClass} from './src/Ichika'
import Logger from '@bwatton/logger'

if (!process.env.DISCORD_TOKEN) throw new Error('DISCORD_TOKEN is not set in ENV')

export const Ichika = new IchikaClass(process.env.DISCORD_TOKEN)

const logger: Logger = new Logger('Core')

;(async() => {
  await Ichika.init()
})()