import React, { useState, useEffect } from 'react';

import { PreferencesForm } from './components/PreferencesForm';
import { TeamSelector } from './components/TeamSelector';
import { Timeline } from './components/Timeline';
import type { Team, NotificationPreference, ContentPreference, TimelineItem } from './types/team';
import { apiClient } from './utils/apiClient';
import { configureLocales } from './utils/localeConfig';
import { sampleTimelineData } from './data/sampleTimelineData';

// Configure moment locales
configureLocales();

function App() {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [notifications, setNotifications] = useState<NotificationPreference>({
    beforeWeek: false,
    beforeDay: true,
    before10Hours: false,
    before3Hours: true,
    before1Hour: true,
  });
  const [content, setContent] = useState<ContentPreference>({
    matchSummaries: true,
    teamStats: true,
    clubNews: true,
    pressConferences: false,
    injuriesAndSuspensions: true,
    transferNews: true,
  });
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>(sampleTimelineData);

  useEffect(() => {
    // Initialize API authentication
    const token = localStorage.getItem('authToken');
    if (token) {
      apiClient.setAuthToken(token);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold flex items-center">
            LaLiga Tracker
          </h1>
          <p className="mt-2 text-blue-100">Mantente al día con tu equipo favorito de fútbol</p>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {!selectedTeam ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Selecciona tu equipo:</h2>
            <TeamSelector onSelectTeam={setSelectedTeam} />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedTeam.logo}
                  alt={`${selectedTeam.name} logo`}
                  className="w-16 h-16 object-contain"
                />
                <h2 className="text-2xl font-semibold text-gray-800">{selectedTeam.name}</h2>
              </div>
              <button
                onClick={() => setSelectedTeam(null)}
                className="text-blue-600 hover:text-blue-800"
              >
                Cambiar equipo
              </button>
            </div>

            <PreferencesForm
              notifications={notifications}
              content={content}
              onNotificationChange={setNotifications}
              onContentChange={setContent}
            />
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Tu Timeline</h2>
              <Timeline items={timelineItems} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
