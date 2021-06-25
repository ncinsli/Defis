import { IDefinitionGetter, Definition } from './../types/DefinitionGetter';
import axios from 'axios';  

export class WikiDefinitionGetter implements IDefinitionGetter{
    
    public sourceName : string = "Wikipedia"; //for what?

    public async getDefinitions(word : string) : Promise<Array<Definition>>{
        const raw_response : any = await axios.get(`https://ru.wikipedia.org/w/api.php?action=query&generator=prefixsearch&gpssearch=${encodeURI(word)}&format=json&prop=extracts&exintro=1&explaintext=1&redirects=1`);
        const response : WikiDefinition = raw_response.data as WikiDefinition;
        const pages : Array<WikiConcretePage> = Object.values(response.query.pages);

        let returnValues : Array<Definition> = new Array<Definition>();

        pages.forEach(page => {
            const newDefinition : Definition = {
                title : page.title,
                content : page.extract
            }
            returnValues.push(newDefinition);
        });
        
        return returnValues;
    }  
}

type WikiDefinition = {
    batchcomplete : string,
    query : {
        pages : Array<WikiConcretePage>
    }
}

type WikiConcretePage = {
    pageid : string,
    ns : number,
    title : string,
    index : number,
    extract : string
}