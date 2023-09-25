const fs = require('fs-extra')
if (fs.existsSync('config.env')) require('dotenv').config({ path: __dirname+'/config.env' })


//═══════[Required Variables]════════\\
global.owner = "6282217590187"
global.mongodb = ""
global.port = 5000
global.email = 'kazedevid@gmail.com'
global.github = 'https://github.com/KazeDevID/'
global.location = 'Makassar ID'
global.gurl = 'https://instagram.com/lordagam23_' 
global.sudo = global.owner
global.devs = global.owner
global.website = global.github
global.THUMB_IMAGE = 'https://telegra.ph/file/d58d5fed2286a4926237c.jpg'
module.exports = {
  botname:   'Kiko',
  ownername: 'KazeDevID',
  sessionName:  'ThisSessions',
  author:  ownername,
  auto_read_status :  true,
  packname:  botname,
  autoreaction:  true,
  antibadword :  'nbwoed',
  alwaysonline:  true,
  antifake : '1',
  readmessage:  false,
  auto_status_saver: false,
  HANDLERS:  ['.'],
  warncount: 3,
  disablepm:  false,
  levelupmessage:  true,
  antilink:  'chat.whatsapp.com',
  antilinkaction: 'remove',
  BRANCH: 'main', 
  ALIVE_MESSAGE:  '',
  autobio:  false,
  OPENAI_API_KEY:  false,
  heroku:  false,
  HEROKU: {
    HEROKU: false,
    API_KEY: '1abfce1e-1bee-4334-9f6c-f4c1cb1cafab',
    APP_NAME: 'zeropgg'
},
  VERSION: 'v.0.0.1',
  LANG: 'ID',
  WORKTYPE: 'public'
};


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`Update'${__filename}'`)
    delete require.cache[file]
	require(file)
})
