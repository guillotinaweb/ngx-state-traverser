import { SerializableTarget } from './models';

export enum TraverserStateFeatures {
    Traversal = 'traversal',
}

export interface TraverserState {
    target: SerializableTarget;
    collection: {[path: string]: any};
    tiles: {[name: string]: SerializableTarget};
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
