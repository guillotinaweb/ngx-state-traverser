import { select, Store } from '@ngrx/store';
import { TraverserSelectors } from './selector';
import { concatMap, map, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { TraversingState } from './state';

export interface StateFirst {
    store: Store<TraversingState>;
}

export const StateResolver = (params?: { maxAge: number }) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = function() {
            const context = this;
            const args = arguments;
            const path: string = args[0];
            const store: Store<TraverserState> = (this as StateFirst).store;
            if (!store) {
                return originalMethod.apply(context, args);
            } else {
                return store.pipe(
                    select(TraverserSelectors.getObjectByPath(path)),
                    take(1),
                    concatMap((obj: any) => {
                        if (obj instanceof TraverserSelectors.Missing ||
                            (!!params?.maxAge && Date.now() > obj._lastUpdate + params.maxAge)
                        ) {
                            return originalMethod.apply(context, args).pipe(map((res: any) => {
                                res._lastUpdate = Date.now();
                                return res;
                            }));
                        } else {
                            return of(obj);
                        }
                    })
                );
            }
        };
        return descriptor;
    };
};
