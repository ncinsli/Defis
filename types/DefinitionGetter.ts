export interface IDefinitionGetter{
    sourceName : string;
    getDefinitions : (word: string) => Promise<Array<Definition>>;
}

export type Definition = {
    title : string,
    content : string,
}