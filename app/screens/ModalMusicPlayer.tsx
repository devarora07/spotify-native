import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, device, func, gStyle, images } from '../constants';
import ModalHeader from '../components/ModalHeader';
import TouchIcon from '../components/TouchIcon';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import TrackPlayer, {
    Capability,
    Event,
    RepeatMode,
    State,
    usePlaybackState,
    useProgress,
    useTrackPlayerEvents
} from 'react-native-track-player';
import playlistData from '../player/playlist.json';
// @ts-ignore
import localTrack from '../player/tt.m4a';
import { setup } from '../player';

const togglePlayback = async (playbackState: State) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    console.log(currentTrack, playbackState);
    if (currentTrack == null) {
        // TODO: Perhaps present an error or restart the playlist?
        console.log('current track is null');
    } else {
        if (playbackState === State.Paused) {
            await TrackPlayer.play();
        } else {
            await TrackPlayer.pause();
        }
    }
};

export const ModalMusicPlayer = () => {
    const navigation = useNavigation();
    const [favourite, setFavourite] = useState(false);
    const [pause, setPause] = useState(false);

    const songState = useSelector((state) => state.song);

    const playbackState = usePlaybackState();
    const progress = useProgress();

    // can also be used by state mgmt.
    const [trackArtwork, setTrackArtwork] = useState<string | number>();
    const [trackTitle, setTrackTitle] = useState<string>();
    const [trackArtist, setTrackArtist] = useState<string>();

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
        if (
            event.type === Event.PlaybackTrackChanged &&
            event.nextTrack != null
        ) {
            const track = await TrackPlayer.getTrack(event.nextTrack);
            const { title, artist, artwork } = track || {};
            setTrackTitle(title);
            setTrackArtist(artist);
            setTrackArtwork(artwork);
        }
    });

    useEffect(() => {
        (async () => {
            await setup(playlistData, localTrack);
        })();
    }, []);

    const toggleFavorite = () => {
        setFavourite(!favourite);
    };

    const togglePlay = async () => {
        setPause(!pause);
        await togglePlayback(playbackState);
    };

    // const { screenProps } = props;
    const { currentSongData } = songState;

    const favoriteColor = favourite ? colors.brandPrimary : colors.white;
    const favoriteIcon = favourite ? 'heart' : 'heart-o';
    const iconPlay = pause ? 'play-circle' : 'pause-circle';

    const timePast = func.formatTime(0);
    const timeLeft = func.formatTime(currentSongData.length);

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
                <Image
                    source={images[currentSongData.image]}
                    style={styles.image}
                />

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
                        maximumValue={currentSongData.length}
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
                            onPress={() => null}
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
                                // onPress={() => togglePlayback(playbackState)}
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
                            // onPress={() => null}
                            onPress={() => TrackPlayer.skipToNext()}
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
