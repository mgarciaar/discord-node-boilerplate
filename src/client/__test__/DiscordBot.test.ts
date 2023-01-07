import { ActivityType } from 'discord.js';
import { DiscordConfig } from 'src/types';
import DiscordBot from '../DiscordBot';

let mockConfig: DiscordConfig = {
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

describe('DiscordBot', () => {
    describe('Bot should init with given config', () => {
        const testBotInstance = new DiscordBot('test');
        testBotInstance.init(
            [],
            mockConfig.commands.onStart,
            mockConfig.activity
        );

        // expect();
    });
});
