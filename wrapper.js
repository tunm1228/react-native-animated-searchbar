import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './header';
import Searchbar from './searchbar';

const Wrapper = ({
    backgroundColor,
    animationDuration,
    headerRight,
    headerLeft,
    title,
    cancelText,
    cancelTextStyle,
    cancelTextMarginRight,
    placeholder,
    searchbarStyle,
    placeholderTextColor,
    onPressCancel,
    onFocus,
    onChangeText,
    headerHeight, // Header height without searchbar
    searchBarIcon,
    children
}) => {
    const header = useRef();
    const searchbar = useRef();
    const [dimensions, setDimensions] = useState({
        fullHeaderHeight: undefined,
        searchbarHeight: undefined
    });

    const open = useCallback(() => {
        onPressCancel && onPressCancel();
        header.current.close();
        searchbar.current.open();
    }, [header, searchbar]);

    const close = useCallback(() => {
        onFocus && onFocus();
        header.current.open();
        searchbar.current.close();
    }, [header, searchbar])

    const onLayoutFullHeader = useCallback(event => {
        const { fullHeaderHeight } = dimensions;
        const { height } = event.nativeEvent.layout;
        if (fullHeaderHeight && fullHeaderHeight >= height) return // layout was already called

        setDimensions({ ...dimensions, fullHeaderHeight: height });
    }, [dimensions, setDimensions])

    const onLayoutSearchBar = useCallback(event => {
        const { searchbarHeight } = dimensions;
        const { height } = event.nativeEvent.layout;
        if (searchbarHeight && searchbarHeight >= height) return // layout was already called
        setDimensions({ ...dimensions, searchbarHeight: height });
    }, [dimensions, setDimensions])
    return (
        <View style={styles.container}>
            <View onLayout={onLayoutFullHeader}>
                <Header
                    ref={header}
                    title={title}
                    duration={animationDuration}
                    backgroundColor={backgroundColor}
                    right={headerRight}
                    left={headerLeft}
                    height={headerHeight}
                />
                <Searchbar
                    ref={searchbar}
                    onFocus={open}
                    onCancel={close}
                    backgroundColor={backgroundColor}
                    duration={animationDuration}
                    placeholder={placeholder}
                    cancelText={cancelText}
                    cancelTextStyle={cancelTextStyle}
                    searchbarStyle={searchbarStyle}
                    placeholderTextColor={placeholderTextColor}
                    marginRight={cancelTextMarginRight}
                    onLayout={onLayoutSearchBar}
                    onChangeText={onChangeText}
                    searchBarIcon={searchBarIcon}
                />
            </View>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

Wrapper.defaultProps = {
    backgroundColor: '#191919',
    animationDuration: 150,
    title: 'Title',
    placeholder: 'Search...',
    cancelText: 'Cancel',
    cancelTextMarginRight: 20,
    headerHeight: 50
}

export default Wrapper;
