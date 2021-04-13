const Dlang = require('discordbot-script');
const exec = require("child_process").exec;
global.config = require("./config.json")
const bot = new Dlang({
 token: config.TOKEN,
 prefix: ["BX!"]
})
 
bot.MessageEvent()

    update()
    async function update() {
        exec(`git pull origin master`, (error, stdout) => {
            let response = error || stdout;
            if (!error) {
              if (response.includes("Already up to date.")) {
              } else {
            
                setTimeout(() => {
                    process.exit();
                }, 1000);

              }
            }
          });
    }
  setInterval(function() {
      update()
  }, 60 * 1000);

const dbd = require("dbd.js")

const bdfd = new dbd.Bot({
token: config.TOKEN, 
prefix: "BX!", 
dbhToken: "danbot-4dfn2"     
})
bdfd.onMessage() 

bot.Variables({
  Cash: "0",
  Bank: "0",
  Gems: "0"	
	
})

bdfd.status({
  text: "Ping: $ping ms",
  type: "PLAYING",
  time: 12
})

bdfd.command({
  name:"help",
  code:`
$addCmdReactions[✅]
$title[Help Menu]
$description[stats - shows bot statistics
changes/CL - shows things modified in the bot
work - work for cash
mine - mine for gems
daily - gives your daily money
gdaily - claim your daily gems
weekly - weekly cash
hack - hack for cash
bal - shows your balance
dep - deposit money into the bank
with - withdraw cash from the bank
crime - commit a crime
serverinfo - shows the current server info
user - shows mentioned user info
play - play music from youtube
splay - play music from spotify
scplay - play music from soundcloud
queue - shows the queue of songs
np - shows the song that is curently playing's info
skip - skip a song
resume - resume the queue 
pause - pause the queue]
$footer[Executed in $ping ms | executed by $username[$authorID]]
$addTimestamp
$image[https://i.ibb.co/rFwpMCp/ranbom.gif]`
})

bdfd.command({
    name:"stats",
    code:`$title[Bot Statistics]
$author[$username[$clientid];$useravatar[$clientid]]
$thumbnail[https://cdn.discordapp.com/attachments/795966035919634455/807884403904741386/5495053-statistic-icons-download-5953-free-png-and-vector-icons-statistic-png-512_512_preview.png]
$color[RANDOM]
$addField[Others;
• Total commands: $commandsCount
• Latency: $humanizeMS[$ping]
• API Latency: $humanizeMS[$botPing] 
• Uptime: $uptime
• Owner: $usertag[$botownerid]
• Bot Version 1.0.2]
$addField[Versions;
• NodeJS Version: $getObjectProperty[nodev]
• Discord.js Version: $getObjectProperty[discordv]
• DBD.js Version: $packageVersion
• DB-Script Version: 2.5.0]
$addField[Hosting Related Stats;
• CPU Usage: $cpu%
• CPU Model: $djsEval[require ('os').cpus()[0\\].model;yes] 
• CPU Platform: $djsEval[require ('os').platform;yes]
• Free Memory: $abbreviate[$djsEval[require ('os').freemem();yes]] Bytes 
•  Total Memory: $abbreviate[$djsEval[require ('os').totalmem;yes]] Bytes
•  RAM Usage: $ram MB
•  Memory Usage: $round[$djsEval[process.memoryUsage().rss / 1024 / 1024;yes]] MB]
 $djseval[d.object.nodev = process.version
d.object.discordv = require('discord.js').version
$createObject[{}]]
$addCmdReactions[✅]
$image[https://i.ibb.co/rFwpMCp/ranbom.gif]`
})

bdfd.command({
    name:"Changes",
    code:`$title[Change Log]
$description[1.0.0: Relaunch of the bot
1.0.1: +Added rainbow on commands that are embeded +Fixed some glitches
1.0.2: +added github repo +added mining +github now holds beta features that haven't been introduced yet]
$footer[+:insertions. -:deletions. =:Modified]
$addCmdReactions[✅]
$image[https://i.ibb.co/rFwpMCp/ranbom.gif]`
})

bot.Command({
	name: `work`,
	code: `$setVar[Cash;$sum[$getVar[Cash;$authorID];$random[50;500]];$authorID]
$title[WORK UwU]
$globalCooldown[10m;You can work again in {time}]
$description[You worked and got $$random[50;500]]
$color[RANDOM]
$footer[Executed in $ping ms | executed by $username[$authorID]]
$addTimestamp
$addCmdReactions[✅]
$image[https://i.ibb.co/rFwpMCp/ranbom.gif]
`
});

