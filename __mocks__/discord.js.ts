import { ActivityType } from 'discord.js';

/* const modules =
    jest.createMockFromModule<typeof import('discord.js')>('discord.js');

modules.ActivityType = {
    Playing: 'mock'
} as any; */

jest.mock('discord.js', () => ({
    ActivityType: {
        Playing: 'Mock'
    }
}));
