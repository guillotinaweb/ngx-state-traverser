import { Target } from 'angular-traversal';

export enum TraversingStateFeatures {
    Traversal = 'traversal',
}

export interface TraversingState {
    target: Target;
    collection: {[path: string]: any};
    tiles: {[name: string]: Target};
}

export const initialState: TraversingState = {
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
