# AgentFlow Backend — Step 1 (Basic Setup)

Ye backend abhi itna karta hai: user message leta hai → Gemini AI se samajhta hai
kaunsi category (research/booking/shopping/communication/document) hai → wapas
JSON response deta hai.

## Local pe test karne ke steps:

1. **Node.js install karo** (agar nahi hai): https://nodejs.org (LTS version le lo)

2. **Is folder ko apne computer mein daalo**, phir terminal/cmd kholo aur folder ke andar jao:
   ```
   cd agentflow-backend
   ```

3. **Dependencies install karo:**
   ```
   npm install
   ```

4. **.env file banao:**
   - `.env.example` file ko copy karo aur naam do `.env`
   - Usme apni Gemini API key daalo:
     ```
     GEMINI_API_KEY=yaha_apni_key_paste_karo
     ```

5. **Server chalu karo:**
   ```
   npm start
   ```
   Agar sab sahi hai, terminal mein dikhega:
   ```
   AgentFlow backend http://localhost:3000 pe chal raha hai
   ```

6. **Test karo** (Postman ya browser extension se, ya terminal se):
   ```
   curl -X POST http://localhost:3000/api/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "Mujhe kal Delhi se Mumbai jaane ka train dhundo"}'
   ```

   Response kuch aisa aayega:
   ```json
   {
     "category": "booking",
     "reply": "Aapko Delhi se Mumbai train dhundhni hai kal ke liye. Main abhi ye check kar raha hoon..."
   }
   ```

## Agla Step
Jab ye local pe kaam karne lage, hum:
1. Isse **Render** pe free host karenge (taaki internet pe live ho jaaye)
2. **Research Agent** jodenge (real search API se)
3. Phir simple **frontend (chat screen)** banayenge jisse user isse baat kar sake
