import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
     data: new SlashCommandBuilder()
          .setName('qrcode')
          .setDescription('Generates QR CODE')
          .addStringOption(option => 
               option.setName('input').setDescription('User input value to QR CODE')     
          )
          .addNumberOption(option => 
               option.setName('width').setDescription('User input value to QR CODE')     
          )
          .addNumberOption(option => 
               option.setName('height').setDescription('User input value to QR CODE')     
          ),
     async execute(interaction: any) {
          const input: string = interaction.options.getString('input').split(' ').join('_') || 'Test_QR_CODE';
          const width: number = interaction.options.getNumber('width') || 200;
          const height: number = interaction.options.getNumber('height') || 200;
          const url: string = `https://chart.googleapis.com/chart?cht=qr&chs=${ width }x${ height }&chl=${ input }`
          interaction.reply(url)
     }
}
