import { VK } from "vk-io";
import fs from 'fs';
import { IDefinitionGetter, Definition } from './types/DefinitionGetter';
import { WikiDefinitionGetter } from "./DefenitionGetters/WikiDefinitionGetter";
import { ZnachenieDefinitionGetter } from "./DefenitionGetters/ZnachenieDefinitionGetter";

// Объявление главной сущности для работы с апи
const vk : VK = new VK({ token: fs.readFileSync('token.key', 'utf-8') });
let definitionGetter : IDefinitionGetter = new ZnachenieDefinitionGetter();

vk.updates.on('message_new', context => {
    
    // Проверки на тип (хотя они и не имеют смысл в данном контексте)
    if (context.text === undefined) return;

    // Проверяем только команды
    if (context.text[0] === '/') {
        
        // Берём оригинальное слово
        const word = context.text.substring(1).toLowerCase();

        context.reply(definitionGetter.getDefinition(word).content);
    }
})


vk.updates.start().catch(console.error);