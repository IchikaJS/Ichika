import { Message, MessageEmbed } from 'discord.js'

import { Category, Command } from '../Command'
import { Ichika } from '../Ichika'

export const FortuneCommand = new (class extends Command {

  public name = '8ball'
  public category = Category.Fun
  public description = 'Let Ichika predict its thoughts on a question!'
  public aliases = ['fortune']

  public async run(ichika: Ichika, message: Message, args: string[]) {
    const question = args.join(' ')
    if (!question) return message.channel.send('Please provide a question for me to reply with.')

    const responses = [
      'Without a doubt.',
      'Yes, definitely',
      'Most likely',
      'Outlook good',
      'Yes!',
      'Reply hazy, try again',
      'Ask again later',
      'Can\'t tell you now',
      'I can\'t predict it',
      'Don\'t count on it',
      'My sources say no',
      'Outlook not so good',
      'Absolutely not.',
      'Very doubtful',
    ]

    const response = responses[Math.floor(Math.random() * responses.length)]

    message.channel.send(
      new MessageEmbed()
        .setTitle('`🎱` 8 Ball Fortune')
        .setDescription('- Get Ichika\'s thoughts on a question!')
        .setColor('#dee8eb')
        .addField(`${message.author.username}'s Question:`, question)
        .addField('My reply:', response)
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true })),
    )
  }
})