bot.Command({
	name: `hack`,
	code: `$title[**HACK**]
  $setVar[Bank;$sum[$getVar[Bank;$authorID];$random[500;1500]];$authorID]
$globalCooldown[30m;you can hack again in  {time}]
$description[You hacked $randomText[Amazon;Ebay;Google;Discord;Twitch;Youtube] and got $$random[500;1500]]
$color[RANDOM]
 $footer[Executed in $ping ms | executed by $username[$authorID]]
 $addTimestamp
$addCmdReactions[✅]
$image[https://i.ibb.co/rFwpMCp/ranbom.gif]
`
});

bot.Command({
	name: `bal`,
	code: `$onlyIf[$isBot[$mentioned[1;yes]]!=true;Bots don't have money!]
$author[$username[$mentioned[1;yes]]'s Balance]
$color[RANDOM]
$addField[🏦Bank :;$$getVar[Bank;$mentioned[1;yes]]]
$addField[💰Cash :;$$getVar[Cash;$mentioned[1;yes]]]
$footer[Executed in $ping ms | executed by $username[$authorID]]
$addTimestamp
$addCmdReactions[✅]
$image[https://i.ibb.co/rFwpMCp/ranbom.gif]`
});

bot.Command({
	name: `dep`,
	code: `$setVar[Cash;$sub[$getVar[Cash;$authorID];$replaceText[$toLowercase[$noMentionMessage[1]];all;$getVar[Cash;$authorID]]];$authorID]
$setVar[Bank;$sum[$getVar[Bank;$authorID];$replaceText[$toLowercase[$noMentionMessage[1]];all;$getVar[Cash;$authorID]]];$authorID]
$title[Success!!]
$description[You have deposited **$replaceText[$toLowercase[$noMentionMessage[1]];all;$getVar[Cash;$authorID]]** :dollar: into your bank!]
$footer[$ping ms| Deposited by $username[]]
$color[RANDOM]
$globalCooldown[5s;**$username[]**, please cool down! (**{time}** left)]
$onlyIf[$isNumber[$replaceText[$toLowercase[$noMentionMessage[1]];all;$getVar[Cash;$authorID]]]==true;{title:Error}{description:Correct Usage: \`C?dep <how much>\`}{footer:Oh wait, is this a bug? Let us know in our support server.}{color:RED}]
$onlyIf[$replaceText[$toLowercase[$noMentionMessage[1]];all;$getVar[Cash;$authorID]]<=$getVar[Cash;$authorID];{title:Error}{description:❌ You don't have that much coins to deposit. You currently have $getVar[Cash;$authorID] :dollar: in your wallet.}{footer:Oh wait, is this a bug? Let us know in our support server.}{color:RED}]
$onlyIf[$noMentionMessage[1]!=;]
$addTimestamp
$addCmdReactions[✅]
$image[https://i.ibb.co/rFwpMCp/ranbom.gif]`
});
bot.Command({
	name: `with`,
	code: `$setVar[Bank;$sub[$getVar[Bank;$authorID];$replaceText[$toLowercase[$noMentionMessage[1]];all;$getVar[Bank;$authorID]]];$authorID]
$setVar[Cash;$sum[$getVar[Cash;$authorID];$replaceText[$toLowercase[$noMentionMessage[1]];all;$getVar[Bank;$authorID]]];$authorID]
$title[Success!!]
$description[You have withdrawn **$replaceText[$toLowercase[$noMentionMessage[1]];all;$getVar[Bank;$authorID]]** :dollar: into your wallet!]
$footer[Executed in $ping ms | withdrew by $username[]]
$color[RANDOM]
$globalCooldown[5s;**$username[]**, please cool down! (**{time}** left)]
$onlyIf[$isNumber[$replaceText[$toLowercase[$noMentionMessage[1]];all;$getVar[Bank;$authorID]]]==true;{title:Error}{description:Correct Usage: \`C?with<how much>\`}{footer:Oh wait, is this a bug? Let us know in our support server.}{color:RED}]
$onlyIf[$replaceText[$toLowercase[$noMentionMessage[1]];all;$getVar[Bank;$authorID]]<=$getVar[Bank;$authorID];{title:Error}{description:❌ You don't have that much cash to withdraw. You currently have $getVar[Bank;$authorID] :dollar: in your bank.}{footer:Oh wait, is this a bug? Let us know in our support server.}{color:RED}]
$onlyIf[$noMentionMessage[1]!=;]
$addTimestamp
$addCmdReactions[✅]
$image[https://i.ibb.co/rFwpMCp/ranbom.gif]`
});

