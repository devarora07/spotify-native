import React, { useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors, device, gStyle } from '../constants';
import AlbumsHorizontal from '../components/AlbumsHorizontal';
import heavyRotation from '../mockdata/heavyRotation.json';
import jumpBackIn from '../mockdata/jumpBackIn.json';
import recentlyPlayed from '../mockdata/recentlyPlayed.json';
import animeTrending from '../mockdata/trendingAnime.json';

export const Home = () => {
    const [state, setState] = useState({ scrollY: new Animated.Value(0) });

    const { scrollY } = state;

    const opacityIn = scrollY.interpolate({
        inputRange: [0, 128],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });

    const opacityOut = scrollY.interpolate({
        inputRange: [0, 88],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    });

    return (
        <React.Fragment>
            {device.iPhoneNotch && (
                <Animated.View
                    style={[styles.iPhoneNotch, { opacity: opacityIn }]}
                />
            )}

            <Animated.View
                style={[styles.containerHeader, { opacity: opacityOut }]}
            >
                <FontAwesome color={colors.white} name="cog" size={28} />
            </Animated.View>

            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                style={gStyle.container}
            >
                <View style={gStyle.spacer16} />

                <AlbumsHorizontal data={animeTrending} heading="Trending" />
                <AlbumsHorizontal
                    data={recentlyPlayed}
                    heading="Recently played"
                />

                <AlbumsHorizontal
                    data={heavyRotation}
                    heading="Your heavy rotation"
                    tagline="The music you've had on repeat this month."
                />

                <AlbumsHorizontal
                    data={jumpBackIn}
                    heading="Jump back in"
                    tagline="Your top listens from the past few months."
                />
            </Animated.ScrollView>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    iPhoneNotch: {
        backgroundColor: colors.black70,
        height: 44,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 20
    },
    containerHeader: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
        paddingTop: device.iPhoneNotch ? 60 : 36,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 10
    }
});
