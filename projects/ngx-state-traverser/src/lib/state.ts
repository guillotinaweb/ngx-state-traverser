import { Target } from 'angular-traversal';

export enum TraverserStateFeatures {
    Traversal = 'traversal',
}

export interface TraverserState {
    target: Target;
    collection: {[path: string]: any};
    tiles: {[name: string]: Target};
}

export const initialState: TraverserState = {
    target: {
        component: null,
        context: {},
        contextPath: '',
        prefixedContextPath: '',
        path: '',
        prefixedPath: '',
        view: 'view',
    },
    collection: {},
    tiles: {},
};
