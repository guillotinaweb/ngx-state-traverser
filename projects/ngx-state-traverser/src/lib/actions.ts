import { Action } from '@ngrx/store';
import { Target } from 'angular-traversal';

export enum ActionTypes {
    Traverse = '[Traversal] Traverse',
    ResolveContext = '[Traversal] Resolve context',
    Resolve = '[Traversal] Resolve',
    CleanTraverserResources = '[Traversal] Clean resources',
    UpdateTraverserResource = '[Traversal] Update resources',
}

export class Traverse implements Action {
    readonly type = ActionTypes.Traverse;
    constructor(readonly payload: string) {}
}

export class ResolveContext implements Action {
    readonly type = ActionTypes.ResolveContext;
    constructor(readonly payload: Target) {}
}

export class Resolve implements Action {
    readonly type = ActionTypes.Resolve;
    constructor(readonly payload: {path: string, object: any}) {}
}

export class CleanTraverserResources implements Action {
    readonly type = ActionTypes.CleanTraverserResources;
    constructor(readonly payload: string[]) {}
}

export class UpdateTraverserResource implements Action {
    readonly type = ActionTypes.UpdateTraverserResource;
    constructor(readonly payload: {path: string, changes: {[key: string]: any}}) {}
}

export type Action =
    | Traverse
    | ResolveContext
    | Resolve
    | CleanTraverserResources
    | UpdateTraverserResource;
