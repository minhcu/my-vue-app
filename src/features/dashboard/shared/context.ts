import { createContext } from 'react';

export const SetIsEditDialogOpenContext = createContext(
    (open: boolean) => {
        console.log('This function is not implemented yet.');
    }
);
export const SelectedBoardIdContext = createContext<string | null>(null);