import { Message, MessageEmbed } from 'discord.js'

import { Category, Command } from '../Command'
import { Ichika } from '../Ichika'
import { Color } from '../util/Color'

export const HelpCommand = new (class extends Command {

  public name = 'help'
  public category = Category.Utilities
  public description = 'List the set of commands Ichika has in store'
  public aliases = ['h']
  public permissions = []

  public async run(ichika: Ichika, message: Message) {

    const commandStr = ichika.cmds.map(cmd => cmd.name).join(' ')

    message.channel.send(new MessageEmbed()
      .setTitle('Commands')
      .setColor(Color.Ichika)
      .setThumbnail(ichika.user.avatarURL())
      .addField('All commands', commandStr)
    )
  }
})()