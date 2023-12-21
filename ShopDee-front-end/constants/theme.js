import { Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window')

export const COLORS = {
    black: "#3C3C3C",
    // gray: "#F5F5F5",
    gray: "#E3E3E3",
    white: "#FFFFFF",
    red: "#EE4B2B",
    blue: "#007EA7"
}

export const SIZES = {
    // global SIZES
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,
    padding3: 16,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 20,
    h3: 18,
    h4: 16,
    body1: 30,
    body2: 20,
    body3: 18,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height,
}

export const FONTS = {
    largeTitle: {
        fontFamily: 'black',
        fontSize: SIZES.largeTitle,
        lineHeight: 55,
    },
    h1: { fontWeight: 'bold', fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontWeight: 'bold', fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontWeight: 'bold', fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontWeight: 'bold', fontSize: SIZES.h4, lineHeight: 20 },
    body1: { fontWeight: 'regular', fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontWeight: 'regular', fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontWeight: 'regular', fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontWeight: 'regular', fontSize: SIZES.body4, lineHeight: 20 },
}

const appTheme = { COLORS, SIZES, FONTS }

export default appTheme