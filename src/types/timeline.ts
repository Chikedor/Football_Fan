export interface TimelineItem {
  id: string;
  type: 'match' | 'news' | 'transfer' | 'injury' | 'conference';
  title: string;
  description: string;
  date: Date;
  icon?: string;
}
