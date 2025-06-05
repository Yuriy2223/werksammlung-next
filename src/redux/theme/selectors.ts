import { ThemeType } from '../../styles/Theme';
import { RootState } from '../store';

export const selectTheme = (state: RootState): ThemeType => state.theme.theme;
