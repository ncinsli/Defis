import { getRandomId, Keyboard, VK } from "vk-io";
import fs from 'fs';
import { IDefinitionGetter, Definition } from './types/DefinitionGetter';
import { WikiDefinitionGetter } from "./DefenitionGetters/WikiDefinitionGetter";
import { getPeerType } from "vk-io/lib/utils/helpers";

// Объявление главной сущности для работы с апи
const vk : VK = new VK({ token: fs.readFileSync('token.key', 'utf-8') });
let definitionGetter : IDefinitionGetter = new WikiDefinitionGetter();
let lastDefinitionsArray = new Array<Definition>();
let currentDefinitionIndex = 0;

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
        lastDefinitionsArray = definitions;
        // console.log(definition.content);

        if (definitions.length === 1) context.reply(definitions[0].content);

        else{
            context.reply('Для этого слова есть несколько определений');            
          
            const keyboard : Keyboard = Keyboard.builder()
                .textButton({
                    label : "<",
                    payload : {}
                })
                .textButton({ 
                    label : ">",
                    payload : {}
                })
                .inline();

            vk.api.messages.send({
                message : definitions[0].content,
                random_id : getRandomId(),
                chat_id : context.chatId,
                keyboard : keyboard
            })
            // definitions.forEach(definition => context.reply(definition.content));
        }
    }
    
    else if (context.text[context.text.length - 1] == '>'){
        if (currentDefinitionIndex == lastDefinitionsArray.length - 1) return;
        currentDefinitionIndex++;
        // Тут нужен код, который редактирует / пишет новое сообщение на следующий элемент массива lastDefinitionsArray
    }

    else if (context.text[context.text.length - 1] == '<'){
        if (currentDefinitionIndex == 0) return;
        currentDefinitionIndex--;
        // Тут нужен код, который редактирует / пишет новое сообщение на предыдущий элемент массива lastDefinitionsArray
    }
})


vk.updates.start().catch(console.error);