## Claude 2 AI Telegram Bot

This is a simple Telegram bot that uses the Claude AI API for natural language conversations.

Since Anthropic has been reluctant to provide API access unless you're a major org, the only way to access Claude is through the unofficial API. Note that this is unstable as they may push breaking changes and there is risk of your account being banned, for which I will not be liable.

# Features

- **Starts a new Claude AI conversation when a user first messages the bot**
- **Saves the conversation ID to link future messages from the same user**
- **Allows deleting the conversation history with the /delete command**
- **The app is configured to run in a Docker container for easy deployment and portability**

### How to install ?

with docker you should first install docker and docker-compose and then run the following command:

```sh
docker-compose up -d
```

- Sign up for a Claude AI account and get an API key
- Second acquire telegram token from the BOTFATHER. [Telegram token](https://telegram.me/BotFather)
- Clone This repo
- Cd telegram-chatgpt-bot
- Put your api keys in .env.local
- Change the name of .env.local to .env
- If you have installed docker in your system just run docker-compose up -d and ignore rest
- To install all modules `yarn`
- To run developer server `yarn dev`
- You can install pm2 globally before deploying. `yarn add pm2 -g`
- Then run `pm2 start index.js`

## API KEYS

```sh
BOT_TOKEN= "your telegram api key"
SESSION= "your claude seesion"
```
