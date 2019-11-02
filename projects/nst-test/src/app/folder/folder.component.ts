import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TraverserSelectors, TraversingState } from 'ngx-state-traverser';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
})
export class FolderComponent {

  context = this.store.pipe(select(TraverserSelectors.getContext));

  constructor(private readonly store: Store<TraversingState>) { }

}
