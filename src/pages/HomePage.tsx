import SEO from '@/components/seo/SEO';
import Hero from '@/sections/Hero';
import Services from '@/sections/Services';
import Catalog from '@/sections/Catalog';
import Gallery from '@/sections/Gallery';
import SOProjects from '@/sections/SOProjects';
import Blog from '@/sections/Blog';
import Reviews from '@/sections/Reviews';

export default function HomePage() {
  return (
    <>
      <SEO
        title="Авторские схемы для вышивки"
        description="Amarine — рукодельная мастерская. Авторские схемы для вышивки крестиком, готовые работы, совместные отшивы и мастер-классы."
        keywords="схемы для вышивки, вышивка крестиком, пинкипс, совместные отшивы, рукоделие, amarine"
      />
      <main>
        <Hero />
        <Services />
        <Catalog />
        <Gallery />
        <SOProjects />
        <Blog />
        <Reviews />
      </main>
    </>
  );
}
