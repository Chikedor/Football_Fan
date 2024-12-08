export interface Team {
  id: string;
  name: string;
  logo: string;
}

export interface NotificationPreference {
  beforeWeek: boolean;
  beforeDay: boolean;
  before10Hours: boolean;
  before3Hours: boolean;
  before1Hour: boolean;
}

export interface ContentPreference {
  matchSummaries: boolean;
  teamStats: boolean;
  clubNews: boolean;
  pressConferences: boolean;
  injuriesAndSuspensions: boolean;
  transferNews: boolean;
}
