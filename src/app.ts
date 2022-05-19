import express from 'express';
import path from 'path';
import fs from 'fs';

import 'dotenv/config';
import { Client, Collection, Intents } from 'discord.js';
import { updateCommands } from './commands.config';

const app = express();
const port = 3000;

// Create a new client instance
const client: Client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.commands = new Collection();
const commandsPath: string = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.match(/.ts|.js$/));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// run this code once when client is ready
client.once('ready', () => { 
     updateCommands();
     console.log('ready!'); 
     
});

client.on('interactionCreate', async interaction => {
     if(!interaction.isCommand()) return;
     
     const command = client.commands.get(interaction.commandName);
     
     if(!command) return;

     try {
          await command.execute(interaction);
     } catch(error){
          console.log(error);
          await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
     }
});

client.on('messageCreate', message => {
     const { content, author } = message;

     if(!content) return;

     if(content === 'hello'){
          message.reply(`Hello ${ author }`);
     }
})

client.login(process.env.DISCORD_BOT_TOKEN);

app.listen(port, () => {
     try {
          console.log('Server works fine!')
     } catch (error) {
          console.log(error);
     }
})
