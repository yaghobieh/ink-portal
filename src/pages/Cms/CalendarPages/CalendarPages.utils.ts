import type { CalendarEvent, CalendarPerson } from '@forgedevstack/calendar';
import type { CmsMeeting } from '@sdk/modules/cms';
import type { CrewUser } from '../CrewPages/CrewPages.const';
import { CALENDAR_DEFAULT_DURATION_MS } from './CalendarPages.const';

export const toCalendarPeople = (users: CrewUser[]): CalendarPerson[] =>
  users.map((user) => ({
    id: user.id,
    name: user.name || user.username || user.email,
    fullName: user.name,
    email: user.email,
  }));

export const toCalendarEvents = (meetings: CmsMeeting[]): CalendarEvent[] =>
  meetings.map((meeting) => ({
    id: meeting.id,
    title: meeting.title,
    start: meeting.startAt,
    end: meeting.endAt,
    description: meeting.description,
    peopleIds: meeting.peopleIds,
    meetingUrl: meeting.meetingUrl,
  }));

export const eventToInput = (event: CalendarEvent) => {
  const start = new Date(event.start);
  const end = event.end ? new Date(event.end) : new Date(start.getTime() + CALENDAR_DEFAULT_DURATION_MS);
  return {
    title: event.title,
    description: event.description || '',
    startAt: start.toISOString(),
    endAt: end.toISOString(),
    meetingUrl: event.meetingUrl || '',
    peopleIds: event.peopleIds ?? [],
  };
};
