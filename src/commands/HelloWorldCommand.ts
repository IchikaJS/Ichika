import { Message } from 'discord.js'

import { Category, Command } from '../Command'
import { Ichika } from '../Ichika'

export const HelloWorldCommand = new (class extends Command {

  public name = 'helloworld'
  public category = Category.Fun
  public description = 'Hello World!'
  public aliases = ['hw']

  public async run(ichika: Ichika, message: Message) {
    message.channel.send('Hello World!')
  }

})()