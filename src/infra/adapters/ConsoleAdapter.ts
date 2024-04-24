/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import colors from 'colors'

class ConsoleAdapter {
  private print (color: colors.Color, args) {
    const coloredArgs = args.map(arg => color(arg))
    console.log(...coloredArgs)
  }

  info = (...input: any) => this.print(colors.blue, input)

  warn = (...input: any) => this.print(colors.yellow, input)

  log = (...input: any) => this.print(colors.green, input)

  error = (...input: any) => this.print(colors.red, input)

  rainbow = (...input: any) => this.print(colors.rainbow, input)
}

export default new ConsoleAdapter()
