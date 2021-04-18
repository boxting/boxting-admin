import boxtingTheme from '../../theme/theme';

export interface ButtonStyle {
    backgroundColor: string;
    fontColor: string;
    onHover: string;
    onHoverText: string;
}

export enum ButtonType {
    primary,
    secondary,
    outline,
    alert
}

export const buttonStyles: Map<ButtonType, ButtonStyle> = new Map([
    [
        ButtonType.primary,
        {
            backgroundColor: boxtingTheme.colors.primary,
            fontColor: boxtingTheme.colors.background,
            onHover: boxtingTheme.colors.primaryHover,
            onHoverText: boxtingTheme.colors.background,
        },
    ],
    [
        ButtonType.secondary,
        {
            backgroundColor: boxtingTheme.colors.secondary[900],
            fontColor: boxtingTheme.colors.lightText[800],
            onHover: boxtingTheme.colors.secondary[700],
            onHoverText: boxtingTheme.colors.lightText[800],
        },
    ],
    [
        ButtonType.outline,
        {
            backgroundColor: `white`,
            fontColor: boxtingTheme.colors.text,
            onHover: boxtingTheme.colors.lightBackground[200],
            onHoverText: boxtingTheme.colors.text,
        },
    ],
    [
        ButtonType.alert,
        {
            backgroundColor: boxtingTheme.colors.red[500],
            fontColor: boxtingTheme.colors.background,
            onHover: boxtingTheme.colors.red[600],
            onHoverText: boxtingTheme.colors.background,
        },
    ],
]);
