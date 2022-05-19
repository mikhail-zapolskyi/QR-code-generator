import { SlashCommandBuilder } from '@discordjs/builders';

module.exports = {
     data: new SlashCommandBuilder()
          .setName('greet')
          .setDescription('Replies with user name greet'),
     async execute(interaction: any) {
          const { username } = interaction.user;
          await interaction.reply(`Welcome ${ username }`)
     }
}
