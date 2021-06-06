import React, { useEffect, useState } from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
    Capability,
    Event,
    RepeatMode,
    State,
    usePlaybackState,
    useProgress,
    useTrackPlayerEvents
} from 'react-native-track-player';
import playlistData from './playlist.json';
// @ts-ignore
import localTrack from './tt.m4a';
import { setup } from '../player';

const togglePlayback = async (playbackState: State) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
        // TODO: Perhaps present an error or restart the playlist?
    } else {
        if (playbackState === State.Paused) {
            await TrackPlayer.play();
        } else {
            await TrackPlayer.pause();
        }
    }
};

const App = () => {
    const playbackState = usePlaybackState();
    const progress = useProgress();

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
            // await setup2();
        })();
    }, []);

    return (
        <SafeAreaView style={styles.screenContainer}>
            <StatusBar barStyle={'light-content'} />
            <View style={styles.contentContainer}>
                <View style={styles.topBarContainer}>
                    <TouchableWithoutFeedback>
                        <Text style={styles.queueButton}>Queue</Text>
                    </TouchableWithoutFeedback>
                </View>
                <Image
                    style={styles.artwork}
                    source={{ uri: `${trackArtwork}` }}
                />
                <Text style={styles.titleText}>{trackTitle}</Text>
                <Text style={styles.artistText}>{trackArtist}</Text>
                <Slider
                    style={styles.progressContainer}
                    value={progress.position}
                    minimumValue={0}
                    maximumValue={progress.duration}
                    thumbTintColor="#FFD479"
                    minimumTrackTintColor="#FFD479"
                    maximumTrackTintColor="#FFFFFF"
                    onSlidingComplete={async (value) => {
                        await TrackPlayer.seekTo(value);
                    }}
                />
                <View style={styles.progressLabelContainer}>
                    <Text style={styles.progressLabelText}>
                        {new Date(progress.position * 1000)
                            .toISOString()
                            .substr(14, 5)}
                    </Text>
                    <Text style={styles.progressLabelText}>
                        {new Date(
                            (progress.duration - progress.position) * 1000
                        )
                            .toISOString()
                            .substr(14, 5)}
                    </Text>
                </View>
            </View>
            <View style={styles.actionRowContainer}>
                <TouchableWithoutFeedback
                    onPress={() => TrackPlayer.skipToPrevious()}
                >
                    <Text style={styles.secondaryActionButton}>Prev</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={() => togglePlayback(playbackState)}
                >
                    <Text style={styles.primaryActionButton}>
                        {playbackState === State.Playing ? 'Pause' : 'Play'}
                    </Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={() => TrackPlayer.skipToNext()}
                >
                    <Text style={styles.secondaryActionButton}>Next</Text>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#212121',
        alignItems: 'center'
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center'
    },
    topBarContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'flex-end'
    },
    queueButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFD479'
    },
    artwork: {
        width: 240,
        height: 240,
        marginTop: 30,
        backgroundColor: 'grey'
    },
    titleText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        marginTop: 30
    },
    artistText: {
        fontSize: 16,
        fontWeight: '200',
        color: 'white'
    },
    progressContainer: {
        height: 40,
        width: 380,
        marginTop: 25,
        flexDirection: 'row'
    },
    progressLabelContainer: {
        width: 370,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    progressLabelText: {
        color: 'white',
        fontVariant: ['tabular-nums']
    },
    actionRowContainer: {
        width: '60%',
        flexDirection: 'row',
        marginBottom: 100,
        justifyContent: 'space-between'
    },
    primaryActionButton: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFD479'
    },
    secondaryActionButton: {
        fontSize: 14,
        color: '#FFD479'
    }
});

export default App;
