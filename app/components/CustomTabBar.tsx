import * as React from 'react';
import PropTypes from 'prop-types';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { BarMusicPlayer } from './BarMusicPlayer';
import { useSelector } from 'react-redux';

const CustomTabBar = (props: any) => {
    const state = useSelector((state) => state.song);
    const { currentSongData, toggleTabBar } = state;

    return toggleTabBar ? null : (
        <React.Fragment>
            <BarMusicPlayer song={currentSongData} />
            <BottomTabBar {...props} />
        </React.Fragment>
    );
};

export default CustomTabBar;
