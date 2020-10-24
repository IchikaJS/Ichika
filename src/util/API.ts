import fetch from 'node-fetch'

export class API {

  constructor(public uri: string) { }

  public async get(path: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const res = await fetch(`${this.uri}/${path}`)

      if (res.status !== 200) return reject([res.status, await res.json()])

      resolve(await res.json())
    })
  }

}