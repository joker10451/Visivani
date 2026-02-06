import { useState, useEffect, useRef } from 'react';
import { Clock, Users, CheckCircle, Calendar, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { soProjects, reviews } from '@/data/products';

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-xl shadow-soft flex items-center justify-center">
        <span className="text-xl md:text-2xl font-bold text-amarin-brown">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs text-amarin-gray mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex gap-2 md:gap-3">
      <TimeUnit value={timeLeft.days} label="дней" />
      <TimeUnit value={timeLeft.hours} label="часов" />
      <TimeUnit value={timeLeft.minutes} label="минут" />
      <TimeUnit value={timeLeft.seconds} label="секунд" />
    </div>
  );
}

export default function SOProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [joinedSO, setJoinedSO] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('amarine_joined_so');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  
  const activeProject = soProjects.find((p) => p.status === 'upcoming') || soProjects[0];
  const hasJoined = joinedSO.includes(activeProject.id);

  useEffect(() => {
    localStorage.setItem('amarine_joined_so', JSON.stringify(joinedSO));
  }, [joinedSO]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate-fade-in-up');
                el.classList.remove('opacity-0');
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleJoinSO = () => {
    if (hasJoined) {
      toast.info('Вы уже участвуете в этом совместном отшиве!');
      return;
    }
    setIsDialogOpen(true);
  };

  const confirmJoin = () => {
    setJoinedSO([...joinedSO, activeProject.id]);
    setIsDialogOpen(false);
    toast.success('Вы присоединились к совместному отшиву!', {
      description: 'Мы отправили вам подробности на email. Удачного отшива!',
      duration: 5000,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="so"
      className="py-20 md:py-28 bg-gradient-to-br from-amarin-pink/30 via-amarin-peach/20 to-amarin-cream"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-amarin-terracotta/20 text-amarin-terracotta border-0">
            <Users className="w-3 h-3 mr-1" />
            Сообщество
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl text-amarin-brown mb-4">
            Совместные отшивы
          </h2>
          <p className="text-lg text-amarin-gray max-w-2xl mx-auto">
            Присоединяйтесь к нашему тёплому сообществу вышивальщиц. Вышивайте
            вместе, делитесь процессом и вдохновляйтесь!
          </p>
        </div>

        {/* Active SO Project */}
        <div className="max-w-4xl mx-auto">
          <div className="reveal opacity-0 bg-white rounded-3xl shadow-soft-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-square md:aspect-auto">
                <img
                  src={activeProject.image}
                  alt={activeProject.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-amarin-pink text-amarin-brown">
                    Скоро старт
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col">
                <h3 className="font-display text-3xl text-amarin-brown mb-3">
                  {activeProject.name}
                </h3>
                <p className="text-amarin-gray mb-6">
                  {activeProject.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2 text-amarin-brown">
                    <Users className="w-5 h-5 text-amarin-terracotta" />
                    <span>{activeProject.participants} участников</span>
                  </div>
                  <div className="flex items-center gap-2 text-amarin-brown">
                    <Calendar className="w-5 h-5 text-amarin-terracotta" />
                    <span>
                      до{' '}
                      {new Date(activeProject.endDate).toLocaleDateString(
                        'ru-RU'
                      )}
                    </span>
                  </div>
                </div>

                {/* Countdown */}
                <div className="mb-6">
                  <p className="text-sm text-amarin-gray mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    До старта осталось:
                  </p>
                  <CountdownTimer targetDate={activeProject.startDate} />
                </div>

                {/* Conditions */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-amarin-brown mb-2">
                    Условия участия:
                  </p>
                  <ul className="space-y-1">
                    {activeProject.conditions.map((condition, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-amarin-gray"
                      >
                        <CheckCircle className="w-4 h-4 text-amarin-gold mt-0.5 flex-shrink-0" />
                        {condition}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="mt-auto">
                  <Button
                    onClick={handleJoinSO}
                    disabled={hasJoined}
                    className={`w-full font-semibold rounded-full py-6 ${
                      hasJoined
                        ? 'bg-green-100 text-green-700 cursor-default'
                        : 'bg-amarin-pink hover:bg-amarin-pink/90 text-amarin-brown'
                    }`}
                  >
                    {hasJoined ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Вы участвуете
                      </>
                    ) : (
                      'Присоединиться к СО'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Previous SO Reviews */}
          <div className="reveal opacity-0 mt-12">
            <h3 className="font-display text-2xl text-amarin-brown mb-6 text-center">
              Что говорят участники
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {reviews.slice(0, 3).map((review) => (
                <div
                  key={review.id}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-5"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-amarin-gold">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-amarin-gray text-sm mb-4">
                    "{review.text}"
                  </p>
                  <p className="font-medium text-amarin-brown text-sm">
                    {review.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Join Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-amarin-brown">
              Присоединиться к СО
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-amarin-gray mb-6">
              Вы собираетесь присоединиться к совместному отшиву "{activeProject.name}".
              После подтверждения мы отправим вам все необходимые материалы на email.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={confirmJoin}
                className="w-full bg-amarin-pink hover:bg-amarin-pink/90 text-amarin-brown rounded-full"
              >
                Подтвердить участие
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                className="w-full rounded-full"
              >
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
