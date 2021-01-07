import { Injectable } from '@angular/core';
import { Traverser } from 'angular-traversal';
import { TraverserActions } from './actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { SerializableTarget } from './models';

@Injectable()
export class StateTraverserEffect {
    @Effect()
    watchTraverser = this.actions
        .pipe(
            ofType(TraverserActions.Types.Watch),
            mergeMap(() => this.traverser.target
                .pipe(
                    map((target: SerializableTarget) => {
                        const {component, ..._target} = target;
                        return new TraverserActions.ResolveContext(_target as SerializableTarget);
                    }),
                    catchError(() => EMPTY)
                )
            )
        );

    @Effect()
    watchTiles = this.actions
        .pipe(
            ofType(TraverserActions.Types.Watch),
            mergeMap(() => this.traverser.tileUpdates
                .pipe(
                    map(({tile, target}) => {
                        const {component, ..._target} = target;
                        return new TraverserActions.UpdateTile({tile, target: _target as SerializableTarget});
                    }),
                    catchError(() => EMPTY)
                )
            )
        );

    @Effect()
    request = this.actions
        .pipe(
            ofType<TraverserActions.Traverse>(TraverserActions.Types.Traverse),
            mergeMap(action => this.traverser.resolve(action.payload)
                .pipe(
                    map(obj => new TraverserActions.Resolve({path: action.payload, object: obj})),
                    catchError(() => EMPTY)
                )
            )
        );

    @Effect({dispatch: false})
    navigateTo = this.actions
        .pipe(
            ofType<TraverserActions.TraverseAndNavigate>(TraverserActions.Types.TraverseAndNavigate),
            tap(action => this.traverser.traverse(action.payload))
        );

    @Effect({dispatch: false})
    loadTile = this.actions
        .pipe(
            ofType<TraverserActions.LoadTile>(TraverserActions.Types.LoadTile),
            tap(action => this.traverser.loadTile(action.payload.tile, action.payload.path))
        );

    @Effect({dispatch: false})
    emptyTile = this.actions
        .pipe(
            ofType<TraverserActions.LoadTile>(TraverserActions.Types.EmptyTile),
            tap(action => this.traverser.emptyTile(action.payload.tile))
        );

    constructor(
        private readonly actions: Actions,
        private traverser: Traverser,
    ) {}
}
