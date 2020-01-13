import { Action } from '@ngrx/store';
import { Target } from 'angular-traversal';

export namespace TraverserActions {
    export enum Types {
        Traverse = '[Traversal] Traverse',
        ResolveContext = '[Traversal] Resolve context',
        Resolve = '[Traversal] Resolve',
        CleanTraverserResources = '[Traversal] Clean resources',
        UpdateTraverserResource = '[Traversal] Update resources',
        LoadTile = '[Traversal] Load tile',
        UpdateTile = '[Traversal] Set tile context',
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

    export class LoadTile implements Action {
        readonly type = Types.LoadTile;
        constructor(readonly payload: {tile: string, path: string}) {}
    }

    export class UpdateTile implements Action {
        readonly type = Types.UpdateTile;
        constructor(readonly payload: {tile: string, target: Target}) {}
    }

    export type Actions =
        | Traverse
        | ResolveContext
        | Resolve
        | CleanTraverserResources
        | UpdateTraverserResource
        | LoadTile
        | UpdateTile;
}
