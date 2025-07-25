import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import {useState} from 'react'
import {onMessageListener, requestPermission} from './firebase'
import {type MessagePayload} from 'firebase/messaging'
import ProtestList from './components/protest/ProtestList'
import ProtestForm from './components/protest/ProtestForm'

function App() {
    const [permissionRequested, setPermissionRequested] = useState(false)

    const handleNotificationClick = async () => {
        const token = await requestPermission()
        if (token) {
            setPermissionRequested(true)

            onMessageListener().then((payload: MessagePayload) => {
                const title = payload.notification?.title || payload.data?.title
                const body = payload.notification?.body || payload.data?.body

                if (title && body) {
                    alert(`📢 ${title}\n${body}`)
                }
            })
        }
    }

    return (
        <BrowserRouter>
            <div className="p-4 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
                    RallyOn ✊
                </h1>

                <nav className="flex justify-center gap-4 mb-6">
                    <Link to="/" className="text-blue-600 hover:underline">시위 목록</Link>
                    <Link to="/schedule/new" className="text-green-600 hover:underline">일정 등록</Link>
                </nav>

                <Routes>
                    <Route path="/" element={
                        <>
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
                            <ProtestList/>
                        </>
                    }/>
                    <Route path="/schedule/new" element={<ProtestForm/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
