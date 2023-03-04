const Discord = require("discord.js");
const { Client, Intents, GatewayIntentBits, ActivityType, PermissionFlagsBits } = require('discord.js');
const discordTranscripts = require('discord-html-transcripts')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const config = require("./config.json");
const { QuickDB } = require('quick.db');
const db = new QuickDB(); // using default driver

client.login(config.token);


module.exports = client;
client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.config = require("./config.json");
require("./handler")(client);
const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);

client.once("ready", () => {
    console.log("💜 Teste Video")
})



client.on("interactionCreate", async (interaction) => {
    if (!interaction.guild) return;

    if (interaction.isCommand()) {

        const cmd = client.slashCommands.get(interaction.commandName);

        if (!cmd)
            return;

        const args = [];

        for (let option of interaction.options.data) {

            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        cmd.run(client, interaction, args);
    }

    if (interaction.isContextMenuCommand()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);

    }
});






/////////////Bate Ponto///////////////



   const dc = require("discord.js");
   const moment = require("moment");
   let array = []
   let nsei = []
   
   client.on("interactionCreate", async (int) => {

     if (!int.isButton()) return;
       if (int.customId === "btE") {
         if(nsei.includes(int.user.id)) {
         const reply3 = new dc.EmbedBuilder()
         .setDescription(`Você já possuí um ponto **ABERTO.**  `)
         .setColor('#8B0000')
         client.channels.cache.get("1076613234804674590");
         return await int.reply({ embeds: [reply3], ephemeral: true })    
         };
       
        nsei.push(int.user.id)

                
         const reply1 = new dc.EmbedBuilder()
         .setDescription(`${int.user}  Seu ponto foi **INICIADO** com sucesso. `)
         .setColor('#008000')
 

         
         int.reply({ embeds: [reply1], ephemeral: true })

         
         let array = [int.user.id]

         if(int.user.customId == "entrar") {
             array.push(int.user)
         } else if(int.user.customId == "sair") {
             array = array.filter(user => user.id != int.user.id)
         }

         let canalLogs = client.channels.cache.get("1076612995389608047"); 
 
         const tempo1 = `<t:${moment(int.createdTimestamp).unix()}>`
 
         const embedE = new dc.EmbedBuilder()
         .setTitle(`**NOVO PONTO INICIADO**  \n\n_INFORMAÇOES ABAIXO:_`)
         .setThumbnail(int.user.displayAvatarURL({ dinamyc: true, size: 2048, format: 'png' }))
         .setDescription(`Horário de entrada: ${tempo1}\nMembro: **${int.user.username} (${int.user.id})**`)
         .setColor('#008000')
         .setFooter({
         iconURL: int.guild.iconURL({ dynamic: true }),
         text: (`Copyright ©`)
             })
         .setTimestamp()
 
         
         canalLogs.send({ embeds: [embedE]})
 
       }
     
       if(int.customId === "btS") {

         if(!nsei.includes(int.user.id)) {
           const reply3 = new dc.EmbedBuilder()
         .setDescription(`Você não possui ponto **ABERTO.**`)
         .setColor('#8B0000')
         client.channels.cache.get("1076612395776086016");
         return await int.reply({ embeds: [reply3], ephemeral: true }) 
         } 

         nsei = nsei.filter((el) => {
           return el != int.user.id
         })

         const tempo2 = `<t:${moment(int.createdTimestamp).unix()}>`
         let canalLogs = client.channels.cache.get("1076612995389608047"); //ID do canal que será enviada logs do bateponto
 
         const reply2 = new dc.EmbedBuilder()
         .setDescription(`${int.user}  Seu ponto foi **FINALIZADO** com sucesso.`)
         .setColor('#8B0000')
 
         int.reply({ embeds: [reply2], ephemeral: true })
 
         const embedS = new dc.EmbedBuilder()
         .setTitle(`**PONTO FINALIZADO**\n\nINFORMAÇÕES ABAIXO:_`)
         .setThumbnail(int.user.displayAvatarURL({ dinamyc: true, size: 2048, format: 'png' }))
         .setDescription(`Horário de saída: ${tempo2}\nMembro: **${int.user.username} (${int.user.id})**`)
         .setColor('#8B0000')
         .setFooter({
         iconURL: int.guild.iconURL({ dynamic: true }),
         text: (`Copyright ©`)
             })
         .setTimestamp()
 
         canalLogs.send({ embeds: [embedS]})
 
       }
 });
