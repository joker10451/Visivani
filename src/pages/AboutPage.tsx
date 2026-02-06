import { Heart, Sparkles, Users, Award, Mail, MapPin } from 'lucide-react';
import SEO from '@/components/seo/SEO';
import { products } from '@/data/products';

const stats = [
  { value: '500+', label: 'Авторских схем' },
  { value: '2000+', label: 'Довольных клиентов' },
  { value: '50+', label: 'Совместных отшивов' },
  { value: '5', label: 'Лет опыта' },
];

const values = [
  {
    icon: Heart,
    title: 'Сделано с любовью',
    description: 'Каждая схема создаётся с вниманием к деталям и любовью к рукоделию',
  },
  {
    icon: Sparkles,
    title: 'Уникальные дизайны',
    description: 'Наши схемы — это оригинальные авторские работы, которых нет больше нигде',
  },
  {
    icon: Users,
    title: 'Сообщество',
    description: 'Мы объединяем вышивальщиц со всего мира в тёплом и поддерживающем сообществе',
  },
  {
    icon: Award,
    title: 'Качество',
    description: 'Все схемы проверены и протестированы — вы получаете только лучшее',
  },
];

export default function AboutPage() {
  return (
    <>
      <SEO
        title="О мастерской"
        description="Узнайте больше о рукодельной мастерской Amarine. Авторские схемы, сообщество вышивальщиц, совместные отшивы."
        keywords="о мастерской, amarine, вышивание, рукоделие, сообщество"
      />

      <div className="min-h-screen bg-amarin-cream pt-24 pb-16">
        {/* Hero */}
        <div className="container mx-auto px-4 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-5xl md:text-6xl text-amarin-brown mb-6">
              О мастерской Amarine
            </h1>
            <p className="text-xl text-amarin-gray leading-relaxed">
              Мы создаём авторские схемы для вышивки крестиком и объединяем 
              творческих людей в тёплом сообществе рукодельниц.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="container mx-auto px-4 mb-20">
          <div className="bg-white rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-4xl md:text-5xl text-amarin-terracotta mb-2">
                    {stat.value}
                  </p>
                  <p className="text-amarin-gray">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="container mx-auto px-4 mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl text-amarin-brown mb-6">
                Наша история
              </h2>
              <div className="space-y-4 text-amarin-gray leading-relaxed">
                <p>
                  Amarine началась как небольшой проект одной увлечённой вышивальщицы, 
                  которая хотела делиться своими схемами с миром. Со временем к ней 
                  присоединились единомышленницы, и так родилось сообщество.
                </p>
                <p>
                  Сегодня мы — это команда профессиональных дизайнеров, которые 
                  создают уникальные схемы для вышивки. Наши работы украшают дома 
                  тысяч людей по всему миру.
                </p>
                <p>
                  Мы верим, что вышивание — это не просто хобби, а способ выразить 
                  себя, расслабиться и создать что-то прекрасное своими руками.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {products.slice(0, 4).map((product) => (
                <div key={product.id} className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="container mx-auto px-4 mb-20">
          <h2 className="font-display text-3xl text-amarin-brown text-center mb-12">
            Наши ценности
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-6 text-center card-hover"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-amarin-pink/30 flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-amarin-terracotta" />
                </div>
                <h3 className="font-display text-xl text-amarin-brown mb-2">
                  {value.title}
                </h3>
                <p className="text-amarin-gray text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-amarin-pink/30 to-amarin-peach/30 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="font-display text-3xl text-amarin-brown mb-4">
              Свяжитесь с нами
            </h2>
            <p className="text-amarin-gray mb-8 max-w-xl mx-auto">
              Есть вопросы или предложения? Мы всегда рады общению с нашими клиентами!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@amarine.ru"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white rounded-full text-amarin-brown hover:bg-amarin-pink/20 transition-colors"
              >
                <Mail className="w-5 h-5" />
                hello@amarine.ru
              </a>
              <a
                href="https://t.me/crossstich_amarine"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white rounded-full text-amarin-brown hover:bg-amarin-pink/20 transition-colors"
              >
                <MapPin className="w-5 h-5" />
                Telegram-канал
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
