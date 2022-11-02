import { ActivityType, Client, GatewayIntentBits } from 'discord.js';
import DiscordBot from 'src/DiscordBot';

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
        onClose: Array<Callback>;
        onMessage: Array<MessageCallback>;
    };
};

export type CallbackParams = {
    discordBot: DiscordBot;
    messageFromChat?: string;
};

export type Callback = (params: CallbackParams) => void;

export type MessageCallback = { message: string; fn: Callback };
