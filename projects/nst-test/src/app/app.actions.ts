import { Action } from '@ngrx/store';

export enum ApplicationActionTypes {
  Initialize = '[Application] Initialize Application'
}

export class InitializeApplication implements Action {
  readonly type = ApplicationActionTypes.Initialize;
}

export type ApplicationActions =
  | InitializeApplication;
