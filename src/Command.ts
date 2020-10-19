import { Message, PermissionString } from 'discord.js'
import { Permission } from './util/Permissions'

import { Ichika } from './Ichika'

export enum Category {
  Fun = 'Fun',
  Music = 'Music',
  Utilities = 'Utilities',
  Moderation = 'Moderation',
}

export abstract class Command {

  public abstract name: string
  public abstract category: Category
  public abstract description: string
  public aliases: string[] = []
  public permissions: Permission[] = []

  public abstract run(ichika: Ichika, message: Message, args: string[]): Promise<any>

  public get perms(): PermissionString[] {
    return (this.permissions as PermissionString[])
  }

}