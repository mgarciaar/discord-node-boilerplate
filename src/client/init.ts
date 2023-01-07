import dotenv from 'dotenv';
import config from '../config';
import DiscordBot from './DiscordBot';

dotenv.config();

const discordBot = new DiscordBot(config.prefix);

const configBot = async () => {
    await discordBot.init(
        config.permissions,
        config.commands.onStart,
        config.activity
    );

    await discordBot.registerMessageCallback(config.commands.onMessage);

    if (config.customEvents) {
        config.customEvents.map(({ event, fn }) => {
            discordBot.registerFunction(event, fn);
        });
    }
};

configBot();
