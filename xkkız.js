const Discord = require('discord.js');
var db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {

 if (message.author.id !== ayarlar.sahip && !message.member.roles.has("yetkili-rol-id") && !message.member.roles.has("yetkili-rol-id") && !message.member.roles.has("yetkili-rol-id")) return message.react("uyarı-emoji-id") && message.reply('**Gerekli Yetkiye Sahip Değilsin!**').then(msg => msg.delete(9000))  

  db.add('kizteyit.'+message.author.id , 1) // kayıt ettiğinde sayı ekleme
  
 let msg = message;

 let user;
  if (message.mentions.users.first()){
    user = message.mentions.users.first();
  } else if (args[0]  && !message.mentions.users.first()){
    user = message.guild.members.get(args[0])
  }
    
  let member = msg.guild.member(user);
  let kayıtsız = 'kayıtsız rol id';
  let kayıtsız2 = 'kayıtsız rol id';
  let kız = 'kız rol id';
  let rol = 'kız rol id 2';
  let rol2 = 'kız rol id 3';

var argumentler = message.content.split(" ");
 var isim = argumentler[2] ;
 var yas = argumentler[3];
if (!user) return message.react("uyarı emoji") && message.reply(`Bir kullanıcı etiketlemelisin! @kişi/id`).then(msg => msg.delete(5000))  
if (!isim) return message.react("uyarı emoji") && message.reply(`Kullanıcı adı yazmalısın.`).then(msg => msg.delete(5000))  
if (!yas) return message.react("uyarı emoji") && message.reply(`Yaş belirtmediniz.`).then(msg => msg.delete(5000)) 
if (isim.length + yas.length + 3 > 32) return message.react("uyarı emoji") && message.reply(`Takma ad 32 karakteri geçmez!`).then(msg => msg.delete(5000))
if(message.author.id === user.id && message.react("uyarı emoji")) return message.reply("Kendini kayıt edemezsin!").then(msg => msg.delete(9000))   

await member.setNickname(`${isim} | ${yas}`)// tag girmeyi unutma .d
 let uyarı = 'Bu Kişi Zaten Kayıt Olmuş!'
 
  
if (!user) return msg.reply('Kimi kayıt edeceğim ?')

  if (member.roles.has(kız)) return message.react("uyarı emoji") && msg.reply(uyarı).then(msg => msg.delete(9000))  
  
  member.removeRole(kayıtsız)
  member.removeRole(kayıtsız2)
  member.addRole(kız)
  member.addRole(rol)
  member.addRole(rol2)

  member.removeRole('erkek rol id')
  member.removeRole('erkek rol id')
  member.removeRole('erkek rol id')


 
    let channel = message.guild.channels.get ('chat id') //: 'Nerde bu kanal aQ';
    if (!channel) return console.log('KaNaal Yoq');
    channel.send(`${member} **Sunucu Katıldı Hoşgeldin Dostum!**`).catch(console.log).then(m => m.delete(7500))

 var kyoyu = new Discord.RichEmbed()
    .setColor("48b2a7")
    .setDescription(`~ ${member} Adlı Kullanıcı Kayıt Edildi.\n~ Kullanıcı Adı \`${member.nickname || '404'}\` Olarak Ayarlandı.`)
    .setFooter(`Adalet Mülkün Temelidir!`, message.author.avatarURL)
    .setTimestamp();
     message.channel.send(kyoyu).then(m => m.delete(7000))
     message.react('onay emoji id').catch()

let nickname = member.nickname ? member.nickname : `${user.username} (**Düzenlenmedi**)`
let kayits = db.fetch(`kayitsayii.${message.author.id}`) || 0;
  let i 
  if (kayits === 0 || kayits === null || kayits === undefined){
    db.add(`kayitsayii.${message.author.id}`,1)
    i = 1
  } else i = kayits
var kyoyacik = new Discord.RichEmbed()
.setColor("48b2a7")//RANDOM RENK
.setThumbnail(user.displayAvatarURL) //KAYIT OLAN KULLANICININ AVATARI
.setTimestamp() //zaman
.addField('Kayıt Eden Yetkili', `${message.author.toString()}`)
.addField('Kayıt Olan', `${user.toString()}`)
.addField('Kayıt Bilgisi', nickname)
.addField('Yetkilinin Toplam Kayıt Sayısı', i)
await message.guild.channels.get('kız log').send(kyoyacik).catch(console.error)
await db.add(`kayitsayii.${message.author.id}`, 1)
//await db.push(`kayitci_${message.author.id}`, message.author.id)

 
 

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kız','Kız','k'],
  permLevel: 0
};

exports.help = {
  name: 'k',
  description: 'Kayıt  :3',
  usage: 'kayıt'
};