import { createTheming } from '@callstack/react-theme-provider';
import { ms } from 'react-native-size-matters';
import { Color } from './color';

export const defaultTheme = {
    roundness: ms(16),
    color: Color,
    buttonHeight: {
        small: ms(40),
        normal: ms(48),
    },
    inputHeight: ms(56),
    navbarHeight: ms(56),
    screenInset: ms(20),
    // Spacing size.
    size: {
        sm: ms(4),
        md: ms(8),
        lg: ms(16),
        xl: ms(32),
        '2xl': ms(64),
    },
    // Text size.
    text: {
        h1: ms(28),
        h2: ms(24),
        h3: ms(20),
        title: ms(16),
        body: ms(14),
        label: ms(12),
        footer: ms(10),
    },
    // Font family.
    font: {
        bold: 'ProximaNova-Bold',
        semibold: 'ProximaNova-Semibold',
        medium: 'ProximaNova-Medium',
        normal: 'ProximaNova-Regular',
        light: 'ProximaNova-Light',
    },
};

const { ThemeProvider, useTheme } = createTheming(defaultTheme);
export { ThemeProvider, useTheme };

export const ThemeType = typeof defaultTheme;
