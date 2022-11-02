import { Client, ClientEvents, GatewayIntentBits, Message } from 'discord.js';
import {
    Activity,
    Callback,
    CallbackParams,
    MessageCallback
} from './config/config.d.js';

class DiscordBot {
    private prefix: string;
    private discordClient: Client | null;

    constructor(prefix: string) {
        this.prefix = prefix;
        this.discordClient = null;
    }

    async init(
        permissions: GatewayIntentBits[],
        onReadyFn: Array<Callback>,
        activity: Activity
    ): Promise<void> {
        if (!this.discordClient) {
            this.discordClient = new Client({ intents: permissions });
            onReadyFn.map((fn) => this.registerFunction('ready', fn));
            await this.discordClient.login(process.env.DISCORD_TOKEN);
            this.setActivity(activity);
        }
    }

    private async setActivity({ name, type }: Activity) {
        if (this.discordClient) {
            await this.discordClient.user?.setActivity(name, {
                type: type
            });
        }
    }

    public registerMessageCallback(callbacks: MessageCallback[]) {
        callbacks.map((callback) => {
            this.discordClient?.on('messageCreate', (message: Message) => {
                if (
                    !message.author.bot &&
                    message.content === `${this.prefix} ${callback.message}`
                ) {
                    callback.fn({
                        discordBot: this,
                        messageFromChat: message.content
                    });
                }
            });
        });
    }

    private registerFunction(event: keyof ClientEvents, fn: Callback) {
        this.discordClient?.on(event, () => fn({ discordBot: this }));
    }

    public async sendMessage(message: string) {
        if (this.discordClient) {
            let alreadySentMessageInGuild = false;

            await this.discordClient.guilds.cache.forEach(async (guild) => {
                alreadySentMessageInGuild = false;
                await guild.channels.cache.forEach(async (channel) => {
                    if (!alreadySentMessageInGuild && channel.isTextBased()) {
                        alreadySentMessageInGuild = true;
                        channel.send(message);
                    }
                });
            });
        }
    }
}

export default DiscordBot;
