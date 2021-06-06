import { score } from './types';

const initialState = {
    currentSongData: {
        album: 'Swimming',
        artist: 'Mac Miller',
        image: 'swimming',
        length: 312,
        title: 'So It Goes'
    },
    toogleTabBar: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case score.NEW_GAME: {
            return { ...state, score: 0 };
        }

        default:
            return state;
    }
};

export default reducer;
