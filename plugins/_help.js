const os = require('os')
const moment = require("moment-timezone")
const konpignye = require('../config')
let { fancytext, tlang, tiny, runtime, formatp, botpic, prefix, usernye } = require("../lib");
const plug = require('../lib/plugins')

    //---------------------------------------------------------------------------
plug.cmd({
            pattern: "help",
            alias: ["menu"],
            desc: "Help list",
            category: "general",
            react: "✨",
            filename: __filename
        },
        async(conn, m, text) => {
            const { plugin } = require('../lib');
            if (text.split(" ")[0]) {
                let arr = [];
                const cmd = plugin.find((cmd) => cmd.pattern === (text.split(" ")[0].toLowerCase()))
                if (!cmd) return await m.reply("*❌No Such plugin.*");
                else arr.push(`*🍁Command:* ${cmd.pattern}`);
                if (cmd.category) arr.push(`*🧩Category:* ${cmd.category}`);
                if (cmd.alias) arr.push(`*🧩Alias:* ${cmd.alias}`);
                if (cmd.desc) arr.push(`*🧩Description:* ${cmd.desc}`);
                if (cmd.use) arr.push(`*〽️Usage:*\n \`\`\`${prefix}${cmd.pattern} ${cmd.use}\`\`\``);
                return await m.reply(arr.join('\n'));
            } else {
                const cmds = {}
                plugin.map(async(command, index) => {
                    if (command.dontAddCommandList === false && command.pattern !== undefined) {
                        if (!cmds[command.category]) cmds[command.category] = []
                        cmds[command.category].push(command.pattern)
                    }
                })
                const time = moment(moment())
                    .format('HH:mm:ss')
                moment.tz.setDefault('Asia/Jakarta')
                    .locale('id')
                const date = moment.tz('Asia/Jakarta').format('DD/MM/YYYY')
                let total = await usernye.countDocuments()
                let str = `╭────《 ` + fancytext(konpignye.ownername.split(' ')[0], 58) + ` 》─────⊷\n`
                str +=
                    '```' + `│ ╭──────────────◆
│ │ User:- ${m.pushName}
│ │ Theme:- ${tlang().title}
│ │ Prefix:- [ ${prefix} ]
│ │ Owner:- ${konpignye.ownername}
│ │ Plugins:- ${plugin.length}
│ │ Users:- ${total}
│ │ Uptime:- ${runtime(process.uptime())}
│ │ Mem:- ${formatp(os.totalmem() - os.freemem())}/${formatp(os.totalmem())}
│ │ Time:- ${time}
│ │ Date:- ${date}
│ ╰──────────────◆
╰───────────────⊷\n
` + '```'
                for (const category in cmds) 
                {
                   str += `╭────❏ *${tiny(category)}* ❏\n` ;
                   if(text.toLowerCase() == category.toLowerCase()){ str = `╭─────❏ *${tiny(category)}* ❏\n` ;      
                        for (const plugins of cmds[category]) { str += `│ ${fancytext(plugins,1)}\n` ; }
                        str += `╰━━━━━━━━━━━━━──⊷\n`  ;
                        break ;
                   }
                   else { for (const plugins of cmds[category]) { str += `│ ${fancytext(plugins,1)}\n` ; }
                         str += `╰━━━━━━━━━━━━━━──⊷\n`  ; 
                   }
  
                }
                str+= `*⭐️Type:* _${prefix}help cmd_ name to know more about specific command.\n*Eg:* _${prefix}help ping_\n*Made with ❤️ in Nodejs* `
                let buttonMessaged = {
                    image: { url: await botpic() },
                    caption: str
                };
                return await conn.sendMessage(m.chat, buttonMessaged);
            }
        }
    )
    //---------------------------------------------------------------------------
plug.cmd({
            pattern: "list",
            desc: "list menu",
            category: "general"
        },
        async(conn, m) => {
            const { plugin } = require('../lib');
            let str = `
╭━━〘 ` + fancytext(konpignye.ownername.split(' ')[0], 58) + ` 〙━━──⊷`
            str += `
┃ ⛥╭──────────────      
┃ ⛥│ User: ${m.pushName}
┃ ⛥│ Theme: ${tlang().title}
┃ ⛥│ Prefix: ${prefix}
┃ ⛥│ Owner: ${konpignye.ownername}
┃ ⛥│ plugin: ${plugin.length}
┃ ⛥│ Uptime: ${runtime(process.uptime())}
┃ ⛥│ Mem: ${formatp(os.totalmem() - os.freemem())}/${formatp(os.totalmem())}
┃ ⛥│  
┃ ⛥╰───────────
╰━━━━━━━━━━━──⊷\n`
for (let i = 0; i < plugin.length; i++) 
{
     if(plugin[i].pattern==undefined) continue
     str +=       `╭ ${i+1} *${fancytext(plugin[i].pattern,1)}*\n` 
     if(plugin[i].desc=undefined) plugin[i].desc=""
     str += `╰➛ ${fancytext(plugin[i].desc,1)}\n`
}
            return await conn.sendMessage(m.chat, { image: { url: THUMB_IMAGE }, caption: str })
        }
    )
    //---------------------------------------------------------------------------
plug.cmd({
        pattern: "owner",
        desc: "To find owner number",
        category: "general",
        react: "💜",
        filename: __filename
    },
    async(conn, m) => {
        const konpignye = require('../konpignye')
        const vcard = 'BEGIN:VCARD\n' +
            'VERSION:3.0\n' +
            'FN:' + konpignye.ownername + '\n' +
            'ORG:;\n' +
            'TEL;type=CELL;type=VOICE;waid=' + owner[0] + ':+' + owner[0] + '\n' +
            'END:VCARD'
        let buttonMessaged = {
            contacts: { displayName: konpignye.ownername, contacts: [{ vcard }] },
            contextInfo: {
                externalAdReply: {
                    title: konpignye.ownername,
                    body: 'Touch here.',
                    renderLargerThumbnail: true,
                    thumbnailUrl: ``,
                    thumbnail: log0,
                    mediaType: 2,
                    mediaUrl: '',
                    sourceUrl: `https://wa.me/+` + owner[0] + '?text=Hii bro,I am ' + m.pushName,
                },
            },
        };
        return await conn.sendMessage(m.chat, buttonMessaged, {
            quoted: m,
        });

    }
)

plug.cmd({
    pattern: "file",
    desc: "to get extact name where that command is in repo.\nSo user can edit that.",
    category: "general",
    react: "✨",
    filename: __filename
},
async(conn, m, text) => {
 const { plugin } = require('../lib');
 let arr = [];
        const cmd = plugin.find((cmd) => cmd.pattern === (text.split(" ")[0].toLowerCase()))
        if (!cmd) return await m.reply("*❌No Such plugin.*");
        else arr.push(`*🍁Command:* ${cmd.pattern}`);
        if (cmd.category) arr.push(`*🧩Type:* ${cmd.category}`);
        if(cmd.filename) arr.push(`✨FileName: ${cmd.filename}`)
        return m.reply(arr.join('\n'));


})
