import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TraverserSelectors, TraverserState } from 'ngx-state-traverser';

@Component({
  selector: 'app-folder-details',
  templateUrl: './folder-details.component.html',
})
export class FolderDetailsComponent {

    tileContext = this.store.pipe(select(TraverserSelectors.getTileContext('details')));

    constructor(private readonly store: Store<TraverserState>) { }


}
