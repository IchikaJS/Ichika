import { Message } from 'discord.js'

import { Ichika } from './Ichika'

export enum Category {
  Fun,
  Music,
  Utilities,
  Moderation,
  ImageManipulation,
}

export abstract class Command {

  public abstract name: string
  public abstract category: Category
  public abstract description: string
  public aliases: string[] = []
  public permissions: string[] = []

  public abstract run(ichika: Ichika, message: Message, args: string[]): Promise<any>

}