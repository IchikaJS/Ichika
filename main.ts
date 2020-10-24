import { Ichika as IchikaClass } from './src/Ichika'

if (!process.env.DISCORD_TOKEN) throw new Error('DISCORD_TOKEN is not set in ENV')

export const Ichika = new IchikaClass(process.env.DISCORD_TOKEN)
;(async() => {
  await Ichika.init()
})()