import styled from '@emotion/native';
import { fontFamily } from 'Styles/Fonts';

interface ProgressInputProps {
    colour: string;
}

export const ProgressText = styled.Text<ProgressInputProps>`
    color: ${props => props.colour};
    text-align: center;
    font-family: ${fontFamily};
    font-weight: 800;
    font-size: 20px;
`;

export const ProgressTimeInput = styled.TouchableOpacity`
    flex: 1;
    background-color: ${props => props.theme.background};
    border-radius: 5px;
    display: flex;
    justify-content: center;
`;
