const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json")

exports.run = async (client, message, args) => {
  
 if (message.author.id !== ayarlar.sahip) return message.react("uyarı emoji id") && message.reply('**Gerekli Yetkiye Sahip Değilsin!**').then(msg => msg.delete(9000))  

  message.react('onay emoji id').catch()
  const embed = new Discord.RichEmbed()
    .setColor("48b2a7")
    .setDescription(`Bot yeniden başlatılıyor!`);
     message.channel.send(embed).then(m => m.delete(7000)).then(msg => {
        console.log("[BOT] Yeniden başlatılıyor");
        process.exit(0);
    });
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'reboot', 
  description: 'Botu yeniden başlatır',
  usage: 'reboot'
};
