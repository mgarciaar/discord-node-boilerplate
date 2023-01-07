import { Client } from 'discord.js';

const mockedDiscordJs =
    jest.createMockFromModule<typeof import('discord.js')>('discord.js');

mockedDiscordJs.ActivityType = {
    Playing: 'mock'
} as any;

mockedDiscordJs.Client = jest.fn().mockImplementation((options) => ({
    options,
    login: jest.fn(),
    on: jest.fn(),
    user: {
        setActivity: jest.fn()
    }
})) as any;

module.exports = mockedDiscordJs;
