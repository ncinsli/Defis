declare interface IDefinitionGetter{
    sourceName : string;
    getDefinition() : () => Definition;
}

declare type Definition = {
    translate : () => Definition;
    // TODO: other definition features
}