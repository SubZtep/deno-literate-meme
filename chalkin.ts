import { styles } from "https://deno.land/x/ansi_styles@1.0.1/mod.ts";

/**
 * Creates a new `Chalkin` which can be used to style text.
 *
 * ## Example
 * ```
 * const chalkin = new Chalkin();
 * console.log(chalkin.bold.underline.bgBlue.red("Hello,", "World!"));
 * ```
 */
export default class Chalkin extends Function {
  #openAll = "";
  #closeAll = "";

  bold!: this;
  dim!: this;
  italic!: this;
  underline!: this;
  inverse!: this;
  hidden!: this;
  strikethrough!: this;

  black!: this;
  red!: this;
  green!: this;
  yellow!: this;
  blue!: this;
  magenta!: this;
  cyan!: this;
  white!: this;
  blackBright!: this;
  redBright!: this;
  greenBright!: this;
  yellowBright!: this;
  blueBright!: this;
  magentaBright!: this;
  cyanBright!: this;
  whiteBright!: this;
  gray!: this;
  grey!: this;

  bgBlack!: this;
  bgRed!: this;
  bgGreen!: this;
  bgYellow!: this;
  bgBlue!: this;
  bgMagenta!: this;
  bgCyan!: this;
  bgWhite!: this;
  bgBlackBright!: this;
  bgRedBright!: this;
  bgGreenBright!: this;
  bgYellowBright!: this;
  bgBlueBright!: this;
  bgMagentaBright!: this;
  bgCyanBright!: this;
  bgWhiteBright!: this;
  bgGray!: this;
  bgGrey!: this;

  constructor() {
    super("...args", "return this.style(...args)");

    const add = (
      name: string,
      open: string,
      close: string,
      color = false,
    ) => {
      Object.defineProperty(this, name, {
        get: (): this => {
          if (color && Deno.noColor) return this;
          this.#openAll = this.#openAll + open;
          this.#closeAll = close + this.#closeAll;
          return this;
        },
      });
    };

    for (const [mod, { open, close }] of Object.entries(styles.modifier)) {
      add(mod, open, close);
    }

    for (const [color, { open, close }] of Object.entries(styles.color)) {
      add(color, open, close, true);
    }

    for (const [bgColor, { open, close }] of Object.entries(styles.bgColor)) {
      add(bgColor, open, close, true);
    }
  }

  /**
   * Styles the given arguments.
   *
   * This will use the chosen styles to style the given arguments as a string.
   * Whilst this can be called manually, it is also called by using the last
   * style as a function.
   *
   * ## Example
   * ```
   * console.log(chalkin.red("Hello,", "World!"));
   * // same
   * console.log(chalkin.red.style("Hello,", "World!"));
   * ```
   */
  style(...args: unknown[]): string {
    const str = `${this.#openAll}${args.join(" ")}${this.#closeAll}`;
    this.#openAll = "";
    this.#closeAll = "";
    return str;
  }
}
