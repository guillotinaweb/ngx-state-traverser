import { initialState, TraversingState } from './state';
import { TraverserActions } from './actions';

/**
 * Performs a deep merge of `source` into `target`.
 * Mutates `target` only but not its objects and arrays.
 *
 * @author inspired by [jhildenbiddle](https://stackoverflow.com/a/48218209).
 * @source https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6#gistcomment-2930530
 */
function mergeDeep(target, source) {
    const isObject = (obj) => obj && typeof obj === 'object';

    if (!isObject(target) || !isObject(source)) {
        return source;
    }

    Object.keys(source).forEach(key => {
        const targetValue = target[key];
        const sourceValue = source[key];

        if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
            target[key] = targetValue.concat(sourceValue);
        } else if (isObject(targetValue) && isObject(sourceValue)) {
            target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
        } else {
            target[key] = sourceValue;
        }
    });

    return target;
}

export function reducer(state = initialState, action: TraverserActions.Actions): TraversingState {
    switch (action.type) {
        case TraverserActions.Types.ResolveContext: {
            let contextPath = action.payload.contextPath;
            if (!!contextPath && contextPath.endsWith('/')) {
                contextPath = contextPath.slice(0, -1);
            }
            return {
                ...state,
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
            const collection = {
                ...state.collection,
                [path]: action.payload.object,
            };
            if (state.target.path === path) {
                return {
                    ...state,
                    target: {...state.target, context: action.payload.object},
                    collection,
                };
            } else {
                return { ...state, collection };
            }
        }
        case TraverserActions.Types.ResolveMany: {
            const collection = action.payload.reduce((all, current) => {
                let path = current.path;
                if (!!path && path.endsWith('/')) {
                    path = path.slice(0, -1);
                }
                all[path] = current.object;
                return all;
            }, {});
            return {
                ...state,
                collection: {
                    ...state.collection,
                    ...collection,
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
            const resource = mergeDeep({...state.collection[action.payload.path]}, action.payload.changes);
            const collection = {
                ...state.collection,
                [action.payload.path]: resource,
            };
            if (state.target.path === action.payload.path) {
                return {
                    ...state,
                    target: {...state.target, context: resource},
                    collection,
                };
            } else {
                return { ...state, collection, };
            }
        }
        case TraverserActions.Types.Traverse: {
            return {
                ...state,
                collection: {
                    ...state.collection,
                    [action.payload]: {isPending: true}
                }
            };
        }
        case TraverserActions.Types.UpdateTile: {
            return {
                ...state,
                tiles: {
                    ...state.tiles,
                    [action.payload.tile]: action.payload.target,
                }
            };
        }
        default: {
            return state;
        }
    }
}
