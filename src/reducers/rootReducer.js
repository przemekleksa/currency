const initState = {
    posts: [
        {id: '1', name: 'loan', eur: 16444.34, pln: 70710.662},
        {id: '2', name: 'car payment', eur: 345.34, pln: 1484.962},
        {id: '3', name: 'new sofa', eur: 5435.00, pln: 23370.5}
    ],
    exchangeRate: [
        {rate: 4.30}
    ]
}

const rootReducer = (state = initState, action) => {
    if (action.type === "DELETE") {
        let newPosts = state.posts.filter(post => {
            return action.id !== post.id
        });
     
        return {
            ...state,
            posts: newPosts
        }
    }
    if (action.type === "CHANGE_RATE") {
     
        let newRate = action.rate
        let newCalc = state.posts.map((item) => {
            item = {...item, pln: action.rate * item.eur}
            return item
        })
        return {
            ...state,
            exchangeRate: [{rate: newRate}],
            posts: newCalc
            }
    }
    if (action.type === "ADD_TRANSACTION") {
        let newName = action.name;
        let newAmount = action.eur;
        let newPln = newAmount * state.exchangeRate[0].rate;
        let newId = "0";
        if(state.posts.length > 0){
            newId = state.posts[state.posts.length-1].id
        }
        newId = String(parseInt(newId) + 1)
        let newTransaction = {id: newId, name: newName, eur: newAmount, pln: newPln}
        return {
            ...state,
            posts:  state.posts.concat(newTransaction)
        }
    }
    return state;
}

export default rootReducer