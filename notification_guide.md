# Notification System Guide — Wedding Invitation

## How Current Notifications Work

Your invitation uses **browser-native notifications** — zero backend, zero cost.

### Flow
1. User clicks **"Notify Me"** → browser asks for notification permission
2. If granted → reminders are scheduled via `setTimeout` in JavaScript
3. A **Service Worker** (`sw.js`) keeps notifications alive even if the tab is closed
4. Reminders fire at: **1 week**, **1 day**, and **1 hour** before the Nikah

### Limitations
| Limitation | Impact |
|---|---|
| User must keep browser/tab open | If browser is fully closed, `setTimeout` won't fire |
| No cross-device sync | Each device must subscribe separately |
| No admin dashboard | You can't see who subscribed |
| Service Worker lifecycle | Browser may kill SW after ~5 minutes of inactivity |

---

## Free-Tier Backend Options

### Option A: Firebase Cloud Messaging (FCM) — **Recommended** ✅

**Cost**: Completely free (unlimited messages)

**How it works**:
1. User clicks "Notify Me" → browser generates a **push token**
2. Token is saved to **Firebase Firestore** (free tier: 1GB storage)
3. You use **Firebase Cloud Functions** to schedule notifications at your set times
4. FCM sends push notifications to all subscribed browsers, **even when closed**

**What you need**:
- Google account → [Firebase Console](https://console.firebase.google.com)
- Add Firebase SDK to your project (~3 lines of code)
- Create a Cloud Function for scheduling (I can write this for you)

**Free tier limits**: 125K push notifications/month, 1GB Firestore

---

### Option B: Supabase

**Cost**: Free tier available

**How it works**:
- Store subscriber tokens in a Supabase PostgreSQL table
- Use Supabase **Edge Functions** (Deno) + **pg_cron** to trigger notifications
- Still uses FCM under the hood for actual delivery

**Free tier**: 500MB database, 500K Edge Function invocations/month

---

### Option C: OneSignal

**Cost**: Free for up to 10,000 subscribers

**How it works**:
- Drop-in SDK — minimal code changes
- Web push dashboard to send manual or scheduled notifications
- Built-in analytics (who opened, when, etc.)

**Setup**: Create account → get App ID → add 3 lines of JS

---

## Recommended Approach

For a wedding invitation (one-time event, limited audience), I recommend:

> **Option A (Firebase)** if you want full control and reliability
> **Option C (OneSignal)** if you want the easiest setup with a dashboard

### No Authentication Needed
You do **NOT** need user login/signup. Push notifications work with anonymous browser tokens. Each browser that clicks "Notify Me" gets a unique token — that's all you need to send them notifications later.

### What I Can Build For You
If you choose Firebase, I can:
1. Set up Firestore to store subscriber tokens
2. Write a Cloud Function that sends notifications at your scheduled times
3. Update `script.js` to register tokens with Firebase

Just let me know which option you prefer and I'll implement it!
