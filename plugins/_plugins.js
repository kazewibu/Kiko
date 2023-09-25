const fs = require('fs-extra')
const { plugins,plugindb, remove, isUrl,cmd } = require('../lib')
//---------------------------------------------------------------------------
cmd({
        pattern: "plugins",
        alias :['plist'],
        category: "owner",
        desc: "Shows list of all externally installed modules",
        filename: __filename
    },
    async(conn, m, text, { isCreator }) => {
        const { tlang } = require('../lib')
        if (!isCreator) return m.reply(tlang().owner)
        let allmodtext = `*All Installed Plugins are:-*\n\n`
        allmodtext += await plugins()
        return m.reply(allmodtext)

    }
)

//---------------------------------------------------------------------------
cmd({
        pattern: "remove",
        alias :['uninstall'],
        category: "owner",
        desc: "removes external plugins.",
        filename: __filename
    },
    async(conn, m, text,{ isCreator}) => {
        if (!isCreator) return m.reply(tlang().owner)
        if(text==='all') {
         await plugindb.collection.drop()
         return m.reply('Deleted all plugins.')
        }
        let kill = await remove(text.split(" ")[0])
        delete require.cache[require.resolve(__dirname+"/" + text + ".js")];
        fs.unlinkSync(__dirname + "/" + text+ ".js");
        return m.reply(kill)
    }
)

