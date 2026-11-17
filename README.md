# InferX AI — Vercel + OpenRouter

Aplikasi chat AI berbasis Next.js. API key OpenRouter hanya digunakan di server route (`app/api/chat/route.ts`), tidak dikirim ke browser.

## Jalankan lokal
1. Install Node.js 18.17+.
2. Jalankan `npm install`.
3. Salin `.env.example` menjadi `.env.local`.
4. Isi `OPENROUTER_API_KEY` dengan API key dari https://openrouter.ai/keys.
5. (Opsional) Ubah `OPENROUTER_MODEL` sesuai model yang tersedia di OpenRouter.
6. Jalankan `npm run dev`, lalu buka http://localhost:3000.

## Deploy ke Vercel
1. Upload/push folder proyek ini ke repository GitHub.
2. Buka https://vercel.com/new lalu import repository tersebut.
3. Di **Project → Settings → Environment Variables**, tambahkan:
   - `OPENROUTER_API_KEY` = API key OpenRouter kamu
   - `OPENROUTER_MODEL` = misalnya `meta-llama/llama-3.3-70b-instruct:free`
   - `APP_URL` = URL deployment kamu (opsional)
4. Klik **Deploy**. Jika mengubah Environment Variables, lakukan redeploy.

## Catatan
- Jangan pernah menaruh API key di file frontend, `NEXT_PUBLIC_*`, atau repository GitHub.
- Model gratis dan ketersediaannya dapat berubah. Jika model default tidak tersedia, ganti `OPENROUTER_MODEL` dengan slug model yang aktif di akun OpenRouter.
- Versi awal ini menyediakan AI chat tanpa akun/login, database, upload file, atau panel admin. Fitur tersebut perlu ditambahkan terpisah bila dibutuhkan.
