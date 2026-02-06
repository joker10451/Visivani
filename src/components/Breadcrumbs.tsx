import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const handleClick = (href: string) => {
    if (href.startsWith('/#')) {
      const element = document.querySelector(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-2 text-sm">
        <li>
          <button
            onClick={() => handleClick('/')}
            className="flex items-center text-amarin-gray hover:text-amarin-brown transition-colors"
          >
            <Home className="w-4 h-4" />
          </button>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-amarin-gray" />
            {index === items.length - 1 || item.href === '#' ? (
              <span className="text-amarin-brown font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <button
                onClick={() => handleClick(item.href)}
                className="text-amarin-gray hover:text-amarin-brown transition-colors"
              >
                {item.name}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
