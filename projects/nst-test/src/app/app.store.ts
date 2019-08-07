import { ModuleWithProviders } from '@angular/core';
import { ActionReducerMap, MetaReducer, Action, StoreModule } from '@ngrx/store';
import { RootState } from './app.state';
import { reducer } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

export * from './app.state';

const reducers: ActionReducerMap<RootState> = {
    app: reducer,
};

const metaReducers: MetaReducer<RootState, Action>[] = [];

export const appStore: ModuleWithProviders[] = [
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
        logOnly: environment.production,
        maxAge: 25
    })
];
