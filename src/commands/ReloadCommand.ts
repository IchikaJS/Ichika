import { Message, MessageEmbed } from 'discord.js'

import { Category, Command } from '../Command'
import { Ichika } from '../Ichika'
import { Permission } from '../util'

export const ReloadCommand = new (class extends Command {

  public name = 'reload'
  public category = Category.Utilities
  public description = 'Soft reload Ichika'
  public aliases = [Permission.ADMINISTRATOR] // Use admin for now. Will be locked to Ichika admins.

  public async run(ichika: Ichika, message: Message, args: string[]) {
    const reloadMessage = await message.channel.send('Reloading, please wait... C= C= C= C=┌( `ー´)┘')
    await ichika.reload().then(() => {
      message.channel.send(
        new MessageEmbed()
          .addField('Status\'s', ichika.statuses.map(s => `${s.status}: \`${s.type}\``))
          .addField('Response\'s', ichika.responses.map(s => `${s.response}: \`${s.module}\``)),
      )
      reloadMessage.edit('Reloaded successfully! (* ^ ω ^)')
    })
  }
})