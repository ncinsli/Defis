import { getRandomId, VK } from "vk-io";
import fs from 'fs';
import { IDefinitionGetter, Definition } from './types/DefinitionGetter';
import { WikiDefinitionGetter } from "./DefenitionGetters/WikiDefinitionGetter";
import { getPeerType } from "vk-io/lib/utils/helpers";

// Объявление главной сущности для работы с апи
const vk : VK = new VK({ token: fs.readFileSync('token.key', 'utf-8') });
let definitionGetter : IDefinitionGetter = new WikiDefinitionGetter();

vk.updates.on('message_new', async context => {
    
    // Проверки на тип (хотя они и не имеют смысл в данном контексте)
    if (context.text === undefined) return;

    // Проверяем только команды
    if (context.text[0] + context.text[1] === '/?') {
        
        let messageId : number = 0;
        const word = context.text.substring(2).trimLeft().toLowerCase();

        vk.api.messages.send({
            message : `ищу, что такое ${word}...`,
            random_id : getRandomId(),
            chat_id : context.chatId
        }).then(mid => messageId = mid);

        // Берём оригинальное слово

        const definitions : Array<Definition> = await definitionGetter.getDefinitions(word);
        // console.log(definition.content);

        if (definitions.length === 1) context.reply(definitions[0].content);
        
        else{
            context.reply('Для этого слова есть несколько определений');
            definitions.forEach(definition => context.reply(definition.content));
        }
    }
})


vk.updates.start().catch(console.error);