import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
const DECK_STORAGE_KEY = 'flashCards:deck'
const NOTIFICATION_KEY = 'flashCards:notifications'


function setDummyData () {

    let dummyData = {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        }
    }

    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData))

    return dummyData
}

export function formatDeckResults (results) {
    // 아직 mergeItem 안해서 getItem 할 data 가 없으면
    return results === null
        ? setDummyData()
        : JSON.parse(results)
}

// asyncStorage 안쓰고 Redux 만 사용해서 데이터 처리하면
// notification 이랑 permission 어떻게 처리하지
export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
    return {
        title: 'Keep Going!',
        body: "👋 don't forget to study today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}
