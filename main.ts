import { Ichika } from './src/Ichika'

if (!process.env.DISCORD_TOKEN) throw new Error('DISCORD_TOKEN is not set in ENV')

new Ichika(process.env.DISCORD_TOKEN).init()