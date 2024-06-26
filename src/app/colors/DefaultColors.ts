import { stripUnsafeCharacters } from "../helpers";
import { ColorScheme } from "./ColorScheme";

const _internalColors: ColorScheme[] = [
    new ColorScheme(
        "Default",
        "#3866af",
        "#ffebb5",
        false
    ),
    new ColorScheme(
        "Solarized Dark",
        "#073642",
        "#c0c4c4",
        false
    ),
    new ColorScheme(
        "Solarized Light",
        "#eee8d5",
        "#3b4d53",
        false
    ),
    new ColorScheme(
        "Amber CRT",
        "#1c1c1c",
        "#ff7300",
        true
    ),
    new ColorScheme(
        "Green CRT",
        "#1c1c1c",
        "#03ff05",
        true
    ),
    new ColorScheme(
        "Hot Dog Stand",
        "#fdfc00",
        "#ff0000",
        false
    ),
    new ColorScheme(
        "OutRun",
        "#1e023b",
        "#ff00de",
        true
    ),
    new ColorScheme(
        "Please let my eyes have a break",
        "#ffffff",
        "#000000",
        false
    ),
    new ColorScheme(
        "Please let my eyes have a break (but in dark mode)",
        "#000000",
        "#ffffff",
        false
    ),
];

export const DefaultColorsMap: Map<string, ColorScheme> =  new Map(_internalColors.map(scheme => [stripUnsafeCharacters(scheme.name), scheme]));