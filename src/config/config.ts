import { ActivityType, GatewayIntentBits } from 'discord.js';
import {
    onCloseFunction,
    onMessageFunc,
    onStartFunction
} from '../services/testService.js';
import { DiscordConfig } from './config.d.js';

export const config: DiscordConfig = {
    prefix: '!test',
    permissions: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ],
    activity: {
        name: 'activityName',
        type: ActivityType.Playing
    },
    commands: {
        onStart: [onStartFunction],
        onClose: [onCloseFunction],
        onMessage: [
            {
                message: 'test',
                fn: onMessageFunc
            }
        ]
    }
};

export default config;
