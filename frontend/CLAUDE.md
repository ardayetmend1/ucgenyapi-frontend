# Frontend - React + Vite Projesi

## Proje Bilgisi
- **Framework:** React 19 + Vite 7
- **Dil:** JavaScript (JSX)
- **Paket Yöneticisi:** npm

## Komutlar
- `npm run dev` — Geliştirme sunucusu başlat
- `npm run build` — Production build oluştur
- `npm run lint` — ESLint ile kod kontrolü
- `npm run preview` — Production build'i önizle

## Proje Yapısı
```
src/
├── assets/        # Görseller, fontlar vb.
├── components/    # Tekrar kullanılabilir React bileşenleri
├── pages/         # Sayfa bileşenleri
├── hooks/         # Custom React hook'ları
├── services/      # API çağrıları ve servisler
├── utils/         # Yardımcı fonksiyonlar
├── App.jsx        # Ana uygulama bileşeni
├── main.jsx       # Giriş noktası
└── index.css      # Global stiller
```

## Kod Kuralları
- Bileşen dosyaları PascalCase olmalı: `UserCard.jsx`
- Hook dosyaları camelCase ve "use" ile başlamalı: `useAuth.js`
- Servis dosyaları camelCase olmalı: `authService.js`
- Her bileşen kendi klasöründe olabilir: `components/UserCard/UserCard.jsx`
- CSS Modules veya styled-components tercih edilebilir
- Functional component ve hooks kullanılmalı, class component kullanılmamalı
- Props destructuring yapılmalı
- `console.log` production kodda bırakılmamalı

## State Yönetimi
- Basit state için `useState` ve `useReducer`
- Global state gerekirse `useContext` veya harici kütüphane (Zustand, Redux Toolkit)
- Server state için React Query / TanStack Query tercih edilebilir

## API İletişimi
- Backend API çağrıları `src/services/` altında toplanmalı
- Axios veya fetch kullanılabilir
- Base URL `.env` dosyasından okunmalı: `VITE_API_URL`

## Ortam Değişkenleri
- `.env` dosyası versiyon kontrolüne eklenmemeli
- Vite ortam değişkenleri `VITE_` öneki ile başlamalı
- Erişim: `import.meta.env.VITE_API_URL`

## Test
- Vitest + React Testing Library önerilir
- Test dosyaları: `ComponentName.test.jsx`

## Dikkat Edilecekler
- `node_modules/` ve `.env` dosyaları commit edilmemeli
- Build çıktısı `dist/` klasöründe oluşur
- Vite dev server varsayılan olarak `http://localhost:5173` üzerinde çalışır
