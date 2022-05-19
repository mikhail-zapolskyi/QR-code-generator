import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';


export const updateCommands = () => {
     const commands = [];
     const commandsPath: string = path.join(__dirname, 'commands');
     const commandFiles: string[] = fs.readdirSync(commandsPath).filter(file => file.match(/.ts|.js$/));
          
     for(const file of commandFiles){
          const filePath: string = path.join(commandsPath, file);
          const command = require(filePath);
          commands.push(command.data.toJSON())
     };
     
     const rest: REST = new REST({ version: '9' }).setToken(process.env.DISCORD_BOT_TOKEN);
     
     (async () => {
          try {
               console.log('Started refreshing application (/) commands.');
               await rest.put(
                    Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID), 
                    { body: commands }
               )
               console.log('Successfully reloaded application (/) commands.');
          } catch (error){
               console.error(error);
          }
     })();
}

