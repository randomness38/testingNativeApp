import * as api from './api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const GET_DECK = 'GET_DECK'
export const LOAD_DECK = 'LOAD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const LOAD_CARD = 'LOAD_CARD'
export const CLEAR_DECKS = 'CLEAR_DECKS'

export const receiveDecks = (decks) => {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}

export const loadDeck = (deck) => {
    return {
        type: LOAD_DECK,
        deck
    }
};

// 1번 후보
// REMOVE_DECK dispatch 깔끔하게 하는데 AsyncAPI 가 받아먹질 못해서
// 새로고침하면 안지워졌음. 그리고 지워진 object 를 rendering 하려고해서 에러남
// export const removeDeck = (deckId) => (dispatch) => {
//     dispatch({
//         type: REMOVE_DECK,
//         deckId
//     }).then(() => {
//         api.removeDeck(deckId)
//     })
// }

// // 2번 후보
// 얘는 api 는 먹히는데 redux 가 안먹혀서 새로고침 해야지 ui 삭제 됨
// export const removeDeck = (deckId) => (dispatch) => {
//     return api.removeDeck(deckId)
//         .then((deck) => dispatch(loadDeck(deck)))
// }
//
// 3번 후보
// 얘는 정확하게 dispatch 되는데 removed object 가 랜더링 들어가면서 에러남
// 새로고침 하면 삭제 된걸보니 AsyncStorage API 가 받아먹긴 함
// return 붙히나 안붙히나 결과 똑같은 것 같음
export const removeDeck = (deckId) => (dispatch) => {
    return api.removeDeck(deckId)
        .then(() => dispatch({
            type: REMOVE_DECK,
            deckId
        }))
}


export const saveDeckTitle = (deck) => (dispatch) => {
    dispatch(loadDeck(deck)
        .then((result) =>{
            api.saveDeckTitle(result.deck)
        }))
}


export const loadCard = (deckId, card,) => {
    return {
        type: LOAD_CARD,
        deckId,
        card,

    }
};


// 이 구조 왜 안먹히는지 이해 좀...????? 지금은 되려나?
