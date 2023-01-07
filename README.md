# Discord.js bot Boilerplate

## Purpose of this project

This package was first developed by the need of having an easy and extendable way to manage the basic functionalities of a Discord bot based on the [Discord.js](https://github.com/discordjs/discord.js/) module.

## How to start?

Using this boilerplate, you should only take care of the services and the config file.

**Services** are the functionalities that you want to implement in your Bot (API calls, message responses, etc.).\
For example, you can have a Service for the "help" command, which will return all the commands available for the bot.

**Before starting the development** you MUST create the bot following the [Discord developer portal guidelines](https://discord.com/developers/applications) and, when you got your Bot's TOKEN, you need to create a `.env` file in the root with the same keys as `.env.example` file.

## Config file

In this project you can find a `.config.ts` file. This file looks like this:

```
{
    prefix: '!test',
    permissions: [],
    activity: {
        name: 'activityName',
        type: ActivityType.Playing
    },
    commands: {
        onStart: [],
        onMessage: []
    },
    customEvents: []
};
```

From top to bottom:

-   **prefix**: What you want your users to write before your bot text commands (EG. !test generateMeme).
-   **permissions**: The permissions you need to add to your Bot. You can see a list of permissions (or Gateways) in the [official Discord repository](https://github.com/discordjs/discord-api-types/tree/main/gateway).
-   **activity**: This is the activity shown below bot's "user":
    -   **name**: Name of the activity.
    -   **type**: Type of the activity (Playing, Watching, etc.).
-   **commands**: Registered commands (service's functions).
    -   **onStart**: Functions called when the Bot process starts.
    -   **onMessage**: Pair of message/function to call every time the user sends a matched command (See Example).
-   **customEvents**: Way to subscribe to another type of Discord event.

### Example

```
    {
    prefix: '!test',
    permissions: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ],
    activity: {
        name: 'activityName',
        type: ActivityType.Playing
    },
    commands: {
        onStart: [onStartFunction],
        onMessage: [
            {
                message: 'test',
                fn: onMessageFunc
            }
        ]
    },
    customEvents: [
        {
            event: 'error',
            fn: onError
        }
    ]
};
```

After you configure your Bot, you can use the command
`yarn dev` to start your bot.
