import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface TimelineItem {
  id: string;
  type: 'match' | 'news' | 'transfer' | 'injury' | 'conference';
  title: string;
  description: string;
  date: Date;
  icon?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  const getIconForType = (type: TimelineItem['type']) => {
    switch (type) {
      case 'match':
        return '⚽';
      case 'news':
        return '📰';
      case 'transfer':
        return '🤝';
      case 'injury':
        return '🏥';
      case 'conference':
        return '🎤';
      default:
        return '📌';
    }
  };

  const sortedItems = [...items].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        {/* Línea vertical del timeline */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>

        {sortedItems.map((item) => (
          <div key={item.id} className="relative pl-12 pb-8">
            {/* Círculo indicador */}
            <div className="absolute left-0 w-8 h-8 bg-white rounded-full border-4 border-blue-500 flex items-center justify-center">
              <span role="img" aria-label={item.type}>
                {getIconForType(item.type)}
              </span>
            </div>

            {/* Contenido */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-blue-600">{item.title}</h3>
                <time className="text-sm text-gray-500">
                  {format(item.date, "d 'de' MMMM 'a las' HH:mm", { locale: es })}
                </time>
              </div>
              <p className="text-gray-700">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
