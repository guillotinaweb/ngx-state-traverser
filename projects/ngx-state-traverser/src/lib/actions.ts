import { Action } from '@ngrx/store';
import { SerializableTarget } from './models';

export namespace TraverserActions {
    export enum Types {
        Watch = '[Traversal] Watch',
        Traverse = '[Traversal] Traverse',
        TraverseAndNavigate = '[Traversal] Traverse and navigate',
        ResolveContext = '[Traversal] Resolve context',
        Resolve = '[Traversal] Resolve',
        ResolveMany = '[Traversal] Resolve many',
        CleanTraverserResources = '[Traversal] Clean resources',
        UpdateTraverserResource = '[Traversal] Update resource',
        AddOrUpdateTraverserResources = '[Traversal] Add or update resources',
        LoadTile = '[Traversal] Load tile',
        UpdateTile = '[Traversal] Set tile context',
        EmptyTile = '[Traversal] empty tile',
    }

    export class Traverse implements Action {
        readonly type = Types.Traverse;
        constructor(readonly payload: string) {}
    }

    export class TraverseAndNavigate implements Action {
        readonly type = Types.TraverseAndNavigate;
        constructor(readonly payload: string) {}
    }

    export class ResolveContext implements Action {
        readonly type = Types.ResolveContext;
        constructor(readonly payload: SerializableTarget) {}
    }

    export class Resolve implements Action {
        readonly type = Types.Resolve;
        constructor(readonly payload: {path: string, object: any}) {}
    }

    export class ResolveMany implements Action {
        readonly type = Types.ResolveMany;
        constructor(readonly payload: {path: string, object: any}[]) {}
    }

    export class CleanTraverserResources implements Action {
        readonly type = Types.CleanTraverserResources;
        constructor(readonly payload: string[]) {}
    }

    export class UpdateTraverserResource implements Action {
        readonly type = Types.UpdateTraverserResource;
        constructor(readonly payload: {path: string, changes: {[key: string]: any}}) {}
    }

    export class AddOrUpdateTraverserResources implements Action {
        readonly type = Types.AddOrUpdateTraverserResources;
        constructor(readonly payload: {path: string, changes: {[key: string]: any}}[]) {}
    }

    export class LoadTile implements Action {
        readonly type = Types.LoadTile;
        constructor(readonly payload: {tile: string, path: string}) {}
    }

    export class UpdateTile implements Action {
        readonly type = Types.UpdateTile;
        constructor(readonly payload: {tile: string, target: SerializableTarget}) {}
    }

    export class EmptyTile implements Action {
        readonly type = Types.EmptyTile;
        constructor(readonly payload: {tile: string}) {}
    }

    export type Actions =
        | Traverse
        | TraverseAndNavigate
        | ResolveContext
        | Resolve
        | ResolveMany
        | CleanTraverserResources
        | UpdateTraverserResource
        | AddOrUpdateTraverserResources
        | LoadTile
        | UpdateTile
        | EmptyTile
        ;
}
