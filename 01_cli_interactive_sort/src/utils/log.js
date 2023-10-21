const COLORS = {
  default: '\x1b[0m',
  red: '\x1b[31;1m',
  white: '\x1b[97;1m',
};

export const log = {
  info: (text) => console.log(COLORS.white + text + COLORS.default),
  err: (text) => console.log(COLORS.red + text + COLORS.default),
}