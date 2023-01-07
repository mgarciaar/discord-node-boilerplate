import {
    Client,
    ClientEvents,
    GatewayIntentBits,
    Message,
    TextChannel
} from 'discord.js';
import { Activity, Callback, MessageCallback } from '../types.js';

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
        try {
            if (!this.discordClient) {
                this.discordClient = new Client({ intents: permissions });
                onReadyFn.map((fn) => this.registerFunction('ready', fn));
                await this.discordClient.login(process.env.DISCORD_TOKEN);
                await this.discordClient.user?.setActivity(activity.name, {
                    type: activity.type
                });
            }
        } catch (e: any) {
            if (e.code === 'DisallowedIntents') {
                throw new Error(
                    'Intents missconfiguration. Please, go to your bot configuration - Privileged Gateway Intents'
                );
            }

            throw e;
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
                        messageFromDiscord: message
                    });
                }
            });
        });
    }

    public registerFunction(event: keyof ClientEvents, fn: Callback) {
        this.discordClient?.on(event, () => fn({ discordBot: this }));
    }

    public async sendMessageToFirstChannelAvailable(message: string) {
        if (this.discordClient) {
            const firstTextChannel = this.discordClient.channels.cache.find(
                (channel) => channel.isTextBased()
            ) as TextChannel | undefined;

            if (firstTextChannel) {
                firstTextChannel.send(message);
            }
        }
    }

    public async sendMessageToSameChannel(
        messageToSend: string,
        discordMessage?: Message
    ) {
        if (this.discordClient && discordMessage) {
            const originalMessageChannel =
                this.discordClient.channels.cache.find(
                    (channel) => channel.id === discordMessage.channelId
                );
            if (originalMessageChannel?.isTextBased()) {
                originalMessageChannel.send(messageToSend);
            }
        }
    }
}

export default DiscordBot;
