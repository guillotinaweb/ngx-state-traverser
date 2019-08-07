import { StoreModule } from '@ngrx/store';
import { ModuleWithProviders } from '@angular/core';
import { reducer } from './reducer';
import { TraversingStateFeatures } from './state';

export const store: ModuleWithProviders[] = [
    StoreModule.forFeature(TraversingStateFeatures.Traversal, reducer)
];
