require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const command = require('./command');
const firstMessage = require('./first-message')
const prefix = require('./config.json')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});



client.on('message', message => {
  if (message.content === '!what is my avatar') {
    return message.reply(message.author.displayAvatarURL());
  }
});

command(client, 'server', (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} members`
      )
    })
  })

command(client, ['cc', 'clearchannel'], (message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results)
      })
    }
  })


  command(client, 'createtextchannel', (message) => {
    const name = message.content.replace('!createtextchannel ', '')

    message.guild.channels
      .create(name, {
        type: 'text',
      })
      .then((channel) => {
      })
  })

  command(client, 'createvoicechannel', (message) => {
  const name = message.content.replace('!createvoicechannel ', '')
  const member = message.member

  const checkPermission = (member) => message.member.hasPermission('MANAGE_CHANNELS') || message.member.hasPermission('ADMINISTRATOR');

  if(checkPermission(member)){
    message.guild.channels
      .create(name, {
        type: 'voice',
      })
      .then((channel) => {
        channel.setUserLimit(10)
      })

  }else {
    return message.reply('You dont have the required permission to use this command')
  }
})


client.on("message", message => {
  
    if (message.author.bot) return false;

    if (message.content.toLowerCase() =="testnsfw") {
        if (message.channel.nsfw) {
            message.channel.send("This channel is NSFW.");
        } else {
            message.channel.send("This channel is SFW.");
        }
    }
});

client.on('message', message => {
  if (message.content === '+ping') {  
    message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
  }
});

client.login(process.env.BOT_TOKEN);