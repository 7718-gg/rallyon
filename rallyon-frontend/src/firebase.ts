import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage, type MessagePayload } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: "AIzaSyD6U9UOgvT1LjiscHuUl-ZPf-BmRAXEask",
  authDomain: "rallyon-ef1b2.firebaseapp.com",
  projectId: "rallyon-ef1b2",
  storageBucket: "rallyon-ef1b2.firebasestorage.app",
  messagingSenderId: "649223183733",
  appId: "1:649223183733:web:0146997e4a94e5a744473c",
  measurementId: "G-PY9B3F9BYB"
}

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

export const requestPermission = async () => {
  console.log('Requesting permission...')
  const permission = await Notification.requestPermission()
  if (permission === 'granted') {
    console.log('Notification permission granted.')

    try {
      const token = await getToken(messaging, {
        vapidKey: 'BHB_I5oIdCfqoFZIfJJ-DAXab96K32xcGJ5-PngDjFRoOs7Qfgtwtz2t1CiWMI7V5auuh0wCqW_w37M52SOjO6s'
      })
      console.log('푸시 토큰:', token)
      return token
    } catch (error) {
      console.error('푸시 토큰 가져오기 실패:', error)
    }
  } else {
    console.warn('Notification permission denied.')
  }
}

export const onMessageListener = (): Promise<MessagePayload> =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload)
    })
  })
