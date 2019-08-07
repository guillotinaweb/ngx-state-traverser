import { ApplicationActions } from './app.actions';
import { State, initialAppState } from './app.state';

export function reducer(state = initialAppState, action: ApplicationActions): State {
  switch (action.type) {
      default:
        return initialAppState;
  }
}
