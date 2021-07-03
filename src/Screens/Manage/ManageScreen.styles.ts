import styled from '@emotion/native';

interface ContainerProps {
    colour?: string;
}

export const Container = styled.View<ContainerProps>`
    background-color: ${props => props.colour ?? props.theme.card};
    height: 70px;
    border-radius: 10px;
    /* overflow: hidden; */
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 5px;
`;

export const CenterContainer = styled.TouchableOpacity`
    flex: 1;
    height: 100%;
    flex-direction: row;
    align-items: center;
`;

export const ManageButton = styled.TouchableOpacity`
    height: 70px;
    width: 70px;
    justify-content: center;
    align-items: center;
`;
