import { useState } from 'react';
import { ChevronDown, Search, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SEO from '@/components/seo/SEO';

const faqs = [
  {
    category: 'Заказы и оплата',
    questions: [
      {
        q: 'Как оформить заказ?',
        a: 'Выберите понравившуюся схему, нажмите "В корзину", затем перейдите к оформлению заказа. Заполните контактные данные и выберите способ оплаты. После оплаты схема будет отправлена на ваш email.',
      },
      {
        q: 'Какие способы оплаты принимаете?',
        a: 'Мы принимаем оплату банковскими картами (Visa, Mastercard, МИР), через Систему быстрых платежей (СБП), а также электронными кошельками.',
      },
      {
        q: 'Можно ли отменить заказ?',
        a: 'Так как наши схемы доставляются в электронном виде, отмена заказа возможна только до момента оплаты. После оплаты схема отправляется автоматически.',
      },
    ],
  },
  {
    category: 'Доставка',
    questions: [
      {
        q: 'Как быстро я получу схему?',
        a: 'Схемы отправляются в электронном виде сразу после оплаты. Проверьте папку "Входящие" и "Спам" на указанном email.',
      },
      {
        q: 'В каком формате приходит схема?',
        a: 'Схемы приходят в формате PDF, который можно открыть на любом устройстве. Также в комплекте идёт ключ к схеме с номерами ниток.',
      },
      {
        q: 'Не получил схему на email, что делать?',
        a: 'Сначала проверьте папку "Спам". Если письма нет, напишите нам на hello@amarine.ru с указанием номера заказа, и мы повторно отправим схему.',
      },
    ],
  },
  {
    category: 'Схемы и вышивание',
    questions: [
      {
        q: 'Что означает сложность схемы?',
        a: 'Начинающий — простые схемы с небольшим количеством цветов. Средний — больше цветов и деталей. Продвинутый — сложные схемы с множеством оттенков и элементов.',
      },
      {
        q: 'Какая канва подойдёт для схемы?',
        a: 'В комплекте с каждой схемой идут рекомендации по выбору канвы. Обычно мы рекомендуем Aida 14 или 16 count для большинства работ.',
      },
      {
        q: 'Можно ли продавать готовую работу?',
        a: 'Да, вы можете продавать готовые вышитые работы. Схема приобретается для личного использования, а готовая работа — ваша собственность.',
      },
    ],
  },
  {
    category: 'Совместные отшивы',
    questions: [
      {
        q: 'Что такое совместный отшив (СО)?',
        a: 'Это когда группа людей вышивает одну схему в одно время, делится процессом в чате, поддерживает друг друга. В конце все получают бонусы!',
      },
      {
        q: 'Как присоединиться к СО?',
        a: 'На странице активного СО нажмите кнопку "Присоединиться", приобретите схему и вступите в чат участников.',
      },
      {
        q: 'Что будет, если не успеть вышить в срок?',
        a: 'Ничего страшного! Вы всё равно получите схему и сможете вышивать в своём темпе. Бонусы получают только те, кто успел в сроки СО.',
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <>
      <SEO
        title="Частые вопросы"
        description="Ответы на частые вопросы о заказе, доставке и вышивании в мастерской Amarine."
        keywords="FAQ, вопросы, помощь, вышивание, схемы"
      />

      <div className="min-h-screen bg-amarin-cream pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl text-amarin-brown mb-4">
              Частые вопросы
            </h1>
            <p className="text-amarin-gray max-w-xl mx-auto">
              Не нашли ответ на свой вопрос? Напишите нам, и мы с радостью поможем!
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amarin-gray" />
            <Input
              type="text"
              placeholder="Поиск по вопросам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 rounded-full border-amarin-brown/20 bg-white"
            />
          </div>

          {/* FAQ List */}
          <div className="space-y-8">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((category) => (
                <div key={category.category}>
                  <h2 className="font-display text-2xl text-amarin-brown mb-4">
                    {category.category}
                  </h2>
                  <div className="space-y-3">
                    {category.questions.map((item, index) => {
                      const key = `${category.category}-${index}`;
                      const isOpen = openItems[key];

                      return (
                        <div
                          key={key}
                          className="bg-white rounded-xl overflow-hidden"
                        >
                          <button
                            onClick={() => toggleItem(key)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-amarin-cream/50 transition-colors"
                          >
                            <span className="font-medium text-amarin-brown pr-4">
                              {item.q}
                            </span>
                            <ChevronDown
                              className={`w-5 h-5 text-amarin-gray flex-shrink-0 transition-transform ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-4">
                              <p className="text-amarin-gray leading-relaxed">
                                {item.a}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-amarin-gray mb-4">
                  По вашему запросу ничего не найдено
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery('')}
                  className="rounded-full"
                >
                  Сбросить поиск
                </Button>
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 bg-gradient-to-br from-amarin-pink/30 to-amarin-peach/30 rounded-2xl p-8 text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-amarin-terracotta" />
            <h3 className="font-display text-2xl text-amarin-brown mb-2">
              Остались вопросы?
            </h3>
            <p className="text-amarin-gray mb-6">
              Напишите нам, и мы ответим в течение 24 часов
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:hello@amarine.ru"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white rounded-full text-amarin-brown hover:bg-amarin-pink/20 transition-colors"
              >
                Написать на email
              </a>
              <a
                href="https://t.me/crossstich_amarine"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amarin-brown text-white rounded-full hover:bg-amarin-brown/90 transition-colors"
              >
                Telegram-канал
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
