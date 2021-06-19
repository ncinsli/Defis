import { IDefinitionGetter, Definition } from './../types/DefinitionGetter';
const axios = require('axios').default //or i can replace by "import"?


export class WikiDefinitionGetter implements IDefinitionGetter{
    
    public sourceName : string = "Wikipedia"; //for what?

    public getDefinition(word : string) : Definition{
        axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${word}&format=json`)
		.then(function(response: string) {
			//response = JSON.parse(response)
			//console.log(response["data"]["batchcomplete"])
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
