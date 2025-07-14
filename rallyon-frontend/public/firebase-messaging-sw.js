// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js")

firebase.initializeApp({
  apiKey: "AIzaSyD6U9UOgvT1LjiscHuUl-ZPf-BmRAXEask",
  authDomain: "rallyon-ef1b2.firebaseapp.com",
  projectId: "rallyon-ef1b2",  
  messagingSenderId: "649223183733",
  appId: "1:649223183733:web:0146997e4a94e5a744473c"
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Received background message ", payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png"
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
