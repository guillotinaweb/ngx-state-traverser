import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RootState } from '../app.state';
import { getContext } from 'projects/ngx-state-traverser/src/public-api';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
})
export class FolderComponent {

  context = this.store.pipe(select(getContext));

  constructor(private readonly store: Store<RootState>) { }

}
