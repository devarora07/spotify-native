import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors, device, gStyle } from '../constants';
import { togglePlayback } from '../player';
import { State } from 'react-native-track-player';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { toggle_play } from '../redux/song/actions';
import TrackPlayer, {
    usePlaybackState,
    useProgress
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';

export const BarMusicPlayer = () => {
    const [favourite, setFavourite] = useState(false);

    const navigation = useNavigation();
    const songState = useSelector((state) => state.song);
    const dispatch = useDispatch();
    const playbackState = usePlaybackState();
    const progress = useProgress();

    const toggleFavorite = () => {
        setFavourite(!favourite);
    };

    const togglePlay = async () => {
        dispatch(toggle_play(playbackState));
    };

    const favoriteColor = favourite ? colors.brandPrimary : colors.white;
    const favoriteIcon = favourite ? 'heart' : 'heart-o';
    const iconPlay = songState.playing ? 'play-circle' : 'pause-circle';

    const { currentSongData } = songState;

    return (
        <React.Fragment>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate('Player')}
                style={styles.container}
            >
                <TouchableOpacity
                    activeOpacity={gStyle.activeOpacity}
                    hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
                    onPress={toggleFavorite}
                    style={styles.containerIcon}
                >
                    <FontAwesome
                        color={favoriteColor}
                        name={favoriteIcon}
                        size={20}
                    />
                </TouchableOpacity>
                {songState && (
                    <View>
                        <View style={styles.containerSong}>
                            <Text
                                style={styles.title}
                            >{`${songState.currentSongData?.title} · `}</Text>
                            <Text style={styles.artist}>
                                {songState.currentSongData?.artist}
                            </Text>
                        </View>
                        {/* <View style={[gStyle.flexRowCenter, gStyle.mTHalf]}>
                            <FontAwesome
                                color={colors.brandPrimary}
                                name="bluetooth-b"
                                size={14}
                            />
                            <Text style={styles.device}>
                                Caleb&apos;s Beatsx
                            </Text>
                        </View> */}
                        <Slider
                            minimumValue={0}
                            maximumValue={currentSongData.duration}
                            minimumTrackTintColor={colors.white}
                            maximumTrackTintColor={colors.grey3}
                            value={progress.position}
                            onSlidingComplete={async (value) => {
                                await TrackPlayer.seekTo(value);
                            }}
                        />
                    </View>
                )}
                <TouchableOpacity
                    activeOpacity={gStyle.activeOpacity}
                    hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
                    onPress={togglePlay}
                    style={styles.containerIcon}
                >
                    <FontAwesome
                        color={colors.white}
                        name={iconPlay}
                        size={28}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        backgroundColor: colors.grey,
        borderBottomColor: colors.blackBg,
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        width: '100%'
    },
    // @ts-ignore
    containerIcon: {
        ...gStyle.flexCenter,
        width: 50
    },
    // @ts-ignore
    containerSong: {
        ...gStyle.flexRowCenter,
        overflow: 'hidden',
        width: device.width - 100
    },
    title: {
        ...gStyle.textSpotify12,
        color: colors.white
    },
    artist: {
        ...gStyle.textSpotify12,
        color: colors.greyLight
    },
    device: {
        ...gStyle.textSpotify10,
        color: colors.brandPrimary,
        marginLeft: 4,
        textTransform: 'uppercase'
    }
});
