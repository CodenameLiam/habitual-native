import Card from 'Components/Card/Card';
import React, { Dispatch, FC } from 'react';
import { BuildAction, buildActions } from 'Reducers/BuildReducer/BuildReducer.actions';
import { StyledBuildInput } from './BuildInput.styles';

interface BuildInputProps {
    value: string;
    colour: string;
    placeholderColour: string;
    dispatchBuild: Dispatch<BuildAction>;
}

const BuildInput: FC<BuildInputProps> = ({ value, colour, placeholderColour, dispatchBuild }) => {
    return (
        <Card style={{ marginLeft: 0, flex: 1, marginRight: 12 }}>
            <StyledBuildInput
                colour={colour}
                placeholder="Name"
                placeholderTextColor={placeholderColour}
                returnKeyType="done"
                onChangeText={name => dispatchBuild(buildActions.name(name))}
                value={value}
            />
        </Card>
    );
};

export default BuildInput;
