export interface IDefinitionGetter{
    sourceName : string;
    getDefinition : (word: string) => Definition;
}

export type Definition = {
    translate : () => Definition | 'no translation avaiable';
    content : string | 'no',
    attachments : string | 'no' // Пока это строка
}