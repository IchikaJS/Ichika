import { Client, Message, Guild } from 'discord.js'
import { Command } from './Command'
import * as cmdList from './commands'
import { Logger } from './util/Logger'

export class Ichika extends Client {

  private logger: Logger = new Logger('Ichika')

  private commands: {
    [k: string]: Command,
  } = {}

  constructor(private loginToken: string) {
    super()

    this.on('message', message => this.onMessageReceived(message))
    this.on('guildCreate', guild => this.onGuildJoin(guild))
  }

  public async init() {
    await this.login(this.loginToken)

    this.logger.info('Logged in as ' + this.user.username)

    this.user.setActivity('!help | Ichika', { type: 'PLAYING' })

    await this.loadCommands()
  }

  private async loadCommands() {
    const cmds = (cmdList as {
      [k: string]: Command,
    })
    for await (const command of Object.keys(cmds)) {
      const cmd = cmds[command]
      this.commands[cmd.name.toLowerCase()] = cmd

      if (cmd.aliases) {
        for await (const alias of cmd.aliases) {
          this.commands[alias] = cmd
        }
      }
    }
  }

  private escape(str: string) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  }

  private async onMessageReceived(message: Message) {
    if (!message.guild) return

    const prefix = '!'

    if (
      message.content &&
      (
        (message.content.startsWith(prefix) && message.content.trim() !== prefix) ||
        (message.content.startsWith(`<@!${this.user.id}>`) && message.content.trim() !== `<@!${this.user.id}>`) ||
        (message.content.startsWith(`<@${this.user.id}>`) && message.content.trim() !== `<@${this.user.id}>`)
      )
    ) {
      const content = message.content
        .replace(new RegExp(`^(${this.escape(prefix)})`, 'gim'), '')
        .replace(new RegExp(`^(<@!?${this.user.id}>)`, 'gim'), '')
        .trim()
      const contentParts = content.split(/\s/gm)
      const cmdStr = contentParts[0].toLowerCase()
      const args = contentParts.slice(1)

      if (!this.commands[cmdStr]) return

      const cmd = this.commands[cmdStr]
      await cmd.run(this, message, args).catch(err => {
        //
      })
    }
  }

  private async onGuildJoin(guild: Guild) {
    guild.owner.send(`
      Thanks for adding me to **${guild.name}**!
      I am currently in early development so don't expect much from me yet!
      You can find my commands on my website at **https://ichika.xyz**!
      if you need any support, hop on over to **https://discord.gg/XTXD57M** and grab the developers attention!

      If you come across any bugs, please report them over at **https://github.com/IchikaJS/Ichika/issues**

      Thanks!
    `.replace(/\s\s+/g, '\n'))
  }
}