bot.Command({
	name: `crime`,
	code: `
  $setVar[Cash;$sum[$getVar[Cash;$authorID];$random[500;1500]];$authorID]
$title[Crime]
$description[You committed a crime and it was $randomText[Murder;Bank Robbery;Store Robbery;Credit Card Fraud;Drug Dealing;hits for the mafia] and earned $random[500;1500]$.]
$globalCooldown[10m;You must wait {time} until you can do another crime!]
 $footer[Executed in $ping ms | executed by $username[$authorID]]
 $addTimestamp
 $color[RANDOM]
$addCmdReactions[✅]
$image[https://i.ibb.co/rFwpMCp/ranbom.gif]`
})

bot.Command({
	name: `daily`,
	code: `$setVar[Cash;$sum[$getVar[Cash;$authorID];$random[500;650]];$authorID]
$setVar[Gems;$sum[$getVar[Gems;$authorID];$random[5;10]];$authorID]
$title[DAILY UwU]
$description[You claimed your daily and got $$random[500;650]
$color[RANDOM]
$globalCooldown[24h;You can claim again in {time}]
$footer[Executed in $ping ms | executed by $username[$authorID]]
$addTimestamp
$addCmdReactions[✅]
$image[https://i.ibb.co/rFwpMCp/ranbom.gif]`
})

bot.Command({
	name: `weekly`,
	code: `$setVar[Cash;$sum[$getVar[Cash;$authorID];$random[700;900]];$authorID]
$title[Weekly UwU]
$description[You claimed your daily and got $$random[700;900]]
$color[RANDOM]
$globalCooldown[168h;You can claim again in {time}]
$footer[Executed in $ping ms | executed by $username[$authorID]]
$addTimestamp
$addCmdReactions[✅]
$image[https://i.ibb.co/rFwpMCp/ranbom.gif]`
})

bot.Command({
	name:`mine`,
	code:`$setVar[Gems;$sum[$getVar[Gems;$authorID];$random[5;10]];$authorID]
$title[Mining Away UwU]
$description[You mined and got $random[5;15]]
$color[RANDOM]
$globalCooldown[1h;You can mine again in {time}]
$footer[Executed in $ping ms | executed by $username[$authorID]]
$addTimestamp
$addCmdReactions[✅]
$image[https://i.ibb.co/rFwpMCp/ranbom.gif]`
})

bdfd.command({
 name: "serverinfo",
 aliases: ["serverprofile", "server"],
 code: `$title[$serverName[$guildID]'s Info]
$thumbnail[$serverIcon[$guildID]]
$description[**Name**
$serverName[$guildID]
**ID**
$guildID
**Owner**
<@$ownerID>
**Region**
$serverRegion
**Boosts**
$serverBoostCount
**Boost Level**
$serverBoostLevel
**Verification Level**
$serverVerificationLevel
**Total Members**
$membersCount
**Channels Count
$channelCount
**Creation Date**
$creationDate[$guildID]]
$color[73C2FB]
$addCmdReactions[✅] 
$image[https://i.ibb.co/rFwpMCp/ranbom.gif]`
})

bdfd.command({
    name:"play",
    code:`$playSong[$message;2m;yes;yes;an ERROR has occured]
$addCmdReactions[✅]`
})

bdfd.command({
    name:"splay",
    code:`$playSpotify[$message;name;yes;an ERROR has occured]
$addCmdReactions[✅]`
})

bdfd.command({
    name:"scplay",
    code:`$playSoundCloud[$message;2m;yes;yes;an ERROR has occured]
$addCmdReactions[✅]`
})

bdfd.command({
    name:"queue",
    code:`$queue[1;10;{number} - {title} by <@{userID}>]
$footer[$queueLength Songs - The Queue is currently $queueStatus]
$addCmdReactions[✅]`
})

bdfd.command({
    name:"np",
    code:`$description[$thumbnail[$songInfo[thumbnail] Title:$songInfo[title] Publisher:$songInfo[publisher] (Left Time)/(Total Time): $songInfo[duration_left]/$songInfo[duration] SONG URL:[SONG\\]($songInfo[url])]
$addCmdReactions[✅]
$image[https://i.ibb.co/rFwpMCp/ranbom.gif]`
})

bdfd.command({
    name:"skip",
    code: `$skipSong
$description[<@$authorID> has Skipped $songInfo[title].]
$addCmdReactions[✅]`
})

bdfd.command({
    name:"pause",
    code: `$pauseSong
$description[<@$authorID> has paused the queue.]`
})

bdfd.command({
    name:"resume",
    code:`$resumeSong
$description[<@$authorID> has resumed the queue]
$addCmdReactions[✅]`
})

bdfd.command({
    name:"Deval",
    code:`$djsEval[$message;yes]
$onlyForIDs[634860829132455937;you're not a bot developer]
$addCmdReactions[✅]`
})

bdfd.command({
    name:"eval",
    code:`$eval[$message;yes]
$onlyForIDs[634860829132455937;you're not a bot developer]
$addCmdReactions[✅]`
})

