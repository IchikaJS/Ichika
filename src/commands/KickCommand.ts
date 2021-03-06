import { Message } from 'discord.js'
import { Permission } from '../util/Permissions'

import { Category, Command } from '../Command'
import { Ichika } from '../Ichika'

export const KickCommand = new (class extends Command {

  public name = 'kick'
  public category = Category.Moderation
  public description = 'Kick a member from the Discord server'
  public aliases = []
  public permissions = [Permission.KICK_MEMBERS]

  public async run(ichika: Ichika, message: Message) {
    message.mentions.members.first().kick()
  }

})()