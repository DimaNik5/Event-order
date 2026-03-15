
export interface ListType {
    [key: string]: boolean;
}

export interface Props{
    content: ListType;
    handleSetList: (updater: (prev: ListType) => ListType) => void;
    children: React.ReactNode;
}