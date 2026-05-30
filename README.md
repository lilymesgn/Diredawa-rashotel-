<div align="center">
  <img src="https://i.ibb.co/xS8gGjtb/Picsart-26-05-26-05-22-39-801.png" alt="Dire Dawa Ras Hotel" height="80" />
</div>

<h1 align="center">Dire Dawa Ras Hotel — Digital Guest Directory</h1>

<p align="center">
  Official web platform for the Dire Dawa Ras Hotel, Kezira, Ethiopia.
  Built for seamless room discovery, reservation management, and guest experience.
</p>

---

## About

Dire Dawa Ras Hotel is a historic landmark establishment in Kezira, Dire Dawa — one of Ethiopia's most storied hotels, dating back to the golden era of the Franco-Ethiopian Railway. This platform serves as the hotel's official digital guest directory, enabling guests to browse rooms, check availability, make reservations, and explore dining and services.

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **Animations:** Motion (Framer Motion)
- **Backend:** Supabase (PostgreSQL + Auth + Realtime)
- **Icons:** Lucide React

## Features

- 🛏️ Room catalog with detailed specs, amenities, and image galleries
- 📅 Availability checker with guest count configuration
- 💳 Full booking checkout flow with confirmation voucher
- 📋 Local reservation history log
- 🍽️ Dining, Services, Gallery, and About pages
- 🔧 Admin-controlled settings via Supabase CMS (maintenance mode, hero image, banner text)
- 🌐 Dynamic promotions and offers
- 📱 Fully responsive — mobile, tablet, desktop

## Getting Started

**Prerequisites:** Node.js 18+

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/diredawa-ras-hotel.git
   cd diredawa-ras-hotel
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables — copy `.env.example` to `.env.local` and fill in your Supabase credentials:
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

5. Build for production:
   ```bash
   npm run build
   ```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous public key |

## Project Structure

```
src/
├── components/       # All page and UI components
├── services/         # Supabase API service layer
├── lib/              # Supabase client config
├── data.ts           # Static fallback data
├── types.ts          # TypeScript interfaces
└── App.tsx           # Root app + routing logic
```

## Contact

**Dire Dawa Ras Hotel**
Kezira St, Dire Dawa, Ethiopia
📞 +251 251 110 355
📧 reservations@diredawarashotel.com
🟢 WhatsApp: +251 915 320 033

---

© 2026 Dire Dawa Ras Hotel Group. All Rights Reserved.
