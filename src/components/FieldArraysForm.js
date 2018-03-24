import React from 'react';
import {View, Text, ScrollView, TextInput, Button } from 'react-native'
import { Field, FieldArray, reduxForm } from 'redux-form';
import validate from "../util/validate";
import RemoteSubmitButton from "../util/RemoteSubmitButton";
import RenderField from "./RenderField"

// const renderField = ({ input, label, type, meta: { touched, error } }) => (
//     <View>
//         <Text style={{fontSize:20}}>{label}</Text>
//         <TextInput style={{fontSize:20}} {...input} type={type} placeholder={label} />
//             {touched && error && <Text style={{ color: 'red' }}>{error}</Text>}
//     </View>
// );

const renderOpts = ({ fields, meta: { touched, error, submitFailed } }) => (
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
        {/*{error && <View  style={{ color: 'red' }}>{error}</View>}*/}
        {(touched || submitFailed) && error && <Text  style={{ color: 'red' }}>{error}</Text>}
    </View>
);

const renderCards = ({ fields, meta: { touched, error, submitFailed } }) => (
    <View>
        <View>
            <Button onPress={() => fields.push({})} title='Add Card'/>
            {(touched || submitFailed) && error && <Text  style={{ color: 'red' }}>{error}</Text>}
        </View>
        {fields.map((card, index) => (
            <View key={index}>
                <Button
                    type="button"
                    title="Remove Card"
                    onPress={() => fields.remove(index)}
                />
                <Text>Card #{index + 1}</Text>
                <Field
                    name={`${card}.question`}
                    type="text"
                    component={RenderField}
                    label="Question"
                />
                <Field
                    name={`${card}.answer`}
                    type="text"
                    component={RenderField}
                    label="Answer"
                />
                <FieldArray name={`${card}.opts`} component={renderOpts} />
            </View>
        ))}
    </View>
);

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
            <FieldArray name="cards" component={renderCards} />
            <View>
                <RemoteSubmitButton/>
                {/*<Button type="submit" disabled={submitting} title='Submit' />*/}
                <Button type="button" disabled={pristine || submitting} onPress={reset} title='Clear Values' />
            </View>
        </ScrollView>
    );
};

export default reduxForm({
    form: 'deckForm', // a unique identifier for this form
    validate,
})(FieldArraysForm);
