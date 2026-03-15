export enum SelectedType {
    OFF = 0,
    RADIO_ON = 1,
    CHECKBOX_ON = 2
}

export interface Props{
    selected: SelectedType;
    onClick(): void;
}