import { useState, useEffect, useRef } from 'react';
import { Filter, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products, filterCategories } from '@/data/products';
import { useShop } from '@/contexts/ShopContext';
import ProductCard from '@/components/ProductCard';

export default function Catalog() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'newest'>('newest');
  const sectionRef = useRef<HTMLDivElement>(null);
  const { searchQuery } = useShop();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.product-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in-up');
                card.classList.remove('opacity-0');
              }, index * 100);
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

  const toggleFilter = (categoryId: string, optionId: string) => {
    setSelectedFilters((prev) => {
      const current = prev[categoryId] || [];
      const updated = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      return { ...prev, [categoryId]: updated };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
    setLocalSearch('');
  };

  // Combine global search and local search
  const effectiveSearch = searchQuery || localSearch;

  let filteredProducts = products.filter((product) => {
    // Search filter
    const searchMatch = !effectiveSearch || 
      product.name.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      product.description.toLowerCase().includes(effectiveSearch.toLowerCase());

    // Difficulty filter
    const difficultyMatch =
      !selectedFilters.difficulty?.length ||
      selectedFilters.difficulty.includes(product.difficulty);

    // Category filter
    const categoryMatch =
      !selectedFilters.category?.length ||
      selectedFilters.category.includes(product.category);

    return searchMatch && difficultyMatch && categoryMatch;
  });

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
      default:
        return parseInt(b.id) - parseInt(a.id);
    }
  });

  const activeFiltersCount = Object.values(selectedFilters).flat().length + (effectiveSearch ? 1 : 0);

  return (
    <section
      ref={sectionRef}
      id="schemes"
      className="py-24 md:py-32 bg-gradient-to-b from-amarin-cream via-white to-amarin-cream relative"
    >
      {/* Background decorations */}
      <div className="absolute top-40 right-0 w-64 h-64 bg-amarin-pink/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-0 w-72 h-72 bg-amarin-peach/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-amarin-terracotta/20 text-amarin-terracotta text-sm font-medium rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5 inline mr-1" />
              Каталог
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-amarin-brown mb-3">
              Схемы для вышивки
            </h2>
            <p className="text-amarin-gray text-lg">
              Выберите идеальную схему для вашего следующего проекта
            </p>
          </div>

          {/* Search & Filter Buttons (Mobile) */}
          <div className="flex gap-2">
            <div className="relative flex-1 md:hidden">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amarin-gray" />
              <Input
                type="text"
                placeholder="Поиск..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-9 rounded-full border-amarin-brown/20"
              />
            </div>
            <Button
              variant="outline"
              className="md:hidden border-amarin-brown/20 rounded-full"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Фильтры
              {activeFiltersCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-amarin-pink rounded-full text-xs">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Desktop Search & Sort */}
        <div className="hidden md:flex justify-between items-center mb-8">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amarin-gray" />
            <Input
              type="text"
              placeholder="Поиск по названию или описанию..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-12 pr-10 py-3 rounded-full border-amarin-brown/20 text-base"
            />
            {localSearch && (
              <button
                onClick={() => setLocalSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-amarin-gray hover:text-amarin-brown transition-colors"
              >
                <span className="text-xl">×</span>
              </button>
            )}
          </div>
          
          {/* Sort */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-amarin-gray">Сортировка:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2.5 rounded-full border border-amarin-brown/20 bg-white text-amarin-brown text-sm focus:outline-none focus:border-amarin-pink focus:ring-2 focus:ring-amarin-pink/20 transition-all"
            >
              <option value="newest">Сначала новые</option>
              <option value="price-asc">Цена: по возрастанию</option>
              <option value="price-desc">Цена: по убыванию</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`lg:w-72 ${
              isFilterOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="bg-white rounded-3xl p-6 shadow-soft lg:sticky lg:top-24 border border-amarin-brown/5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl text-amarin-brown">
                  Фильтры
                </h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-amarin-terracotta hover:text-amarin-terracotta/80 font-medium transition-colors"
                  >
                    Сбросить
                  </button>
                )}
              </div>

              {filterCategories.map((category) => (
                <div key={category.id} className="mb-6">
                  <h4 className="font-semibold text-amarin-brown mb-4 text-sm uppercase tracking-wide">
                    {category.name}
                  </h4>
                  <div className="space-y-3">
                    {category.options.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          selectedFilters[category.id]?.includes(option.id)
                            ? 'bg-amarin-terracotta border-amarin-terracotta'
                            : 'border-amarin-brown/30 group-hover:border-amarin-pink'
                        }`}>
                          {selectedFilters[category.id]?.includes(option.id) && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <input
                          type="checkbox"
                          checked={
                            selectedFilters[category.id]?.includes(
                              option.id
                            ) || false
                          }
                          onChange={() =>
                            toggleFilter(category.id, option.id)
                          }
                          className="hidden"
                        />
                        <span className="text-sm text-amarin-gray group-hover:text-amarin-brown transition-colors">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results count */}
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm text-amarin-gray">
                Найдено: <span className="font-semibold text-amarin-brown">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'схема' : filteredProducts.length < 5 ? 'схемы' : 'схем'}
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl shadow-soft">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amarin-cream flex items-center justify-center">
                  <Search className="w-10 h-10 text-amarin-gray" />
                </div>
                <p className="text-amarin-brown text-xl font-display mb-2">
                  Ничего не найдено
                </p>
                <p className="text-amarin-gray mb-6">
                  Попробуйте изменить параметры поиска или фильтры
                </p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="rounded-full px-8"
                >
                  Сбросить все фильтры
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
