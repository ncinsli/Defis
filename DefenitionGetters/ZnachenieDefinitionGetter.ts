import { IDefinitionGetter, Definition } from './../types/DefinitionGetter';
import axios from 'axios';  
import { parse } from 'node-html-parser';

export class ZnachenieDefinitionGetter implements IDefinitionGetter{
    public sourceName : string = "znachenie-slova.ru";
    
    public getDefinition(word : string) : Definition{
        console.log(`https://znachenie-slova.ru/${word}`)
        axios.get(`https://znachenie-slova.ru/${encodeURI(word)}`).then((response : any) => {
            const result = parseFromString(response, 'text/html');
            console.log(result);
        })

        return {
            content : "Default definition :)", 
            attachments : "", 
            translate : () => 'no translation avaiable'
        }
    }
}