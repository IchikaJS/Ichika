import { Message, MessageEmbed } from 'discord.js'

import { Category, Command } from '../Command'
import { Ichika } from '../Ichika'
import { Color } from '../util/Color'

export const HelpCommand = new (class extends Command {

  public name = 'help'
  public category = Category.Utilities
  public description = 'List the set of commands Ichika has in store'
  public aliases = ['h']

  public async run(ichika: Ichika, message: Message) {
    // const commandStr = ichika.cmds.map(cmd => cmd.name)
    const helpEmbed = new MessageEmbed()
      .setTitle('Available Commands (´｡• ω •｡`)')
      .setColor(Color.Ichika)

    for (const value of Object.values(Category)) {
      await helpEmbed.addField(`\`${value}\``, `!help ${value.toString().toLowerCase()}`, true)
    }
    message.channel.send(helpEmbed)
  }
})