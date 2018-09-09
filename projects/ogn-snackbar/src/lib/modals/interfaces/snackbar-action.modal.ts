export interface SnackbarAction {
    name: string;
    handler: (action: string, $event: Event) => void;
    textColor?: 'white' | 'Red' | 'Blue' | 'Green';
     // desmissOnlyOnClick?: boolean;
}
