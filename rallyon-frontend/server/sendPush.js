// ✅ import 문법 사용
import { GoogleAuth } from 'google-auth-library'
import axios from 'axios'
import fs from 'fs'

// ✅ 서비스 계정 키 동적 import
const key = JSON.parse(fs.readFileSync('./rallyon-ef1b2-ed314d8fbd6a.json', 'utf-8'))

const SCOPES = ['https://www.googleapis.com/auth/firebase.messaging']
const auth = new GoogleAuth({
  credentials: key,
  scopes: SCOPES,
})

async function sendPush() {
  const accessToken = await auth.getAccessToken()
  const projectId = key.project_id
  const fcmEndpoint = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`

  const targetToken = 'coF4DTmWmJh8Ktk6hnc5na:APA91bFm_hKVSIIFeN6l9oEQwYMTqnhYxQplyO-FiElkMssUA0cD19G9u_4dd6uEWbM4PiaS41u2e6udheGMviBz6ckhm9K-o7UtOXQ4HbWr5IUq72kahgM'

  const message = {
    message: {
      token: targetToken,
      notification: {
        title: 'RallyOn 알림',
        body: '내일 오전 11시 여의도 집회가 예정되어 있습니다.',
      },
    },
  }

  try {
    const response = await axios.post(fcmEndpoint, message, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
    console.log('✅ 메시지 전송 성공:', response.data)
  } catch (error) {
    console.error('❌ 메시지 전송 실패:', error.response?.data || error.message)
  }
}

sendPush()
