import TrackPlayer, {
    Capability,
    RepeatMode,
    State
} from 'react-native-track-player';

export const setup = async (playlistData, localTrack) => {
    try {
        await TrackPlayer.setupPlayer({});
        await TrackPlayer.updateOptions({
            stopWithApp: true,
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop
            ],
            compactCapabilities: [Capability.Play, Capability.Pause]
        });

        await TrackPlayer.add(playlistData);
        await TrackPlayer.add({
            url: localTrack,
            title: 'Pure (Demo)',
            artist: 'David Chavez',
            artwork:
                'https://i.scdn.co/image/e5c7b168be89098eb686e02152aaee9d3a24e5b6',
            duration: 28
        });

        TrackPlayer.setRepeatMode(RepeatMode.Queue);

        // Workaround because there's no way to just load the queue content into player without playing.
        await TrackPlayer.play();
        await TrackPlayer.pause();
    } catch (err) {
        console.log('err', err);
    }
};

export const togglePlayback = async (playbackState: State) => {
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
