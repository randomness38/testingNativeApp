import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { View, Button,StyleSheet } from 'react-native';
import configureStore from './src/store/configureStore'
import t from 'tcomb-form-native';

const store = configureStore()

const Form = t.form.Form;

const formStyles = {
    ...Form.stylesheet,
    formGroup: {
        normal: {
            marginBottom: 10,
        },
    },
    controlLabel: {
        normal: {
            color: '#292477',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        },
        error: {
            color: 'red',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        }
    },
    buttonText: {
        fontSize: 20,
        color: "white",
        alignSelf: "center"
    },
    button: {
        // flex:1,
        height: 40,
        backgroundColor: '#292477',
        borderColor: '#4e4cb8',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: "stretch",
        justifyContent: "center"
    }
}

// 2번 후보
const objectiveItem = t.struct({
    incorrectAnswer: t.String,
});

const Card = t.struct({
    question: t.String,
    answer: t.String,
    incorrectAnswers: t.list(objectiveItem)
});




// 1번 후보
// const Card = t.struct({
//     question: t.String,
//     answer: t.String,
//     quizOptions: t.Struct({
//         option1: t.String,
//         option2: t.String,
//         option3: t.String,
//         option4: t.String,
//     })
// });
//
//

// const options = {
//     fields: {
//         terms: {
//             label: 'Agree to Terms',
//         },
//     },
// };
const options = {
    fields: {
            question: {
                label: 'Question',
                placeholder: 'enter your question'
            },
            answer: {
                label: 'Answer',
                placeholder: 'enter your answer'
            },
            incorrectAnswers: {
                item: {
                    fields: {
                        incorrectAnswer: {
                            label: 'Incorrect Answer',
                            placeholder: 'enter incorrect Answer'
                        }
                    }
                }
            },
        },
        stylesheet: formStyles,
}
// const options = {
//     fields: { // <= Person options
//         question: {
//             label: 'question label'
//         },
//         answer: {
//             label: 'answer label'
//         },
//         quizOptions: {
//             fields: {
//                 option1: {
//                     label: 'My option1 label'
//                 },
//                 option2: {
//                     label: 'My option2 label'
//                 },
//                 option3: {
//                     label: 'My option3 label'
//                 },
//                 option4: {
//                     label: 'My option4 label'
//                 }
//             }
//         }
//     }
// }

export default class App extends React.Component {
    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        console.log('value: ', value);
        // 오답 Value 좌표 : 졸라 말도 안되게 타고 들어가야 하는데여
        console.log('오답 Value 좌표 : ' + value.incorrectAnswers[0].incorrectAnswer);
        console.log('오답 개수 length : ' + value.incorrectAnswers.length);

        //옵션 배열 (보기 + 답)
        const optionArray = []
        value.incorrectAnswers.map((key) => {
            optionArray.push(key.incorrectAnswer)
        })
        optionArray.push(value.answer)

        // 랜덤으로 하나 뽑는 로직
        var randomArray = optionArray[Math.floor(Math.random()*optionArray.length)];
        // getRandomArray
        function getRandomArray(arr){
            return arr.sort( function() { return 0.5 - Math.random() } );
        }
        console.log('무엇을 map 돌려야 하니 : ' + Object.keys(value.incorrectAnswers)); // 0, 1, 2
        console.log('answer + 오답 Array : ' + optionArray);
        console.log('answer + 오답 RanDom Array : ' + getRandomArray(optionArray));
        const card = {
            question: 'testing',
            answer: 'testing'
        }
    }

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <View style={styles.container}>
                        <Form
                            ref={c => this._form = c} // assign a ref
                            type={Card}
                            options={options}
                        />
                        <Button
                            title="SAVE"
                            onPress={this.handleSubmit}
                        />
                        <Button
                            title="GO HOME"
                            onPress={this.handleSubmit}
                        />
                    </View>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
});

