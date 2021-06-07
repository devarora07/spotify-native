import TrackPlayer, {
    Capability,
    RepeatMode,
    State
} from 'react-native-track-player';

export const setup = async () => {
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
            notificationCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop
            ],
            compactCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop
            ]
        });
        // await TrackPlayer.add({
        //     url: 'https://ia600607.us.archive.org/26/items/AnisicsArchive/musics/Kiminonawa3.mp3',
        //     title: 'Pure (Demo)',
        //     artist: 'David Chavez',
        //     artwork:
        //         'https://i.scdn.co/image/e5c7b168be89098eb686e02152aaee9d3a24e5b6',
        //     duration: 28
        // });

        TrackPlayer.setRepeatMode(RepeatMode.Queue);

        // Workaround because there's no way to just load the queue content into player without playing.
        await TrackPlayer.play();
        await TrackPlayer.pause();
    } catch (err) {
        console.log('err', err);
    }
};

export const changeSong = async (data) => {
    try {
        await TrackPlayer.reset();
        await TrackPlayer.add(data);
        await TrackPlayer.play();
    } catch (err) {
        console.log('err', err);
    }
};

export const addSongToQueue = async (data) => {
    await TrackPlayer.add(data);
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
