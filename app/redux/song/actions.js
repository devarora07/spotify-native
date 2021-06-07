import { Types } from './types';
import { togglePlayback, changeSong } from '../../player';
import { State } from 'react-native-track-player';

export const toggle_play = (payload) => async (dispatch) => {
    await togglePlayback(payload);
    dispatch({
        type: Types.TOGGLE_PLAY,
        payload: payload === State.Playing ? true : false
    });
};

export const next_song = (payload) => async (dispatch) => {
    dispatch({ type: Types.NEXT_SONG, payload });
};

export const prev_song = (payload) => async (dispatch) => {
    dispatch({ type: Types.PREV_SONG, payload });
};

export const add_song = (payload) => async (dispatch) => {
    dispatch({ type: Types.ADD_SONG, payload });
};
export const change_song = (payload) => async (dispatch) => {
    await changeSong(payload);
    dispatch({ type: Types.CHANGE_SONG, payload });
};

export const change_album = (payload) => async (dispatch) => {
    dispatch({ type: Types.CHANGE_ALBUM, payload });
};
