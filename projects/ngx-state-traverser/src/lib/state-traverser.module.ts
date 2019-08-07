import { NgModule } from '@angular/core';
import { store } from './store';


@NgModule({
  imports: [
    ...store,
  ]
})
export class StateTraverserModule {
}
