import React, { useState, useEffect } from 'react';
import {
    Alert,
    Animated,
    Image,
    StyleSheet,
    Switch,
    Text,
    View
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
// import { BlurView } from 'expo-blur';
import { colors, device, gStyle, images } from '../constants';
import LinearGradient from '../components/LinearGradient';
import LineItemSong from '../components/LineItemSong';
import TouchIcon from '../components/TouchIcon';
import TouchText from '../components/TouchText';
import albums from '../mockdata/albums';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import PlayerComponent from '../player/playerComponent';

export const Album = (props) => {
    const [state, setState] = useState({
        album: {
            artist: 'Billie Eilish',
            backgroundColor: '#363230',
            image: 'whenWeAllFallAsleep',
            released: 2019,
            title: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
            tracks: [
                { title: '!!!!!!!', seconds: 161 },
                { title: 'Bad Guy', seconds: 245 },
                { title: 'Xanny', seconds: 288 },
                { title: 'You Should See Me in a Crown', seconds: 215 },
                { title: 'All the Good Girls Go to Hell', seconds: 345 },
                { title: 'Wish You Were Gay', seconds: 250 },
                { title: "When the Party's Over", seconds: 287 },
                { title: '8', seconds: 271 },
                { title: 'My Strange Addiction', seconds: 210 },
                { title: 'Bury a Friend', seconds: 237 },
                { title: 'Ilomilo', seconds: 345 },
                { title: 'Listen Before I Go', seconds: 347 },
                { title: 'I Love You', seconds: 312 },
                { title: 'Goodbye', seconds: 271 }
            ]
        },
        // album: 'Swimming',
        downloaded: false,
        scrollY: new Animated.Value(0),
        song: 'So It Goes',
        title: 'Swimming'
    });

    const songState = useSelector((state) => state.song);
    const navigation = useNavigation();

    useEffect(() => {
        // const { screenProps } = props;

        const { currentSongData } = songState;
        // const albumTitle = navigation.getParam('title', 'ALBUM NOT FOUND?!');
        // const albumTitle = navigation.getParam(
        //     'title',
        //     'Extraordinary Machine'
        // );

        const albumTitle = 'Extraordinary Machine';

        // setState({
        //     ...state,
        //     album: albums[albumTitle] || null,
        //     song: currentSongData.title,
        //     title: albumTitle
        // });
    }, []);

    const toggleDownloaded = (val) => {
        // if web
        if (device.web) {
            // setState({
            //     ...state,
            //     downloaded: val
            // });

            return;
        }

        // remove downloads alert
        if (val === false) {
            Alert.alert(
                'Remove from Downloads?',
                "You won't be able to play this offline.",
                [
                    { text: 'Cancel' },
                    {
                        onPress: () => {
                            // setState({
                            //     ...state,
                            //     downloaded: false
                            // });
                        },
                        text: 'Remove'
                    }
                ],
                { cancelable: false }
            );
        } else {
            // setState({
            //     ...state,
            //     downloaded: val
            // });
        }
    };

    const changeSong = (songData) => {
        // const {
        //     screenProps: { changeSong }
        // } = props;
        // dispatch to change song...
        // changeSong(songData);
        // setState({
        //     ...state,
        //     song: songData.title
        // });
    };

    const toggleBlur = () => {
        const {
            screenProps: { setToggleTabBar }
        } = props;

        setToggleTabBar();
    };

    // const {
    //     screenProps: { toggleTabBarState, setToggleTabBar }
    // } = props;
    const { toggleTabBar } = songState;
    const { album, downloaded, scrollY, song, title } = state;

    // album data not set?
    // if (album === null) {
    //     return (
    //         <View style={[gStyle.container, gStyle.flexCenter]}>
    //             <Text style={{ color: colors.white }}>{`Album: ${title}`}</Text>
    //         </View>
    //     );
    // }

    const stickyArray = device.web ? [] : [0];
    const headingRange = device.web ? [140, 200] : [230, 280];
    const shuffleRange = device.web ? [40, 80] : [40, 80];

    const opacityHeading = scrollY.interpolate({
        inputRange: headingRange,
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });

    const opacityShuffle = scrollY.interpolate({
        inputRange: shuffleRange,
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });

    return (
        // <PlayerComponent />
        <View style={gStyle.container}>
            {toggleTabBar ? (
                <View
                    // intensity={99}
                    style={{ ...StyleSheet.absoluteFill, zIndex: 101 }}
                    // tint="dark"
                />
            ) : null}

            <View style={styles.containerHeader}>
                <Animated.View
                    style={[styles.headerLinear, { opacity: opacityHeading }]}
                >
                    <LinearGradient fill={album.backgroundColor} height={89} />
                </Animated.View>
                <View style={styles.header}>
                    <TouchIcon
                        icon={
                            <Feather color={colors.white} name="chevron-left" />
                        }
                        onPress={() => navigation.goBack()}
                    />
                    <Animated.View style={{ opacity: opacityShuffle }}>
                        <Text style={styles.headerTitle}>{album.title}</Text>
                    </Animated.View>
                    <TouchIcon
                        icon={
                            <Feather
                                color={colors.white}
                                name="more-horizontal"
                            />
                        }
                        onPress={() => {
                            // setToggleTabBar();

                            navigation.navigate('ModalMoreOptions', {
                                album
                            });
                        }}
                    />
                </View>
            </View>

            <View style={styles.containerFixed}>
                <View style={styles.containerLinear}>
                    <LinearGradient fill={album.backgroundColor} />
                </View>
                <View style={styles.containerImage}>
                    <Image source={images[album.image]} style={styles.image} />
                </View>
                <View style={styles.containerTitle}>
                    <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={styles.title}
                    >
                        {album.title}
                    </Text>
                </View>
                <View style={styles.containerAlbum}>
                    <Text style={styles.albumInfo}>
                        {`Album by ${album.artist} · ${album.released}`}
                    </Text>
                </View>
            </View>

            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={stickyArray}
                style={styles.containerScroll}
            >
                <View style={styles.containerSticky}>
                    <Animated.View
                        style={[
                            styles.containerStickyLinear,
                            { opacity: opacityShuffle }
                        ]}
                    >
                        <LinearGradient fill={colors.black20} height={50} />
                    </Animated.View>
                    <View style={styles.containerShuffle}>
                        <TouchText
                            onPress={() => null}
                            style={styles.btn}
                            styleText={styles.btnText}
                            text="Shuffle Play"
                        />
                    </View>
                </View>
                <View style={styles.containerSongs}>
                    <View style={styles.row}>
                        <Text style={styles.downloadText}>
                            {downloaded ? 'Downloaded' : 'Download'}
                        </Text>
                        <Switch
                            trackColor={colors.greySwitchBorder}
                            onValueChange={(val) => toggleDownloaded(val)}
                            value={downloaded}
                        />
                    </View>

                    {album.tracks &&
                        album.tracks.map((track, index) => (
                            <LineItemSong
                                active={song === track.title}
                                downloaded={downloaded}
                                key={index.toString()}
                                onPress={changeSong}
                                songData={{
                                    album: album.title,
                                    artist: album.artist,
                                    image: album.image,
                                    length: track.seconds,
                                    title: track.title
                                }}
                            />
                        ))}
                </View>
                <View style={gStyle.spacer16} />
            </Animated.ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    containerHeader: {
        height: 89,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 100
    },
    headerLinear: {
        height: 89,
        width: '100%'
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: device.iPhoneNotch ? 48 : 24,
        position: 'absolute',
        top: 0,
        width: '100%'
    },
    headerTitle: {
        ...gStyle.textSpotifyBold16,
        color: colors.white,
        paddingHorizontal: 8,
        marginTop: 2,
        textAlign: 'center',
        width: device.width - 100
    },
    containerFixed: {
        alignItems: 'center',
        paddingTop: device.iPhoneNotch ? 94 : 60,
        position: 'absolute',
        width: '100%'
    },
    containerLinear: {
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: device.web ? 5 : 0
    },
    containerImage: {
        shadowColor: colors.black,
        shadowOffset: { height: 8, width: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        zIndex: device.web ? 20 : 0
    },
    image: {
        height: 148,
        marginBottom: device.web ? 0 : 16,
        width: 148
    },
    containerTitle: {
        marginTop: device.web ? 8 : 0,
        zIndex: device.web ? 20 : 0
    },
    title: {
        ...gStyle.textSpotifyBold20,
        color: colors.white,
        paddingHorizontal: 24,
        marginBottom: 8,
        textAlign: 'center'
    },
    containerAlbum: {
        zIndex: device.web ? 20 : 0
    },
    albumInfo: {
        ...gStyle.textSpotify12,
        color: colors.greyInactive,
        marginBottom: 48
    },
    containerScroll: {
        paddingTop: 89
    },
    containerSticky: {
        marginTop: device.iPhoneNotch ? 238 : 194
    },
    containerShuffle: {
        alignItems: 'center',
        height: 50,
        shadowColor: colors.blackBg,
        shadowOffset: { height: -10, width: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 20
    },
    containerStickyLinear: {
        top: 0,
        position: 'absolute',
        width: '100%'
    },
    btn: {
        backgroundColor: colors.brandPrimary,
        borderRadius: 25,
        height: 50,
        width: 220
    },
    btnText: {
        ...gStyle.textSpotifyBold16,
        color: colors.white,
        letterSpacing: 1,
        textTransform: 'uppercase'
    },
    containerSongs: {
        alignItems: 'center',
        backgroundColor: colors.blackBg,
        minHeight: 540
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        width: '100%'
    },
    downloadText: {
        ...gStyle.textSpotifyBold18,
        color: colors.white
    }
});
