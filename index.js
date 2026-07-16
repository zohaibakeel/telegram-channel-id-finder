require("dotenv").config();

const axios = require("axios");

const token = process.env.BOT_TOKEN;

async function run() {
    const url = `https://api.telegram.org/bot${token}/getUpdates`;

    try {
        const { data } = await axios.get(url);

        if (!data.result.length) {
            console.log("No messages found.");
            console.log("Send a message to your bot first.");
            return;
        }

        data.result.forEach(update => {
            const chat = update.message?.chat;

            if (chat) {
                console.log("-------------------------");
                console.log("Title :", chat.title || chat.first_name);
                console.log("Type  :", chat.type);
                console.log("Chat ID:", chat.id);
            }
        });

    } catch (err) {
        console.error(err.message);
    }
}

run();
