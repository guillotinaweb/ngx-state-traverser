import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RootState } from '../app.state';
import { getContext } from 'ngx-state-traverser';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
})
export class FolderComponent {

  context = this.store.pipe(select(getContext));

  constructor(private readonly store: Store<RootState>) { }

}
