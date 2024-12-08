import { Bell, Calendar, Newspaper, Users, Activity, MessageSquare } from 'lucide-react';
import React from 'react';

import type { NotificationPreference, ContentPreference } from '../types/team';

interface PreferencesFormProps {
  notifications: NotificationPreference;
  content: ContentPreference;
  onNotificationChange: (prefs: NotificationPreference) => void;
  onContentChange: (prefs: ContentPreference) => void;
}

export function PreferencesForm({
  notifications,
  content,
  onNotificationChange,
  onContentChange,
}: PreferencesFormProps) {
  return (
    <div className="space-y-8 p-6 bg-white rounded-lg shadow-md">
      <div>
        <h3 className="flex items-center text-xl font-semibold mb-4">
          <Bell className="mr-2" /> Notificaciones de Partidos
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { key: 'beforeWeek', label: '1 semana antes' },
            { key: 'beforeDay', label: '1 día antes' },
            { key: 'before10Hours', label: '10 horas antes' },
            { key: 'before3Hours', label: '3 horas antes' },
            { key: 'before1Hour', label: '1 hora antes' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={notifications[key as keyof NotificationPreference]}
                onChange={e =>
                  onNotificationChange({
                    ...notifications,
                    [key]: e.target.checked,
                  })
                }
                className="rounded text-blue-600"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="flex items-center text-xl font-semibold mb-4">
          <Calendar className="mr-2" /> Contenido Personalizable
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'matchSummaries', label: 'Resumen de partidos', icon: Activity },
            { key: 'teamStats', label: 'Estadísticas del equipo', icon: Users },
            { key: 'clubNews', label: 'Noticias oficiales', icon: Newspaper },
            { key: 'pressConferences', label: 'Ruedas de prensa', icon: MessageSquare },
            { key: 'injuriesAndSuspensions', label: 'Lesiones y sanciones', icon: Activity },
            { key: 'transferNews', label: 'Mercado de fichajes', icon: Users },
          ].map(({ key, label, icon: Icon }) => (
            <label key={key} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
              <input
                type="checkbox"
                checked={content[key as keyof ContentPreference]}
                onChange={e =>
                  onContentChange({
                    ...content,
                    [key]: e.target.checked,
                  })
                }
                className="rounded text-blue-600"
              />
              <Icon size={18} className="text-gray-600" />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
