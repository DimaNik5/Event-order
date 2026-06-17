
export interface ListType {
    [key: string]: boolean;
}

export interface Props{
    content: ListType;
    handleSetList: (newContent: ListType) => void;
    children: React.ReactNode;
    unpresseble?: boolean;
}