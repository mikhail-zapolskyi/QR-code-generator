import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
     data: new SlashCommandBuilder()
          .setName('server')
          .setDescription('Server description!'),
     async execute(interaction: any) {
          console.log(interaction);
          const { name, memberCount } = interaction.member.guild;
          await interaction.reply(`Welcome to ${ name } group. There are ${ memberCount } members`)
     }
}