import { IDefinitionGetter, Definition } from './../types/DefinitionGetter';
import axios from 'axios';  

export class WikiDefinitionGetter implements IDefinitionGetter{
    
    public sourceName : string = "Wikipedia"; //for what?

    public getDefinition(word : string) : Definition{
        axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURI(word)}&format=json&prop=text`)
		.then((response : any) => {
			//response = JSON.parse(response)
			//console.log(response["data"]["batchcomplete"]) 
            // @ts-ignore
			console.log(response)
		})
        // Алгоритм по получению информации из вики
        return {
            content : "Default definition :)", 
            attachments : "", 
            translate : () => 'no translation avaiable'
        }
    }  
}
