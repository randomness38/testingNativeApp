import React from 'react';
import {View, Text, Button } from 'react-native'
import { Field } from 'redux-form';

import RenderField from './RenderField'

export default RenderOpts = ({ fields, meta: { touched, error, submitFailed } }) => {
    return (
        <View>
            <View>
                <Button
                    type="button"
                    onPress={() => fields.push()}
                    title='Add Incorrect Opt'
                />
            </View>
            {fields.map((opt, index) => (
                <View key={index}>
                    <Button
                        type="button"
                        title="Remove Opt"
                        onPress={() => fields.remove(index)}
                    />
                    <Field
                        name={opt}
                        type="text"
                        component={RenderField}
                        label={`Incorrect Opt #${index + 1}`}
                    />
                </View>
            ))}
            {(touched || submitFailed) && error && <Text  style={{ color: 'red' }}>{error}</Text>}
        </View>
    )
}
