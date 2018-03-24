import React from 'react';
import {View, Text, ScrollView, TextInput, Button } from 'react-native'
import { Field, FieldArray, reduxForm } from 'redux-form';
import validate from "../util/validate";
import RemoteSubmitButton from "../util/RemoteSubmitButton";
import RenderField from "./RenderField"
import RenderCards from "./RenderCards"



const FieldArraysForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <ScrollView onSubmit={handleSubmit}>
            <Field
                name="deckTitle"
                type="text"
                component={RenderField}
                label="Deck Title"
            />
            <FieldArray name="cards" component={RenderCards} />
            <View>
                <RemoteSubmitButton/>
                <Button type="button" disabled={pristine || submitting} onPress={reset} title='Clear Values' />
            </View>
        </ScrollView>
    );
};

export default reduxForm({
    form: 'deckForm', // a unique identifier for this form
    validate,
})(FieldArraysForm);
