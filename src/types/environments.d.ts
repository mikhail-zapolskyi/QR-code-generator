export {};

declare global {
     namespace NodeJS {
          interface ProcessEnv {
               DISCORD_BOT_TOKEN: string,
               DISCORD_GUILD_ID: string,
               DISCORD_CLIENT_ID: string
          }
     }
}