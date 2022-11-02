import { ActivityType, Client, GatewayIntentBits } from 'discord.js';

const permissions = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
];

class DiscordBot {
    private discordClient: Client | null;

    constructor() {
        this.discordClient = null;
    }

    async init(onReadyFn: () => void): Promise<void> {
        this.discordClient = new Client({ intents: permissions });
        this.discordClient.on('ready', onReadyFn);
        await this.discordClient.login(process.env.DISCORD_TOKEN);
    }

    async setActivity(activity: string) {
        if (this.discordClient) {
            await this.discordClient.user?.setActivity(activity, {
                type: ActivityType.Watching
            });
        }
    }
}

export default DiscordBot;
