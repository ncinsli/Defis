import { IDefinitionGetter, Definition } from './../types/DefinitionGetter';

export class WikiDefinitionGetter implements IDefinitionGetter{
    
    public sourceName : string = "Wikipedia";

    public getDefinition(word : string) : Definition{
        
        // Алгоритм по получению информации из вики
        return {
            content : "Default definition :)", 
            attachments : "", 
            translate : () => 'no translation avaiable'
        }
    }  
}