import { Client, Message } from 'discord.js'
import { Command } from './Command'
import * as cmdList from './commands'
import Logger from '@bwatton/logger'

export class Ichika extends Client {

  private logger: Logger = new Logger('Ichika')

  public commands: {
    [k: string]: Command,
  } = {}

  public cmds: Command[] = []
  
  constructor(private loginToken: string) {
    super()

    this.on('message', message => this.onMessageReceived(message))
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
      this.cmds.push(cmd)

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

      if (!message.member.permissions.has(cmd.perms)) return message.channel.send(`⚠ You do not have the permissions \`${cmd.perms}\` to use this command`)

      await cmd.run(this, message, args).catch(err => {
        //
      })
    }
  }
}