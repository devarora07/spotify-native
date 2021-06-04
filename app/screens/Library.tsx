import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { device, gStyle } from '../constants';
import LineItemCategory from '../components/LineItemCategory';
import ScreenHeader from '../components/ScreenHeader';
import yourLibrary from '../mockdata/menuYourLibrary.json';

export const Library = () => (
    <View style={gStyle.container}>
        <View
            style={{ position: 'absolute', top: 0, width: '100%', zIndex: 10 }}
        >
            <ScreenHeader title="Your Library" navigation={{}} />
        </View>

        <FlatList
            contentContainerStyle={styles.containerFlatlist}
            data={yourLibrary}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => (
                <LineItemCategory
                    icon={item.icon}
                    onPress={() => null}
                    title={item.title}
                />
            )}
        />
    </View>
);

const styles = StyleSheet.create({
    containerFlatlist: {
        marginTop: device.iPhoneNotch ? 88 : 64
    }
});
