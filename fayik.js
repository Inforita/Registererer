const Discord = require("discord.js");
const client = new Discord.Client();
const bot = client;
const moment = require('moment');
const db = require('quick.db');
require('moment-duration-format');
let express = require('express');
let app = express()

const ayarlar = require('./ayarlar.json')
var prefix = ayarlar.prefix 

const activities_list = [
    " Buraya Bir Şey Yazma Aşko",// Sadece Tırnak Yani " İşareti İçinde Yazmakta Olan Mesajları Değiştirin.
    " Buraya yazabilirsin",// Sadece Tırnak Yani " İşareti İçinde Yazmakta Olan Mesajları Değiştirin.
    ]; 
client.on('ready', () => {
client.user.setStatus("dnd")
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // Bu Kısımları Ellemeyin
        client.user.setActivity(activities_list[index]); // Bu Kısımları Ellemeyin.
    }, 30000); // Selam 1 Saniye = 1000 MiliSaniye Yapar - Kısacası Böyle Bırakırsan - 3 Saniyede 1 Değişir. 
});

client.on('ready',async () => {
await client.channels.get('ses-kanal-id').join()
});

client.on("guildMemberAdd", member => {
let tag = "tag"
member.setNickname(`${tag} İsim | Yaş`);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", async member => {
if (member.guild.id !== "sunucu-id" ) return;
  let user = member.user
  const millisCreated = new Date().getTime() - user.createdAt.getTime();
  const daysCreated = moment.duration(millisCreated).format("Y [yıl], D [gün], H [saat], m [dakika], s [saniye]")
let xd;
let kanal = client.channels.get("log-id")

let emoji1 = client.emojis.get('emoji-id') 
let emoji2 = client.emojis.get('emoji-id')
let emoji3 = client.emojis.get('emoji-id')
let emoji4 = client.emojis.get('emoji-id') 
let emoji5 = client.emojis.get('emoji-id')

kanal.send(`${emoji1}  ${member} **Sunucumuza hoş geldin.**
 
${emoji2} **Seninle Birlikte** \`${member.guild.members.size}\` **Üyeye ulaştık!** 

${emoji3} **Kayıt Odalarına Girip Yetkilileri Etiketleyebilirsin!**

${emoji4} **Hesap ${moment(user.createdAt).format('DD/MM/YYYY')} (${daysCreated}) Tarihinde Oluşturuldu!**

${emoji5} <@&yetkilirolid> **Rolündeki Yetkililer Seninle İlgilenicektir.**`).catch(sex=>{return});
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("userUpdate", async(eski, yeni) => {
  if(eski.username !== yeni.username) {
  if(!yeni.username.includes("tag") && client.guilds.get("sunucu-id").members.get(yeni.id).roles.has("tag-rol-id")) { 
     client.guilds.get("sunucu-id").members.get(yeni.id).removeRole("tag-rol-id")//tag
      yeni.roles.forEach(x => {
      yeni.removeRole(x)
      });
     client.guilds.get("sunucu-id").members.get(yeni.id).addRole("tag-rol-id")//kayıtsız
     client.channels.get('log-id').send(`${yeni} **Tagımızı Çıkararak Ailemizden Ayrıldı!**`)
 }
     if(yeni.username.includes("tag") && !client.guilds.get("sunucu-id").members.get(yeni.id).roles.has("tag-rol-id")) {
      client.channels.get('log-id').send(`${yeni} **Tagımızı Alarak Ailemize Katıldı!**`)
      client.guilds.get("sunucu-id").members.get(yeni.id).addRole("tag-rol-id")
     }
  }
  })

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let botisim = 'neblm'


let log = message => {
  console.log(message)
}

let fs = require('fs');

bot.commands = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {

  if(err) console.log(err);

  let commandFile = files.filter(file => file.split(".").pop() === "js");

  if(commandFile.length <= 0) return console.log("Couldn't find commands.");

  commandFile.forEach((file, i) => {

    let props = require(`./komutlar/${file}`);

    console.log(`${file} adlı komut başarıyla yüklendi.`);

    client.commands.set(props.help.name, props);

  });

});

client.commands = bot.commands;

client.on("ready", async () => {
  console.log(`${client.user.username} is now online with ${client.guilds.size} server(s)!`);
 // bot.user.setActivity("with Countdowns!");
});

client.on("message", async message => {

  if(message.author.bot) return;

  if(message.channel.type === "dm") return;

  let prefix = ayarlar.prefix;
  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

  if(!command.startsWith(prefix)) return;

  let commandRaw = command.split(prefix)[1];
  let commandFile = bot.commands.get(commandRaw);


 if(commandFile) {
   if (db.has(`botuncalismamakanali_${message.channel.id}`) && commandFile.help.name !== "çalışmakanal") return message.reply(`Bu kanalda komut kullanamazsın.<#750728605008396308> Kanalında Kullanınız.`).then(m => m.delete(5000))
   
   commandFile.run(client, message, args);
 }

});







client.login(ayarlar.token).catch(err => {
console.error('Giriş Yapamadım')
console.error(err.message)
});