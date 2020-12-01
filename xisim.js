const db = require('quick.db')
const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {

 if (message.author.id !== ayarlar.sahip && !message.member.roles.has("yetkili rol id") && !message.member.roles.has("yetkili rol id") && !message.member.roles.has("yetkili rol id")) return message.react("uyarı emoji id") && message.reply('**Gerekli Yetkiye Sahip Değilsin!**').then(msg => msg.delete(9000))  

 db.add('nick.'+message.author.id , 1)

 let msg = message;

 let user;
  if (message.mentions.users.first()){
    user = message.mentions.users.first();
  } else if (args[0]  && !message.mentions.users.first()){
    user = message.guild.members.get(args[0])
  }
    
  let member = msg.guild.member(user);

 var argumentler = message.content.split(" ");
 var isim = argumentler[2] ;
 var yas = argumentler[3];
 if (!user) return message.react("716404735883608105") && message.reply(`Bir kullanıcı etiketlemelisin! @kişi/id`).then(msg => msg.delete(5000))  
 if (!isim) return message.react("716404735883608105") && message.reply(`Kullanıcı adı yazmalısın.`).then(msg => msg.delete(5000))  
 if (!yas) return message.react("716404735883608105") && message.reply(`Yaş belirtmediniz.`).then(msg => msg.delete(5000)) 
 if (isim.length + yas.length + 3 > 32) return message.react("716404735883608105") && message.reply(`Takma ad 32 karakteri geçmez!`).then(msg => msg.delete(5000))
 if(message.author.id === user.id && message.react("716404735883608105")) return message.reply("Kendini kayıt edemezsin!").then(msg => msg.delete(9000))   

await member.setNickname(`${isim} | ${yas}`)// tag girmeyi unutma .d

const fayikcim = new Discord.RichEmbed()
    .setColor("48b2a7")
    .setDescription(`${member} Adlı kullanıcı İsmi \`${member.nickname || '404'}\` Olarak Ayarlandı!`)
    .setFooter(`Alpha ❤️ Ocean`, message.author.avatarURL)
    .setTimestamp()
     message.channel.send(fayikcim).then(m => m.delete(7500))//5saniyede mesajı siler

 let channel = message.guild.channels.get ('768110354890096693') //: 'Nerde bu kanal aQ';
    if (!channel) return console.log('KaNaal Yoq');
    
    var fayik = new Discord.RichEmbed()
    .setColor("48b2a7")
    .setDescription(`${member} Adlı Kullanıcının İsmini Değiştirdi! \n Yeni İsmi \`${member.nickname || '404'}\` Olarak Değiştirildi.`)
    .setFooter(`${message.author.tag} tarafından`, message.author.avatarURL)
    .setTimestamp()
    channel.send(fayik).catch(console.log)
    message.react('716406454638346300').catch()

  
}
           
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['isim','İsim','nick','Nick','n'],
  permLevel: 4
};

exports.help = {
  name: 'isim',
  kategori: 'moderasyon',
  description: 'Belirtilen kullanıcının nickini düzenler.',
  usage: 'nick @etiket <nİck>'
};