const Discord = require("discord.js");
const config = require("./config.json");

const bot = new Discord.Client({
    disableEveryone: true,
    disabledEvents: ['TYPING_START']
});

bot.on("ready", () => {
    bot.user.setActivity(config.prefix + 'help'); //set a default game
    console.log(`Bot is online!\n${bot.users.size} users, in ${bot.guilds.size} servers connected.`);
});

bot.on("guildCreate", guild => {
    console.log(`I've joined the guild ${guild.name} (${guild.id}), owned by ${guild.owner.user.username} (${guild.owner.user.id}).`);
});

bot.on("message", async message => {

    //if(message.author.bot || message.system) return; // Ignore bots

    if(message.channel.type === 'dm') { // Direct Message
        return; //Optionally handle direct messages
    }

    console.log(message.content); // Log chat to console for debugging/testing

    if (message.content.indexOf(config.prefix) === 0) {

        let msg = message.content.slice(config.prefix.length);
        let args = msg.split(" "); // break the message into part by spaces
        let cmd = args[0].toLowerCase();
        args.shift();

        switch (cmd) {
            case "birthday": message.channel.send(`Happy birthday, ${message.author.toString()}!`);
                break;
            case "pizza": switch (args[0]) {
                case "cheese":
                    message.channel.send("here is cheese pizza", {files: ["./res/cheese.png"]});
                    break;
                case "pepperoni":
                    message.channel.send("here is pepperoni pizza", {files: ["res/pepperoni.jpg"]});
                    break;
                case "sausage":
                    message.channel.send("here is sausage pizza", {files: ["res/sausage.jpg"]});
                    break;
                case "sausage&pepperoni":
                    message.channel.send("here is sausage&pepperoni pizza", {files: ["res/pepsaus.jpg"]});
                    break;
                case "hawaiian":
                    message.channel.send("here is hawaiian pizza", {files: ["res/hawaiian.jpg"]});
                    break;
                default:
                    message.channel.send("We have 4 wacky types of pizza!\nThey include cheese, sausage, pepperoni, hawaiian, as well as pepperoni and sausage!");
            }break;

            case "name": message.channel.send("My full legal name is Charles Entertainment Cheese, and I have come to do things.");
                break;

            case "fnaf": message.channel.send("okay this is some furry shit but we're not that bad");
                break;

            case "drink": switch (args[0]) {
                case "pepsi":
                    message.channel.send("here is pepsi", {files: ["res/pepsi.png"]});
                    break;
                case "hi-c":
                    message.channel.send("here is hi-c", {files: ["res/hic.jpg"]});
                    break;
                default: message.channel.send("We have 2 hilariously wackalicious drinks!\nPepsi and hi-c!");
            }break;

            case "game": switch (args[0]) {
                case "skeeball":
                    //TODO
                    break;
                default: message.channel.send("The only fun game we have currently is skeeball!");
            }break;

            case "help": message.channel.send("Current known commands: " + config.prefix + "birthday, " + config.prefix + "name, " + config.prefix + "fnaf, " + config.prefix + "pizza, " + config.prefix + "drink, " + config.prefix + "game");
                break;

            default: message.channel.send("What's that? I can't understand what you're sayin' kiddo!");
        }

    } else if (message.content.indexOf("<@"+bot.user.id) === 0 || message.content.indexOf("<@!"+bot.user.id) === 0) { // Catch @Mentions

        return message.channel.send(`Use \`${config.prefix}\` to interact with me.`); //help people learn your prefix
    }
});

bot.on('disconnected', () => {
    console.log("disconnected, logging in again");
    bot.login(config.token)
});

//bot.on('error', console.error);

// Catch Errors before they crash the app.
process.on('uncaughtException', (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
    console.error('Uncaught Exception: ', errorMsg);
    // process.exit(1); //Eh, should be fine, but maybe handle this?
    bot.login(config.token)
});

process.on('unhandledRejection', err => {
    console.error('Uncaught Promise Error: ', err);
    // process.exit(1); //Eh, should be fine, but maybe handle this?
});

bot.login(config.token);