import { Injectable } from '@angular/core';
import { Traverser } from 'angular-traversal';
import { ResolveContext, TraverserActionTypes, Traverse, Resolve } from './actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class StateTraverserEffect {
    @Effect()
    watchTraversing = this.actions
        .pipe(
            ofType('[Traversing] Watch'),
            mergeMap(() => this.traverser.target
                .pipe(
                    map(target => new ResolveContext(target)),
                    catchError(() => EMPTY)
                )
            )
        );

    @Effect()
    request = this.actions
        .pipe(
            ofType<Traverse>(TraverserActionTypes.Traverse),
            mergeMap(action => this.traverser.resolve(action.payload)
                .pipe(
                    map(obj => new Resolve({path: action.payload, object: obj})),
                    catchError(() => EMPTY)
                )
            )
        );
    constructor(
        private actions: Actions,
        private traverser: Traverser,
    ) {}
}
