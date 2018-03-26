import React from 'react';
import {View, Text, Button } from 'react-native'
import { Field, FieldArray } from 'redux-form';

import RenderField from './RenderField'
import RenderOpts from './RenderOpts'

export default RenderCard = ( props ) => {
    return (
        <View>
            {/*<View>*/}
                {/*<Button onPress={() => fields.push({})} title='Add Card'/>*/}
                {/*{(touched || submitFailed) && error && <Text  style={{ color: 'red' }}>{error}</Text>}*/}
            {/*</View>*/}
            {/*{fields.map((card, index) => (*/}
                <View>
                    <Button
                        type="button"
                        title="Remove Card"
                        // onPress={() => fields.remove(index)}
                    />
                    <Field
                        name={`question`}
                        type="text"
                        component={RenderField}
                        label="Question"
                    />
                    <Field
                        name={`answer`}
                        type="text"
                        component={RenderField}
                        label="Answer"
                    />
                    <FieldArray name={`opts`} component={RenderOpts} />
                </View>
            // ))}
        </View>
    )
}
