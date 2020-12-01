const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const moment = require("moment");
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args, presence) => {

 if (message.author.id !== ayarlar.sahip && !message.member.roles.has("yetki rol id") && !message.member.roles.has("yetki rol id") && !message.member.roles.has("yetki rol id")) return message.react("uyarı emoji id") && message.reply('**Gerekli Yetkiye Sahip Değilsin!**').then(msg => msg.delete(9000))  

  let user = message.mentions.users.first();

  if (!user) user = message.author;

  const member = message.guild.member(user);
  let ban = await db.fetch(`banlama.${member.id}`);
  let banaç = await db.fetch(`banaç.${member.id}`);
  let jail = await db.fetch(`jail.${member.id}`);
  let unjail = await db.fetch(`unjail.${member.id}`);
  let tmute = await db.fetch(`tmute.${member.id}`);
  let vmute = await db.fetch(`vmute.${member.id}`);
  let umute = await db.fetch(`unmute.${member.id}`);
  let kız = await db.fetch(`kizteyit.${member.id}`);
  let erkek = await db.fetch(`erkekteyit.${member.id}`);
  let nick = await db.fetch(`nick.${member.id}`);

  let k_uses = ""
  let e_uses = ""
  let n_uses = ""

  if (!kız) {
    if (kız  === null || kız === undefined || kız === NaN)
    k_uses = 0
  } else {
  k_uses = kız
  }

  if (!erkek) {
    if (erkek === null || erkek === undefined || erkek === NaN)
    e_uses = 0
  } else {
    e_uses = erkek
  }

  if (!nick) {
    if (nick === null || nick === undefined || nick === NaN)
    n_uses = 0
  } else {
    n_uses = nick
  }

let işlem = e_uses + k_uses + n_uses

  
  const embed = new Discord.RichEmbed()
  .setTitle(`Kayıt İşlemleri `)
  .setColor("48b2a7")
  .setTimestamp()
    .setFooter(`Adalet Mülkün Temelidir!`, message.author.avatarURL)
  .setDescription(`
Kız : **${k_uses}** 

Erkek : **${e_uses}**

İsim Değiştirme : **${n_uses}**

Toplam İşlem Sayısı : **${işlem}**
`);
 message.channel.send(embed);

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kayıtım","kayıt"],
  permLevel: 0
};

exports.help = {
  name: "kayıt-göster",
  category: "kullanıcı",
  description: "İstediğiniz kullanıcı hakkında bilgi verir.",
  usage: "rank <@kişi-etiket>"
};