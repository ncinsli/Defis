import { VK } from "vk-io";
import fs from 'fs';

const vk : VK = new VK({ token: fs.readFileSync('token.key', 'utf-8') });

vk.updates.on('message_new', context => {
    context.reply('Ку.');
})


vk.updates.start().catch(console.error);