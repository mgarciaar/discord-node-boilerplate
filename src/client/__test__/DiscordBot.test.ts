import { ActivityType, Client, GatewayIntentBits } from 'discord.js';
import { DiscordConfig } from 'src/types';
import DiscordBot from '../DiscordBot';

process.env.DISCORD_TOKEN = 'test_token';

const mockConfig: DiscordConfig = {
    prefix: '!test',
    permissions: [],
    activity: {
        name: 'testActivity',
        type: ActivityType.Playing
    },
    commands: {
        onStart: [],
        onMessage: []
    }
};

const getNewDiscordBotInstance = (
    permissions: GatewayIntentBits[],
    config: DiscordConfig
) => {
    const testBotInstance = new DiscordBot('test');
    testBotInstance.init(permissions, config.commands.onStart, config.activity);
    return testBotInstance;
};

describe('DiscordBot', () => {
    it('should init with given config', async () => {
        const discordBot = getNewDiscordBotInstance([1000], mockConfig);
        const client = discordBot['discordClient'];

        expect(client?.options.intents).toStrictEqual([1000]);
        expect(client).toBeDefined();
        expect(client!.login).toHaveBeenCalledWith('test_token');
        expect(await client!.user?.setActivity).toHaveBeenCalledWith(
            mockConfig.activity.name,
            { type: mockConfig.activity.type }
        );
    });

    it('should NOT register any onStart functions on init if array is empty', () => {
        const discordBot = getNewDiscordBotInstance([], mockConfig);
        const client = discordBot['discordClient'];

        expect(client!.on).not.toHaveBeenCalled();
    });

    it('should register onStart functions on init when they are present', () => {
        const clonedConfig: DiscordConfig = {
            ...mockConfig,
            commands: { onStart: [jest.fn()], onMessage: [] }
        };

        const discordBot = getNewDiscordBotInstance([], clonedConfig);
        const client = discordBot['discordClient'];

        expect(client!.on).toHaveBeenCalledWith('ready', expect.anything());
    });

    it('should register message callbacks', () => {
        const discordBot = getNewDiscordBotInstance([], mockConfig);
        const client = discordBot['discordClient'];

        discordBot.registerMessageCallback([
            { message: 'test', fn: jest.fn() }
        ]);

        expect(client!.on).toHaveBeenCalledWith(
            'messageCreate',
            expect.anything()
        );
    });

    it('should register function on given event', () => {
        const discordBot = getNewDiscordBotInstance([], mockConfig);
        const client = discordBot['discordClient'];

        discordBot.registerFunction('debug', jest.fn());
        expect(client!.on).toHaveBeenCalledWith('debug', expect.anything());
    });
});
