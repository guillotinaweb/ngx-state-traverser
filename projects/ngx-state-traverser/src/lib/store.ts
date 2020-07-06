import { StoreModule, StoreFeatureModule } from '@ngrx/store';
import { ModuleWithProviders } from '@angular/core';
import { reducer } from './reducer';
import { TraverserStateFeatures } from './state';

export const store: ModuleWithProviders<StoreFeatureModule>[] = [
    StoreModule.forFeature(TraverserStateFeatures.Traversal, reducer)
];
