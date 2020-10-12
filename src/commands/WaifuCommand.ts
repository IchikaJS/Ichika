import { Message, MessageEmbed } from 'discord.js'

import { Category, Command } from '../Command'
import { Ichika } from '../Ichika'
import fetch from 'node-fetch'

export const WaifuCommand = new (class extends Command {

  public name = 'waifu'
  public category = Category.Fun
  public description = 'Get a random image of a anime waifu'
  public aliases = []

  
  public async run(ichika: Ichika, message: Message) {
    const body: any = await fetch('http://api.cutegirls.moe/json')
      .then(res => res.json())

    message.channel.send(new MessageEmbed()
      .setTitle(body['data'].title)
      .setDescription(body['data'].source)
      .setImage(body['data'].image)
      .setURL(body['data'].link)
      .setFooter(body['data'].author)
    )
  }
})