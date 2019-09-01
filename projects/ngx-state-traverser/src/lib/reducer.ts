import { initialState, TraversingState } from './state';
import { TraverserActions } from './actions';

export function reducer(state = initialState, action: TraverserActions.Actions): TraversingState {
    switch (action.type) {
        case TraverserActions.Types.ResolveContext: {
            let contextPath = action.payload.contextPath;
            if (!!contextPath && contextPath.endsWith('/')) {
                contextPath = contextPath.slice(0, -1);
            }
            return {
                target: action.payload,
                collection: {
                    ...state.collection,
                    [contextPath]: action.payload.context,
                },
            };
        }
        case TraverserActions.Types.Resolve: {
            let path = action.payload.path;
            if (!!path && path.endsWith('/')) {
                path = path.slice(0, -1);
            }
            return {
                ...state,
                collection: {
                    ...state.collection,
                    [path]: action.payload.object,
                },
            };
        }
        case TraverserActions.Types.CleanTraverserResources: {
            const exactPathes = action.payload.filter(path => !path.endsWith('*'));
            const startPathes = action.payload.filter(path => path.endsWith('*')).map(path => path.slice(0, -1));
            const collection = Object.entries(state.collection).reduce((all, [path, obj]) => {
                if (!exactPathes.includes(path) && !startPathes.some(p => path.startsWith(p))) {
                    all[path] = obj;
                }
                return all;
            }, {});
            return {
                ...state,
                collection,
            };
        }
        case TraverserActions.Types.UpdateTraverserResource: {
            return {
                ...state,
                collection: {
                    ...state.collection,
                    [action.payload.path]: {...state.collection[action.payload.path], ...action.payload.changes},
                }
            };
        }
        default: {
            return state;
        }
    }
}
