import {
    ActivityType,
    ClientEvents,
    GatewayIntentBits,
    Message
} from 'discord.js';
import DiscordBot from './client/DiscordBot';

export type Activity = {
    name: string;
    type?: Exclude<ActivityType, ActivityType.Custom>;
};

export type DiscordConfig = {
    prefix: string;
    permissions: GatewayIntentBits[];
    activity: Activity;
    commands: {
        onStart: Array<Callback>;
        onMessage: Array<MessageCallback>;
    };
    customEvents?: Array<{
        event: keyof ClientEvents;
        fn: Callback;
    }>;
};

export type Callback = (params: CallbackParams) => void;

export type CallbackParams = {
    discordBot: DiscordBot;
    messageFromDiscord?: Message;
};

export type MessageCallback = { message: string; fn: Callback };
