import { CallbackParams } from 'src/config/config.d.js';

export const onStartFunction = ({ discordBot }: CallbackParams) => {
    discordBot.sendMessage('eeehehehe');
};

export const onCloseFunction = () => {
    console.log('close');
};

export const onMessageFunc = ({ discordBot }: CallbackParams) => {
    discordBot.sendMessage('uffffffff');
};
