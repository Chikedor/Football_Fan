export const sampleTimelineData = [
  {
    id: '1',
    type: 'match',
    title: 'Real Madrid vs Barcelona',
    description: 'Próximo Clásico - Jornada 12 de LaLiga',
    date: new Date(2024, 11, 15, 21, 0), // 15 de Diciembre a las 21:00
  },
  {
    id: '2',
    type: 'news',
    title: 'Entrenamiento del equipo',
    description: 'El equipo completó la sesión de entrenamiento con todos los jugadores disponibles',
    date: new Date(2024, 11, 8, 11, 30), // 8 de Diciembre a las 11:30
  },
  {
    id: '3',
    type: 'injury',
    title: 'Parte médico',
    description: 'Modric sufre molestias musculares y será baja durante 2 semanas',
    date: new Date(2024, 11, 7, 15, 45), // 7 de Diciembre a las 15:45
  },
  {
    id: '4',
    type: 'conference',
    title: 'Rueda de prensa pre-partido',
    description: 'El entrenador analiza el próximo encuentro contra el Barcelona',
    date: new Date(2024, 11, 14, 12, 0), // 14 de Diciembre a las 12:00
  },
  {
    id: '5',
    type: 'transfer',
    title: 'Rumores de fichajes',
    description: 'El club está interesado en reforzar la delantera en el mercado de invierno',
    date: new Date(2024, 11, 6, 9, 15), // 6 de Diciembre a las 9:15
  }
] as const;
