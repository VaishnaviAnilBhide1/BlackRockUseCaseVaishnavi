const initialState = {
    x: '',
    y: '',
    z: '',
    sig: '',
    rho: '',
    beta: '',
    delta: '',
    data: ''
};
  
const variableReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_VARIABLE':
            return { ...state, [action.payload.name]: action.payload.value };
        case 'SET_DATA_JSON':
            return { ...state, data: action.payload.jsonData };
        default:
            return state;
    }
};
  
export default variableReducer;

  