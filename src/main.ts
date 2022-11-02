import dotenv from 'dotenv';
import { config } from './config/config.js';
import DiscordBot from './DiscordBot.js';

dotenv.config();

const discordBot = new DiscordBot(config.prefix);

const configBot = async () => {
    await discordBot.init(
        config.permissions,
        config.commands.onStart,
        config.activity
    );

    await discordBot.registerMessageCallback(config.commands.onMessage);
};

configBot();
