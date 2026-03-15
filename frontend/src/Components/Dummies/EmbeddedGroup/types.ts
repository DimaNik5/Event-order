
export interface ListType<T> {
    [key: string]: T;
}

export interface Props<T>{
    handleSelect(name: String, content: any): void;
    content: ListType<T>;
}