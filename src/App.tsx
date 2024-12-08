import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

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
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-6 shadow-lg">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold flex items-center">
              LaLiga Tracker
            </h1>
            <p className="mt-2 text-blue-100">Mantente al día con tu equipo favorito de fútbol</p>
          </div>
        </header>

        <nav className="main-nav bg-blue-600 text-white p-4 shadow-lg">
          <div className="container mx-auto">
            <ul>
              <li>
                <Link to="/">Equipos</Link>
              </li>
              <li>
                <Link to="/timeline">Timeline</Link>
              </li>
              <li>
                <Link to="/preferences">Preferencias</Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="container mx-auto py-8 px-4">
          <Routes>
            <Route path="/" element={
              <TeamSelector
                selectedTeam={selectedTeam}
                onTeamSelect={setSelectedTeam}
              />
            } />
            <Route path="/timeline" element={
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {selectedTeam && (
                      <img
                        src={selectedTeam.logo}
                        alt={`${selectedTeam.name} logo`}
                        className="w-16 h-16 object-contain"
                      />
                    )}
                    <h2 className="text-2xl font-semibold text-gray-800">{selectedTeam ? selectedTeam.name : 'Tu equipo'}</h2>
                  </div>
                  {selectedTeam && (
                    <button
                      onClick={() => setSelectedTeam(null)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Cambiar equipo
                    </button>
                  )}
                </div>

                <Timeline items={timelineItems} />
              </div>
            } />
            <Route path="/preferences" element={
              <PreferencesForm
                notifications={notifications}
                content={content}
                onNotificationsChange={setNotifications}
                onContentChange={setContent}
              />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
