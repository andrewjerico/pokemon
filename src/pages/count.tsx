import react from 'react';
import { CountContext } from '@/context/context';

// export const initialState = {
//     count: 0,
//     name: 'andrew'
// }

// const reducer = (state:any, action:any) => {
//     switch (action.type) {
//         case "INCREMENT":
//             return {
//                 ...state,
//                 count: state.count + 1,
//                 name: action.payload
//             }
//             break;
//         case "DECREMENT":
//             return {
//                 ...state,
//                 count: state.count - 1,
//                 name: action.payload
//             }
//             break;
//         default:
//             return state
//             break;
//     }
// }

function Count(){
    // const [state,dispatch] = react.useReducer(reducer,initialState);
    const countContext = react.useContext(CountContext)
    return (
        <>  
            <h1>{countContext.countState.count}</h1>
            {/* <div>Count - {state.count}</div> */}
            <div>
                <button className='btn btn-primary' onClick={() => countContext.countDispatch({type: 'INCREMENT', payload: 'Andrew'})}>Increment</button>
                <button className='btn btn-danger' onClick={() => countContext.countDispatch({type: 'DECREMENT', payload: 'Jerico'})}>Decrement</button>
            </div>
        </>
    )
}

export default Count;