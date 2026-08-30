import { useState, type FC, type FormEvent, type KeyboardEvent } from 'react';
import { BearIcons, Button, EmojiPicker, Flex, Input, Typography } from '@forgedevstack/bear';
import { NUMBER_ZERO } from '@const/numbers.const';
import { CMS_ICON_SIZE, CMS_KEY_ENTER } from '@pages/Cms/CmsShell/CmsShell.const';
import {
  CREW_CHAT_INPUT_ID,
  CREW_EMOJI_PICKER_MAX_HEIGHT,
  CREW_EMOJI_PICKER_SIZE,
  CREW_MENTION_AT,
} from '@pages/Cms/CmsShell/CmsCrewChat/CmsCrewChat.const';
import type { CrewChatComposerProps, CrewMentionPerson } from '@pages/Cms/CmsShell/CmsCrewChat/CmsCrewChat.types';
import { mentionNeedle } from '@pages/Cms/CmsShell/CmsCrewChat/CmsCrewChat.utils';

export const CrewChatComposer: FC<CrewChatComposerProps> = (props) => {
  const {
    body,
    placeholder,
    sendLabel,
    attachLabel,
    mentionHint,
    emojiLabel,
    people,
    disabled,
    onBody,
    onSend,
    onMention,
  } = props;
  const [emojiOpen, setEmojiOpen] = useState(false);
  const needle = mentionNeedle(body);
  const matches =
    needle === null
      ? []
      : people.filter((person) => person.name.toLowerCase().includes(needle));

  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSend();
  };

  const onComposerKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== CMS_KEY_ENTER || event.shiftKey) return;
    event.preventDefault();
    onSend();
  };

  return (
    <form className="ink-cms-crew__composer" onSubmit={submit}>
      {emojiOpen && (
        <div className="ink-cms-crew__emoji">
          <EmojiPicker
            size={CREW_EMOJI_PICKER_SIZE}
            maxHeight={CREW_EMOJI_PICKER_MAX_HEIGHT}
            onSelect={(emoji) => {
              onBody(`${body}${emoji}`);
              setEmojiOpen(false);
            }}
          />
        </div>
      )}
      {needle !== null && matches.length > NUMBER_ZERO && (
        <Flex direction="column" gap={1} className="ink-cms-crew__mentions">
          <Typography variant="caption" className="ink-cms__muted mb-0">
            {mentionHint}
          </Typography>
          {matches.map((person: CrewMentionPerson) => (
            <button
              key={person.id}
              type="button"
              className="ink-cms-crew__mention"
              onClick={() => onMention(person)}
            >
              <span
                className={
                  person.online ? 'ink-cms-crew__dot ink-cms-crew__dot--on' : 'ink-cms-crew__dot'
                }
              />
              <span>{person.name}</span>
            </button>
          ))}
        </Flex>
      )}
      <Flex align="center" gap={2} className="ink-cms-crew__composer-bar">
        <Button type="button" size="sm" variant="ghost" aria-label={attachLabel}>
          <BearIcons.FileIcon size={CMS_ICON_SIZE} />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          aria-label={mentionHint}
          onClick={() => onBody(`${body}${CREW_MENTION_AT}`)}
        >
          <BearIcons.AtSignIcon size={CMS_ICON_SIZE} />
        </Button>
        <Input
          id={CREW_CHAT_INPUT_ID}
          value={body}
          placeholder={placeholder}
          fullWidth
          onChange={(event) => onBody(event.target.value)}
          onKeyDown={onComposerKey}
        />
        <Button
          type="button"
          size="sm"
          variant="ghost"
          aria-label={emojiLabel}
          aria-expanded={emojiOpen}
          onClick={() => setEmojiOpen((open) => !open)}
        >
          <BearIcons.EmojiIcon size={CMS_ICON_SIZE} />
        </Button>
        <Button
          type="submit"
          size="sm"
          variant="ink"
          className="ink-cms-crew__send"
          disabled={disabled}
          aria-label={sendLabel}
        >
          <BearIcons.SendIcon size={CMS_ICON_SIZE} />
        </Button>
      </Flex>
    </form>
  );
};
