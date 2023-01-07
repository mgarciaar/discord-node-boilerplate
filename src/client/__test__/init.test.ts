require('../init');
import DiscordBot from '../DiscordBot';

jest.mock('../DiscordBot');
jest.mock('../../config', () => ({
    prefix: 'mock',
    permissions: 'permissionsMock',
    activity: 'activityMock',
    commands: { onStart: 'onStartMock', onMessage: 'onMessageMock' },
    customEvents: [
        { event: 'firstCustomEvent', fn: jest.fn() },
        { event: 'secondCustomEvent', fn: jest.fn() }
    ]
}));

describe('init file', () => {
    it('should create discord bot', () => {
        expect(DiscordBot).toHaveBeenCalledTimes(1);
        expect(DiscordBot.prototype.init).toHaveBeenCalledWith(
            'permissionsMock',
            'onStartMock',
            'activityMock'
        );

        expect(
            DiscordBot.prototype.registerMessageCallback
        ).toHaveBeenCalledWith('onMessageMock');

        expect(DiscordBot.prototype.registerFunction).toHaveBeenNthCalledWith(
            1,
            'fisrstCustomEvent',
            expect.anything()
        );

        expect(DiscordBot.prototype.registerFunction).toHaveBeenNthCalledWith(
            2,
            'secondCustomEvent',
            expect.anything()
        );
    });
});
