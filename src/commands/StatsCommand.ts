import { Message, MessageEmbed } from 'discord.js'

import { Category, Command } from '../Command'
import { Ichika } from '../Ichika'

export const StatsCommand = new (class extends Command {

  public name = 'stats'
  public category = Category.Utilities
  public description = 'Fetch technical information about Ichika'

  public async run(ichika: Ichika, message: Message) {
    message.channel.send(
      new MessageEmbed()
        .setDescription('𝓣𝓮𝓬𝓱𝓷𝓲𝓬𝓪𝓵 𝓘𝓷𝓯𝓸𝓻𝓶𝓪𝓽𝓲𝓸𝓷')
        .addField('Servers', this.format(ichika.guilds.cache.size))
        .addField('Users', this.format(ichika.users.cache.size))
        .addField('Channels', this.format(ichika.channels.cache.size)),
    )
  }

  private format(v: any) {
    return `\`\`\`css\n${v}\`\`\``
  }

})()