import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  price?: number;
  availability?: string;
}

export default function SEO({
  title,
  description,
  keywords,
  image = 'https://amarine.ru/og-image.jpg',
  url = 'https://amarine.ru',
  type = 'website',
  price,
  availability,
}: SEOProps) {
  const fullTitle = `${title} | Amarine — Вышивание и схемы`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Amarine" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Amarine" />
      <meta property="og:locale" content="ru_RU" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Product Schema (if product page) */}
      {type === 'product' && price && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: title,
            description: description,
            image: image,
            offers: {
              '@type': 'Offer',
              price: price,
              priceCurrency: 'RUB',
              availability: availability || 'https://schema.org/InStock',
              url: url,
            },
            brand: {
              '@type': 'Brand',
              name: 'Amarine',
            },
          })}
        </script>
      )}

      {/* Organization Schema */}
      {type === 'website' && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Amarine',
            description: 'Рукодельная мастерская вышивания. Авторские схемы, готовые работы, совместные отшивы.',
            url: 'https://amarine.ru',
            logo: 'https://amarine.ru/logo.png',
            sameAs: [
              'https://t.me/crossstich_amarine',
              'https://instagram.com/amarine',
              'https://vk.com/amarine',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer service',
              email: 'hello@amarine.ru',
              availableLanguage: 'Russian',
            },
          })}
        </script>
      )}
    </Helmet>
  );
}
