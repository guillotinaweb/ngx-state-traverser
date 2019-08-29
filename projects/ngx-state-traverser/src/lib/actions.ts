import { Action } from '@ngrx/store';
import { Target } from 'angular-traversal';

export namespace TraverserActions {
    export enum Types {
        Traverse = '[Traversal] Traverse',
        ResolveContext = '[Traversal] Resolve context',
        Resolve = '[Traversal] Resolve',
        CleanTraverserResources = '[Traversal] Clean resources',
        UpdateTraverserResource = '[Traversal] Update resources',
    }

    export class Traverse implements Action {
        readonly type = Types.Traverse;
        constructor(readonly payload: string) {}
    }

    export class ResolveContext implements Action {
        readonly type = Types.ResolveContext;
        constructor(readonly payload: Target) {}
    }

    export class Resolve implements Action {
        readonly type = Types.Resolve;
        constructor(readonly payload: {path: string, object: any}) {}
    }

    export class CleanTraverserResources implements Action {
        readonly type = Types.CleanTraverserResources;
        constructor(readonly payload: string[]) {}
    }

    export class UpdateTraverserResource implements Action {
        readonly type = Types.UpdateTraverserResource;
        constructor(readonly payload: {path: string, changes: {[key: string]: any}}) {}
    }

    export type Actions =
        | Traverse
        | ResolveContext
        | Resolve
        | CleanTraverserResources
        | UpdateTraverserResource;
}
