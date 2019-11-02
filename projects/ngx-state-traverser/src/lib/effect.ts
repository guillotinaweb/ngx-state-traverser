import { Injectable } from '@angular/core';
import { Traverser } from 'angular-traversal';
import { TraverserActions } from './actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class StateTraverserEffect {
    @Effect()
    watchTraversing = this.actions
        .pipe(
            ofType('[Traversing] Watch'),
            mergeMap(() => this.traverser.target
                .pipe(
                    map(target => new TraverserActions.ResolveContext(target)),
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
    constructor(
        private readonly actions: Actions,
        private traverser: Traverser,
    ) {}
}
