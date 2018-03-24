import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { View, StyleSheet,Text } from 'react-native';
import FieldArraysForm from "./src/components/FieldArraysForm";
import store from "./src/store/store";
// import showResults from "./showResults"

const handleSubmit = values => {

    console.log(values)
};

export default class App extends React.Component {

        render() {

            return (
                <Provider store={store}>
                    <View style={styles.container}>
                        <FieldArraysForm onSubmit={handleSubmit} />
                    </View>
                </Provider>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems:'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
});

