export interface RootState {
    app: State;
}

export enum RootStateFeatures {
    App = 'app',
}

export interface State {
}

export const initialAppState: State = {
};
