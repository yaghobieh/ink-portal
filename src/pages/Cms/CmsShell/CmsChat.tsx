import { useState, type FC, type FormEvent } from 'react';
import {
  BearIcons,
  Button,
  Drawer,
  Flex,
  Input,
  Spinner,
  Typography,
} from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { CMS_ICON_SIZE } from '@const/numbers.const';
import { CMS_CHAT_EMPTY, CMS_CHAT_INPUT_ID, HTTP_FORBIDDEN, HTTP_NOT_IMPLEMENTED } from './CmsChat.const';
import type { CmsChatMessage } from './CmsChat.types';
import { completeCmsChat, loadChatHistory, saveChatHistory } from './CmsChat.utils';

type CmsChatProps = {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  side: 'left' | 'right';
};

const chatErrorCopy = (
  status: number,
  t: ReturnType<typeof useI18n>['t'],
): string => {
  if (status === HTTP_FORBIDDEN) return t.cmsShell.chatErrorPlan;
  if (status === HTTP_NOT_IMPLEMENTED) return t.cmsShell.chatErrorConfig;
  return t.cmsShell.chatErrorGeneric;
};

export const CmsChat: FC<CmsChatProps> = (props) => {
  const { isOpen, onClose, token, side } = props;
  const { t } = useI18n();
  const [messages, setMessages] = useState<CmsChatMessage[]>(() => loadChatHistory());
  const [draft, setDraft] = useState(CMS_CHAT_EMPTY);
  const [pending, setPending] = useState(false);

  const persist = (next: CmsChatMessage[]) => {
    setMessages(next);
    saveChatHistory(next);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const prompt = draft.trim();
    if (!prompt || pending) return;
    const userMessage: CmsChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: prompt,
    };
    const next = [...messages, userMessage];
    persist(next);
    setDraft(CMS_CHAT_EMPTY);
    setPending(true);
    const result = await completeCmsChat(token, prompt);
    const assistant: CmsChatMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      text: result.ok ? result.text : chatErrorCopy(result.status, t),
    };
    persist([...next, assistant]);
    setPending(false);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      side={side}
      size="md"
      title={t.cmsShell.chat}
    >
      <Flex direction="column" gap={3} className="ink-cms-chat">
        <Typography variant="body2" className="ink-cms__muted mb-0">
          {t.cmsShell.chatHint}
        </Typography>
        <div className="ink-cms-chat__log">
          {messages.length === 0 ? (
            <Typography variant="body2" className="ink-cms__muted mb-0">
              {t.cmsShell.chatEmpty}
            </Typography>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`ink-cms-chat__bubble ink-cms-chat__bubble--${message.role}`}
              >
                <Typography variant="caption" className="mb-1">
                  {message.role === 'user' ? t.cmsShell.chatYou : t.cmsShell.chatAssistant}
                </Typography>
                <Typography variant="body2" className="mb-0">
                  {message.text}
                </Typography>
              </div>
            ))
          )}
          {pending ? (
            <Flex align="center" gap={2}>
              <Spinner size="sm" />
              <Typography variant="caption" className="mb-0">
                {t.cmsShell.chatPending}
              </Typography>
            </Flex>
          ) : null}
        </div>
        <form onSubmit={(event) => void onSubmit(event)} className="ink-cms-chat__form">
          <Input
            id={CMS_CHAT_INPUT_ID}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={t.cmsShell.chatPlaceholder}
            disabled={pending}
          />
          <Button
            type="submit"
            size="sm"
            variant="ink"
            icon={<BearIcons.SparklesIcon size={CMS_ICON_SIZE} />}
            disabled={pending || !draft.trim()}
          >
            {t.cmsShell.chatSend}
          </Button>
        </form>
      </Flex>
    </Drawer>
  );
};
