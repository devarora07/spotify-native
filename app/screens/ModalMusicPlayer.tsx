import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, device, func, gStyle, images } from '../constants';
import ModalHeader from '../components/ModalHeader';
import TouchIcon from '../components/TouchIcon';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import TrackPlayer, {
    Capability,
    Event,
    RepeatMode,
    State,
    usePlaybackState,
    useProgress,
    useTrackPlayerEvents
} from 'react-native-track-player';
import { setup } from '../player';
import { toggle_play } from '../redux/song/actions';
// import { fetchSong } from '../api';

export const ModalMusicPlayer = () => {
    const navigation = useNavigation();
    const [favourite, setFavourite] = useState(false);

    const songState = useSelector((state) => state.song);
    const dispatch = useDispatch();
    const playbackState = usePlaybackState();
    const progress = useProgress();

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
        if (
            event.type === Event.PlaybackTrackChanged &&
            event.nextTrack != null
        ) {
            const track = await TrackPlayer.getTrack(event.nextTrack);
        }
    });

    // useEffect(() => {
    //     (async () => {
    //         await setup();
    //     })();
    // }, []);

    const { currentSongData, album } = songState;

    const favoriteColor = favourite ? colors.brandPrimary : colors.white;
    const favoriteIcon = favourite ? 'heart' : 'heart-o';
    const iconPlay = songState.playing ? 'play-circle' : 'pause-circle';

    const timePast = func.formatTime(0);
    const timeLeft = func.formatTime(currentSongData.duration);

    const toggleFavorite = () => {
        setFavourite(!favourite);
    };

    const togglePlay = async () => {
        dispatch(toggle_play(playbackState));
    };

    const handlePrev = () => {
        TrackPlayer.skipToPrevious();
    };

    const handleNext = () => {
        TrackPlayer.skipToNext();
    };

    return (
        <View style={gStyle.container}>
            <ModalHeader
                left={<Feather color={colors.greyLight} name="chevron-down" />}
                leftPress={() => navigation.goBack()}
                right={
                    <Feather color={colors.greyLight} name="more-horizontal" />
                }
                text={currentSongData.album}
            />

            <View style={gStyle.p3}>
                <Image source={{ uri: album.imageUrl }} style={styles.image} />

                <View style={[gStyle.flexRowSpace, styles.containerDetails]}>
                    <View style={styles.containerSong}>
                        <Text
                            ellipsizeMode="tail"
                            numberOfLines={1}
                            style={styles.song}
                        >
                            {currentSongData.title}
                        </Text>
                        <Text style={styles.artist}>
                            {currentSongData.artist}
                        </Text>
                    </View>
                    <View style={styles.containerFavorite}>
                        <TouchIcon
                            icon={
                                <FontAwesome
                                    color={favoriteColor}
                                    name={favoriteIcon}
                                />
                            }
                            onPress={toggleFavorite}
                        />
                    </View>
                </View>

                <View style={styles.containerVolume}>
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
                    <View style={styles.containerTime}>
                        <Text style={styles.time}>{timePast}</Text>
                        <Text style={styles.time}>{`-${timeLeft}`}</Text>
                    </View>
                </View>

                <View style={styles.containerControls}>
                    <TouchIcon
                        icon={
                            <Feather color={colors.greyLight} name="shuffle" />
                        }
                        onPress={() => null}
                    />
                    <View style={gStyle.flexRowCenterAlign}>
                        <TouchIcon
                            icon={
                                <FontAwesome
                                    color={colors.white}
                                    name="step-backward"
                                />
                            }
                            iconSize={32}
                            onPress={() => handlePrev()}
                        />
                        <View style={gStyle.pH3}>
                            <TouchIcon
                                icon={
                                    <FontAwesome
                                        color={colors.white}
                                        name={iconPlay}
                                    />
                                }
                                iconSize={64}
                                onPress={() => togglePlay()}
                            />
                        </View>
                        <TouchIcon
                            icon={
                                <FontAwesome
                                    color={colors.white}
                                    name="step-forward"
                                />
                            }
                            iconSize={32}
                            onPress={handleNext}
                        />
                    </View>
                    <TouchIcon
                        icon={
                            <Feather color={colors.greyLight} name="repeat" />
                        }
                        onPress={() => null}
                    />
                </View>

                <View style={styles.containerBottom}>
                    <TouchIcon
                        icon={
                            <Feather color={colors.greyLight} name="speaker" />
                        }
                        onPress={() => null}
                    />
                    <TouchIcon
                        icon={
                            <MaterialIcons
                                color={colors.greyLight}
                                name="playlist-play"
                            />
                        }
                        onPress={() => null}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: device.width - 48,
        marginVertical: device.iPhoneNotch ? 36 : 8,
        width: device.width - 48
    },
    containerDetails: {
        marginBottom: 16
    },
    containerSong: {
        flex: 6
    },
    song: {
        ...gStyle.textSpotifyBold24,
        color: colors.white
    },
    artist: {
        ...gStyle.textSpotify18,
        color: colors.greyInactive
    },
    containerFavorite: {
        alignItems: 'flex-end',
        flex: 1,
        justifyContent: 'center'
    },
    // @ts-ignore
    containerTime: {
        ...gStyle.flexRowSpace
    },
    time: {
        ...gStyle.textSpotify10,
        color: colors.greyInactive
    },
    // @ts-ignore
    containerControls: {
        ...gStyle.flexRowSpace,
        marginTop: device.iPhoneNotch ? 24 : 8
    },
    // @ts-ignore
    containerBottom: {
        ...gStyle.flexRowSpace,
        marginTop: device.iPhoneNotch ? 32 : 8
    }
});
