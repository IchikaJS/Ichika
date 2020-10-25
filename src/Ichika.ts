import { Client, Message } from 'discord.js'
import { Command } from './Command'
import * as cmdList from './commands'
import Logger from '@bwatton/logger'
import { API } from './util/API'
import { IResponse, IStatus } from './types/types'

export class Ichika extends Client {

  private logger: Logger = new Logger('Ichika')

  public ichAPI: API = new API('http://localhost:3000')

  public commands: {
    [k: string]: Command,
  } = {}

  public cmds: Command[] = []

  public statuses: IStatus[] = []
  public responses: IResponse[] = []

  constructor(private loginToken: string) {
    super()

    this.on('message', message => this.onMessageReceived(message))
  }

  public async init(): Promise<any> {
    await this.login(this.loginToken)
    await this.loadCommands()

    this.logger.info('Logged in as ' + this.user.username)

    await this.reload()

    setInterval(() => {
      const status = this.statuses[Math.floor(Math.random() * this.statuses.length)] as any
      this.user.setActivity(status.status, { type: status.type })
    }, 25 * 1000)
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
    return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
  }

  public async reload(): Promise<any> {
    if (this.statuses.length > 0) this.statuses = []
    if (this.responses.length > 0) this.responses = []

    await this.ichAPI.get('statuses')
      .then(response => {
        for (let i = 0; i < response.statuses.length; i++) {
          this.statuses.push(response.statuses[i])
        }
      })

    await this.ichAPI.get('responses')
      .then(response => {
        for (let i = 0; i < response.responses.length; i++) {
          this.responses.push(response.responses[i])
        }
      })
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

      if (!message.member.permissions.has(cmd.perms)) {
        return message.channel.send(`⚠ You do not have the permissions \`${cmd.perms}\` to use this command`)
      }

      await cmd.run(this, message, args).catch(err => {
        //
      })
    }
  }
}