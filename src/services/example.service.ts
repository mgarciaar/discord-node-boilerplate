import { CallbackParams } from 'src/types.d';

export const onStartFunction = ({ discordBot }: CallbackParams) => {
    discordBot.sendMessageToFirstChannelAvailable('on start');
};

export const onMessageFunc = ({
    discordBot,
    messageFromDiscord
}: CallbackParams) => {
    discordBot.sendMessageToSameChannel('on message', messageFromDiscord);
};
