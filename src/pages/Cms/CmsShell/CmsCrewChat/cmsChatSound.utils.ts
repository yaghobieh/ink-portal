import { SETTINGS_CHAT_SOUND } from '../../SettingsPages/SettingsPages.const';
import type { CmsChatPrefs } from '../../SettingsPages/SettingsPages.types';
import type { CmsChatRoom } from '../CmsLive.types';
import { CREW_CHAT_BEEP_HZ, CREW_CHAT_BEEP_MS, CREW_CHAT_PRIVATE_SIZE } from './CmsCrewChat.const';

export const isPrivateRoom = (room: CmsChatRoom): boolean =>
  room.userIds.length <= CREW_CHAT_PRIVATE_SIZE && !room.tag;

export const shouldPlayChatSound = (prefs: CmsChatPrefs, room: CmsChatRoom): boolean => {
  if (prefs.roomSounds[room.id] === false) return false;
  if (prefs.sound === SETTINGS_CHAT_SOUND.OFF) return false;
  if (prefs.sound === SETTINGS_CHAT_SOUND.ALL) return true;
  const privateRoom = isPrivateRoom(room);
  if (prefs.sound === SETTINGS_CHAT_SOUND.PRIVATE) return privateRoom;
  return !privateRoom;
};

export const playChatSound = (): void => {
  const AudioContextCtor = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextCtor) return;
  const context = new AudioContextCtor();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.value = CREW_CHAT_BEEP_HZ;
  gain.gain.value = 0.08;
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  window.setTimeout(() => {
    oscillator.stop();
    void context.close();
  }, CREW_CHAT_BEEP_MS);
};
