import { useState } from 'react'
import { requestPermission, onMessageListener } from './firebase'
import { type MessagePayload } from 'firebase/messaging'
import ProtestList from './components/protest/ProtestList'

function App() {
  const [permissionRequested, setPermissionRequested] = useState(false)

  const handleNotificationClick = async () => {
    const token = await requestPermission()
    if (token) {
      setPermissionRequested(true)

      // 푸시 알림 수신 리스너 등록 (포그라운드)
      onMessageListener().then((payload: MessagePayload) => {
        const title = payload.notification?.title || payload.data?.title
        const body = payload.notification?.body || payload.data?.body

        if (title && body) {
          alert(`📢 ${title}\n${body}`)
        } else {
          console.warn('알림 데이터 누락:', payload)
        }
      })
    }
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        RallyOn ✊
      </h1>

      {!permissionRequested && (
        <div className="flex justify-center mb-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={handleNotificationClick}
          >
            🔔 알림 권한 요청하기
          </button>
        </div>
      )}

      <ProtestList />
    </div>
  )
}

export default App
