export default class Config {
  private load(config: string): Config {
    try {
      let cfg = JSON.parse(config)
      if (typeof cfg.year == 'undefined') {
        throw null
      } else if (typeof cfg.year != 'number') {
        throw null
      } else {
        this.year = cfg.year
      }
    } catch (_) {
      let t = new Date()
      if (t.getMonth() >= 5 && t.getDate() >= 6) {
        this.year = t.getFullYear() + 1
      } else {
        this.year = new Date().getFullYear()
      }
    }
    return this
  }

  private year!: number

  public read() {
    return {
      year: this.year
    }
  }

  constructor(config: string) {
    this.load(config)
  }
}

export default interface Config {
  read(): {
    year: number
  }
}
