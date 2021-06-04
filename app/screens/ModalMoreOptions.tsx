import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    TouchableWithoutFeedback,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Image
} from 'react-native';
import { device, gStyle, images, colors, fonts } from '../constants';
import LineItemCategory from '../components/LineItemCategory';
import moreOptions from '../mockdata/menuMoreOptions.json';

export const ModalMoreOptions = ({
    navigation,
    screenProps: { setToggleTabBar }
}) => {
    const album = navigation.getParam('album');

    return (
        <React.Fragment>
            <SafeAreaView style={styles.containerSafeArea}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        navigation.goBack();
                        setToggleTabBar();
                    }}
                >
                    <View style={styles.containerButton}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>

            <ScrollView
                contentContainerStyle={[gStyle.flex1, gStyle.pB80]}
                showsVerticalScrollIndicator={false}
                style={[gStyle.container, { backgroundColor: 'transparent' }]}
            >
                <View style={styles.container}>
                    <View style={styles.containerImage}>
                        <Image
                            source={images[album.image]}
                            style={styles.image}
                        />
                    </View>
                    <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={styles.title}
                    >
                        {album.title}
                    </Text>
                    <Text style={styles.albumInfo}>
                        {`Album by ${album.artist} · ${album.released}`}
                    </Text>
                </View>

                {Object.keys(moreOptions).map((index) => {
                    const item = moreOptions[index];

                    return (
                        <LineItemCategory
                            key={item.id}
                            disableRightSide
                            icon={item.icon}
                            iconLibrary={item.lib}
                            onPress={() => null}
                            title={item.title}
                        />
                    );
                })}
            </ScrollView>
        </React.Fragment>
    );
};

ModalMoreOptions.propTypes = {
    // required
    navigation: PropTypes.object.isRequired,
    screenProps: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    containerSafeArea: {
        ...gStyle.containerAbsolute,
        backgroundColor: colors.blackBlur
    },
    containerButton: {
        ...gStyle.flexCenter,
        ...gStyle.spacer6
    },
    buttonText: {
        color: colors.white,
        fontSize: 18
    },
    container: {
        paddingTop: device.iPhoneNotch ? 94 : 50,
        alignItems: 'center'
    },
    containerImage: {
        shadowColor: colors.black,
        shadowOffset: { height: 8, width: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 6
    },
    image: {
        height: 148,
        marginBottom: 16,
        width: 148
    },
    title: {
        color: colors.white,
        fontFamily: fonts.spotifyBold,
        fontSize: 20,
        paddingHorizontal: 24,
        marginBottom: 8,
        textAlign: 'center'
    },
    albumInfo: {
        color: colors.greyInactive,
        fontFamily: fonts.spotifyRegular,
        fontSize: 12,
        marginBottom: 48
    }
});
