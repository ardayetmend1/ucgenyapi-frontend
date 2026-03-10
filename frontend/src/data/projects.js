import arazi from '../assets/images/arazi.jpg';
import blokHavuz from '../assets/images/blok-havuz.jpg';
import blokDetail from '../assets/images/blok-detail.jpg';
import sosyalTesis from '../assets/images/sosyal-tesis.jpg';
import salon from '../assets/images/salon.jpg';
import mutfak from '../assets/images/mutfak.jpg';
import yatakOdasi from '../assets/images/yatak-odasi.jpg';
import bonus from '../assets/images/bonus.jpg';

/**
 * PROJE VERİLERİ
 * ─────────────────────────────────────────
 * Yeni proje eklemek için bu diziye yeni bir obje ekleyin.
 * Her proje kendi dış alan, iç alan ve daire bilgilerini taşır.
 */

const projects = [
  {
    id: 'yasam-konutlari-1',
    name: 'Üçgen Yaşam Konutları',
    location: 'Törekent / Ankara',
    status: 'Tamamlandı',
    year: '2020',

    // ── Dış Alan ──
    exterior: {
      heroImage: arazi,
      heroAlt: 'Üçgen Yaşam Konutları — Kuşbakışı Görünüm',
      stats: [
        { value: '12.347', title: 'm² Arazi Alanı' },
        { value: '167', title: 'Bağımsız Bölüm' },
        { value: '5', title: 'Kat Sayısı' },
        { value: '4', title: 'Konut Bloğu' },
      ],
      gallery: [
        {
          image: blokHavuz,
          alt: 'Havuz ve Yaşam Alanı',
          title: 'Havuz & Yaşam Alanı',
          desc: 'Açık yüzme havuzu, şezlong alanı ve peyzaj düzenlemesi',
        },
        {
          image: sosyalTesis,
          alt: 'Sosyal Tesis',
          title: 'Sosyal Tesis',
          desc: 'Fitness merkezi, çocuk oyun alanı ve çok amaçlı salon',
        },
      ],
    },

    // ── İç Alan ──
    interior: [
      {
        image: salon,
        alt: 'Modern Salon',
        tag: 'Yaşam Alanı',
        name: 'Ferah Salon',
        desc: 'Geniş pencerelerle aydınlık, modern tasarım çizgileri ve premium zemin kaplama ile lüks bir yaşam deneyimi.',
      },
      {
        image: mutfak,
        alt: 'Modern Mutfak',
        tag: 'Mutfak',
        name: 'Ankastre Mutfak',
        desc: 'Tam donanımlı ankastre beyaz eşya, granit tezgah ve ergonomik dolap sistemi ile fonksiyonel mutfak.',
      },
      {
        image: yatakOdasi,
        alt: 'Yatak Odası',
        tag: 'Yatak Odası',
        name: 'Master Yatak Odası',
        desc: 'Giyinme odası, en-suite banyo bağlantısı ve sessiz ortam için yalıtımlı duvar sistemi.',
      },
    ],

    // ── Daire Seçenekleri ──
    apartments: [
      {
        type: 'Tip A',
        name: '2+1 Daire',
        features: [
          { label: 'Brüt Alan', value: '95 m²' },
          { label: 'Net Alan', value: '80 m²' },
          { label: 'Oda Sayısı', value: '2 + 1' },
          { label: 'Banyo', value: '1' },
          { label: 'Balkon', value: '1 Adet' },
          { label: 'Isıtma', value: 'Yerden Isıtma' },
        ],
        status: 'available',
        statusText: 'Müsait',
      },
      {
        type: 'Tip B',
        name: '3+1 Daire',
        features: [
          { label: 'Brüt Alan', value: '135 m²' },
          { label: 'Net Alan', value: '115 m²' },
          { label: 'Oda Sayısı', value: '3 + 1' },
          { label: 'Banyo', value: '2' },
          { label: 'Balkon', value: '2 Adet' },
          { label: 'Isıtma', value: 'Yerden Isıtma' },
        ],
        status: 'limited',
        statusText: 'Son Birkaç',
      },
      {
        type: 'Tip C',
        name: '4+1 Daire',
        features: [
          { label: 'Brüt Alan', value: '175 m²' },
          { label: 'Net Alan', value: '150 m²' },
          { label: 'Oda Sayısı', value: '4 + 1' },
          { label: 'Banyo', value: '2' },
          { label: 'Balkon', value: '2 Adet' },
          { label: 'Isıtma', value: 'Yerden Isıtma' },
        ],
        status: 'sold',
        statusText: 'Hepsi Satıldı',
      },
    ],
  },

  {
    id: 'yasam-konutlari-2',
    name: 'Üçgen Yaşam Konutları 2',
    location: 'Törekent / Ankara',
    status: 'İnşaat Aşamasında',
    year: '2025',

    // ── Dış Alan ──
    exterior: {
      heroImage: blokDetail,
      heroAlt: 'Üçgen Yaşam Konutları 2 — Bina Cephesi',
      stats: [
        { value: '23.485', title: 'm² Arazi Alanı' },
        { value: '310', title: 'Bağımsız Bölüm' },
        { value: '5', title: 'Kat Sayısı' },
        { value: '4', title: 'Konut Bloğu' },
      ],
      gallery: [
        {
          image: bonus,
          alt: 'Dış Cephe Detay',
          title: 'Modern Cephe Tasarımı',
          desc: 'Doğal taş ve ahşap detaylarla zenginleştirilmiş modern mimari',
        },
        {
          image: blokHavuz,
          alt: 'Havuz Alanı',
          title: 'Yüzme Havuzu & Peyzaj',
          desc: 'Olimpik yüzme havuzu, güneşlenme terası ve yeşil peyzaj alanları',
        },
      ],
    },

    // ── İç Alan ──
    interior: [
      {
        image: salon,
        alt: 'Geniş Salon',
        tag: 'Yaşam Alanı',
        name: 'Açık Konsept Salon',
        desc: 'Yüksek tavanlı, L tipi açık mutfak bağlantılı, panoramik pencereli modern yaşam alanı.',
      },
      {
        image: mutfak,
        alt: 'Lüks Mutfak',
        tag: 'Mutfak',
        name: 'Ada Tipi Mutfak',
        desc: 'Quartz tezgah, Bosch ankastre set ve ada ünitesi ile profesyonel mutfak deneyimi.',
      },
      {
        image: yatakOdasi,
        alt: 'Yatak Odası',
        tag: 'Yatak Odası',
        name: 'Suit Yatak Odası',
        desc: 'Walk-in closet, özel banyo ve Fransız balkon erişimi ile ayrıcalıklı dinlenme alanı.',
      },
    ],

    // ── Daire Seçenekleri ──
    apartments: [
      {
        type: 'Tip A',
        name: '2+1 Daire',
        features: [
          { label: 'Brüt Alan', value: '105 m²' },
          { label: 'Net Alan', value: '88 m²' },
          { label: 'Oda Sayısı', value: '2 + 1' },
          { label: 'Banyo', value: '1' },
          { label: 'Balkon', value: '1 Adet' },
          { label: 'Isıtma', value: 'Yerden Isıtma' },
        ],
        status: 'available',
        statusText: 'Müsait',
      },
      {
        type: 'Tip B',
        name: '3+1 Daire',
        features: [
          { label: 'Brüt Alan', value: '145 m²' },
          { label: 'Net Alan', value: '125 m²' },
          { label: 'Oda Sayısı', value: '3 + 1' },
          { label: 'Banyo', value: '2' },
          { label: 'Balkon', value: '2 Adet' },
          { label: 'Isıtma', value: 'Yerden Isıtma' },
        ],
        status: 'available',
        statusText: 'Müsait',
      },
      {
        type: 'Tip C',
        name: '4+1 Daire',
        features: [
          { label: 'Brüt Alan', value: '190 m²' },
          { label: 'Net Alan', value: '165 m²' },
          { label: 'Oda Sayısı', value: '4 + 1' },
          { label: 'Banyo', value: '2' },
          { label: 'Balkon', value: '3 Adet' },
          { label: 'Isıtma', value: 'Yerden Isıtma' },
        ],
        status: 'available',
        statusText: 'Müsait',
      },
    ],
  },
];

export default projects;
