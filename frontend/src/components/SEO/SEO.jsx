import { Helmet } from 'react-helmet-async';

const SEO_DATA = {
  '/': {
    title: 'Üçgen Yapı | İnşaat & Mimarlık',
    description: 'Üçgen Yapı - Ankara ve İstanbul\'da anahtar teslim inşaat, mimarlık, iç mimarlık ve dekorasyon hizmetleri. Konut projeleri, ofis yapımı ve tadilat çözümleri.',
  },
  '/iletisim': {
    title: 'İletişim | Üçgen Yapı',
    description: 'Üçgen Yapı ile iletişime geçin. Randevu talebi, proje danışmanlığı ve inşaat hizmetleri için bize ulaşın.',
  },
  '/mimarlik-hizmetlerimiz': {
    title: 'Mimarlık Hizmetlerimiz | Üçgen Yapı',
    description: 'Üçgen Yapı mimarlık ve iç mimarlık hizmetleri. Ofis yapımı, konut tadilat, dekorasyon ve proje danışmanlığı.',
  },
};

export default function SEO({ path }) {
  const data = SEO_DATA[path] || SEO_DATA['/'];

  return (
    <Helmet>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:url" content={`https://3genyapi.com.tr${path}`} />
      <meta name="twitter:title" content={data.title} />
      <meta name="twitter:description" content={data.description} />
      <link rel="canonical" href={`https://3genyapi.com.tr${path}`} />
    </Helmet>
  );
}
