export const appIds = [
  "finder",
  "soundboard",
  "textedit",
  "paint",
  "photo-booth",
  "minesweeper",
  "videos",
  "ipod",
  "synth",
  "pc",
  "terminal",
  "control-panels",
] as const;

export type AppId = typeof appIds[number]; 