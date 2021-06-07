import { Types } from './types';
import anime from '../../mockdata/anime';

const initialState = {
    currentSongData: {
        album: 'Swimming',
        artist: 'Mac Miller',
        image: 'swimming',
        length: 102,
        title: 'So It Goes',
        imageUrl:
            'https://www.anime-planet.com/images/anime/covers/naruto-shippuden-1131.jpg'
    },
    album: anime['Kimi No Nawa'],
    toogleTabBar: false,
    playing: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.ADD_SONG: {
            return { ...state, ...action.payload };
        }
        case Types.CHANGE_SONG: {
            return { ...state, currentSongData: action.payload };
        }
        case Types.TOGGLE_PLAY: {
            return { ...state, playing: action.payload };
        }
        case Types.NEXT_SONG: {
            return { ...state, currentSongData: action.payload };
        }
        case Types.PREV_SONG: {
            return { ...state, currentSongData: action.payload };
        }
        case Types.CHANGE_ALBUM: {
            return { ...state, album: action.payload };
        }
        default:
            return state;
    }
};

export default reducer;
