

export default function increment(state = 0, action) {
    let { type, payload } = action;
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;

        default:
            return state;
    }
};