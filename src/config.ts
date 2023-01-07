import { ActivityType, GatewayIntentBits } from 'discord.js';
import { onMessageFunc, onStartFunction } from './services/example.service.js';
import { DiscordConfig } from './types.js';

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
        onMessage: [
            {
                message: 'test',
                fn: onMessageFunc
            }
        ]
    },
    customEvents: []
};

export default config;
