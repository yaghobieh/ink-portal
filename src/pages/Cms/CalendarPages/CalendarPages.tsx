import { useEffect, useState, type FC } from 'react';
import { Calendar } from '@forgedevstack/calendar';
import type { CalendarEvent } from '@forgedevstack/calendar';
import {
  Badge,
  Button,
  Card,
  Dropdown,
  Flex,
  Input,
  Typography,
} from '@forgedevstack/bear';
import { useAuth } from '@hooks/index';
import { useI18n } from '@i18n/index';
import { EMPTY_STRING } from '@const/index';
import {
  createMeetingRequest,
  fetchCrewUsers,
  fetchMeetings,
  updateMeetingRequest,
} from '@sdk/modules/cms';
import type { CrewUser } from '../CrewPages/CrewPages.const';
import { CmsGridTable, CmsShell, CMS_NAV_IDS } from '../CmsShell';
import { loadCmsThemeColors } from '../SettingsPages';
import {
  loadCmsModePreference,
  resolveCmsMode,
} from '../CmsShell/CmsShell.utils';
import {
  CALENDAR_DEFAULT_DURATION_MS,
  CALENDAR_EMPTY,
  CALENDAR_PAGE_ID,
  CALENDAR_TITLE_INPUT_ID,
} from './CalendarPages.const';
import { eventToInput, toCalendarEvents, toCalendarPeople } from './CalendarPages.utils';

type MeetingRow = {
  id: string;
  title: string;
  start: string;
  people: number;
};

export const CalendarPages: FC = () => {
  const { t } = useI18n();
  const { token } = useAuth();
  const colors = loadCmsThemeColors();
  const calendarMode = resolveCmsMode(loadCmsModePreference());
  const [users, setUsers] = useState<CrewUser[]>([]);
  const [meetings, setMeetings] = useState<CalendarEvent[]>([]);
  const [draftTitle, setDraftTitle] = useState(CALENDAR_EMPTY);
  const [draftUserIds, setDraftUserIds] = useState<string[]>([]);

  useEffect(() => {
    if (!token) return;
    void Promise.all([fetchCrewUsers(token), fetchMeetings(token)]).then(
      ([nextUsers, nextMeetings]) => {
        if (nextUsers) setUsers(nextUsers);
        if (nextMeetings) setMeetings(toCalendarEvents(nextMeetings));
      },
    );
  }, [token]);

  const persistEvent = async (event: CalendarEvent) => {
    if (!token) return;
    const input = eventToInput(event);
    if (event.id && meetings.some((item) => item.id === event.id)) {
      const updated = await updateMeetingRequest(token, event.id, input);
      if (updated) {
        setMeetings((current) =>
          current.map((item) => (item.id === updated.id ? toCalendarEvents([updated])[0] : item)),
        );
      }
      return;
    }
    const created = await createMeetingRequest(token, input);
    if (created) {
      setMeetings((current) => [...current, ...toCalendarEvents([created])]);
    }
  };

  const toggleUser = (id: string) => {
    setDraftUserIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const onGenerate = async () => {
    if (!token || !draftTitle.trim()) return;
    const start = new Date();
    const created = await createMeetingRequest(token, {
      title: draftTitle.trim(),
      description: EMPTY_STRING,
      startAt: start.toISOString(),
      endAt: new Date(start.getTime() + CALENDAR_DEFAULT_DURATION_MS).toISOString(),
      meetingUrl: EMPTY_STRING,
      peopleIds: draftUserIds,
    });
    if (created) {
      setMeetings((current) => [...current, ...toCalendarEvents([created])]);
      setDraftTitle(CALENDAR_EMPTY);
      setDraftUserIds([]);
    }
  };

  const people = toCalendarPeople(users);
  const rows: MeetingRow[] = meetings.map((meeting) => ({
    id: meeting.id,
    title: meeting.title,
    start: new Date(meeting.start).toLocaleString(),
    people: (meeting.peopleIds ?? []).length,
  }));
  const calendarTheme =
    calendarMode === 'dark'
      ? {
          primary: colors.accent || colors.primary,
          today: colors.accent || colors.primary,
          event: colors.accent || colors.primary,
        }
      : {
          primary: colors.accent || colors.primary,
          background: colors.background,
          today: colors.accent || colors.primary,
          event: colors.accent || colors.primary,
        };

  return (
    <CmsShell activeNavId={CMS_NAV_IDS.CALENDAR}>
      <Flex direction="column" gap={4} id={CALENDAR_PAGE_ID}>
        <div>
          <Typography variant="h2" className="mb-1">
            {t.cmsCalendar.title}
          </Typography>
          <Typography variant="body2" className="ink-cms__muted mb-0">
            {t.cmsCalendar.subtitle}
          </Typography>
        </div>
        <Card className="ink-cms-card">
          <Typography variant="h4" className="mb-2">
            {t.cmsCalendar.generateMeeting}
          </Typography>
          <Typography variant="caption" className="ink-cms__muted mb-3 block">
            {t.cmsCalendar.notifyHint}
          </Typography>
          <Flex gap={2} align="end" wrap="wrap">
            <Input
              id={CALENDAR_TITLE_INPUT_ID}
              label={t.cmsCalendar.titleLabel}
              value={draftTitle}
              onChange={(event) => setDraftTitle(event.target.value)}
            />
            <Dropdown
              searchable
              closeOnSelect={false}
              placement="bottom-start"
              trigger={
                <Button size="sm" variant="outline">
                  {t.cmsCalendar.addUser}
                </Button>
              }
              items={users.map((user) => ({
                key: user.id,
                label: user.name || user.username || user.email,
                selected: draftUserIds.includes(user.id),
                onClick: () => toggleUser(user.id),
              }))}
            />
            <Button variant="ink" onClick={() => void onGenerate()} disabled={!draftTitle.trim()}>
              {t.cmsCalendar.create}
            </Button>
          </Flex>
          <Flex gap={1} className="flex-wrap mt-2">
            {draftUserIds.map((id) => {
              const user = users.find((item) => item.id === id);
              if (!user) return null;
              return (
                <Badge key={id} variant="info" className="text-xs">
                  {user.name || user.username || user.email}
                </Badge>
              );
            })}
          </Flex>
        </Card>
        <Card className="ink-cms-card">
          <Calendar
            defaultView="week"
            events={meetings}
            people={people}
            mode={calendarMode}
            theme={calendarTheme}
            onEventCreate={(event) => void persistEvent(event)}
            onEventChange={(event) => void persistEvent(event)}
            layout="contained"
          />
        </Card>
        <Card className="ink-cms-card">
          <Typography variant="h4" className="mb-2">
            {t.cmsCalendar.meetings}
          </Typography>
          <CmsGridTable
            data={rows}
            columns={[
              { id: 'title', header: t.cmsCalendar.titleLabel, accessor: 'title' },
              { id: 'start', header: t.cmsCalendar.start, accessor: 'start' },
              { id: 'people', header: t.cmsCalendar.taggedUsers, accessor: 'people' },
            ]}
            emptyContent={t.cmsCalendar.empty}
          />
        </Card>
      </Flex>
    </CmsShell>
  );
};
