import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors, device, gStyle } from '../constants';
import { togglePlayback } from '../player';
import { State } from 'react-native-track-player';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export const BarMusicPlayer = () => {
    const navigation = useNavigation();
    const [favourite, setFavourite] = useState(false);
    const [paused, setPaused] = useState(true);

    const song = useSelector((state) => state.song);

    const toggleFavorite = () => {
        setFavourite(!favourite);
    };

    const togglePlay = async () => {
        setPaused(!paused);
        await togglePlayback(paused ? State.Paused : State.Playing);
    };

    const favoriteColor = favourite ? colors.brandPrimary : colors.white;
    const favoriteIcon = favourite ? 'heart' : 'heart-o';
    const iconPlay = paused ? 'play-circle' : 'pause-circle';

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
                {song && (
                    <View>
                        <View style={styles.containerSong}>
                            <Text
                                style={styles.title}
                            >{`${song.title} · `}</Text>
                            <Text style={styles.artist}>{song.artist}</Text>
                        </View>
                        <View style={[gStyle.flexRowCenter, gStyle.mTHalf]}>
                            <FontAwesome
                                color={colors.brandPrimary}
                                name="bluetooth-b"
                                size={14}
                            />
                            <Text style={styles.device}>
                                Caleb&apos;s Beatsx
                            </Text>
                        </View>
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

BarMusicPlayer.defaultProps = {
    song: null
};

BarMusicPlayer.propTypes = {
    // required
    // navigation: PropTypes.object.isRequired,

    // optional
    song: PropTypes.shape({
        artist: PropTypes.string,
        title: PropTypes.string
    })
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
