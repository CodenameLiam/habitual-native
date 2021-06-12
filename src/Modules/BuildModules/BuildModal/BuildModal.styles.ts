import styled from '@emotion/native';

export const BuildModalContainer = styled.View`
    height: 100%;
    justify-content: flex-end;
`;

interface BuildModalContentProps {
    height: string;
}

export const BuildModalContent = styled.View<BuildModalContentProps>`
    background-color: ${props => props.theme.card};
    height: ${props => props.height};
    border-radius: 30px 30px 0px 0px;
    padding: 15px;
`;

export const BuildModalHeader = styled.View`
    background-color: ${props => props.theme.card};
    position: absolute;
    z-index: 1;
    top: 10px;
    left: 20px;
    right: 20px;
    height: 20px;
`;

export const BuildModalHandle = styled.View`
    background-color: ${props => props.theme.grey};
    align-self: center;
    border-radius: 5px;
    height: 5px;
    width: 50px;
`;
