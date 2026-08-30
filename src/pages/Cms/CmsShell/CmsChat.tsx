import { useState, type FC, type FormEvent } from 'react';
import {
  BearIcons,
  Button,
  Chip,
  Drawer,
  Flex,
  Input,
  Typography,
} from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { CMS_ICON_SIZE } from '@const/numbers.const';
import {
  CMS_CHAT_EMPTY,
  CMS_CHAT_INPUT_ID,
  CMS_CHAT_PROMPT_IDS,
  CMS_CHAT_PROMPTS,
  HTTP_FORBIDDEN,
  HTTP_NOT_IMPLEMENTED,
} from './CmsChat.const';
import type { CmsChatMessage, CmsChatProps } from './CmsChat.types';
import { completeCmsChat, loadChatHistory, saveChatHistory } from './CmsChat.utils';

const chatErrorCopy = (
  status: number,
  t: ReturnType<typeof useI18n>['t'],
): string => {
  if (status === HTTP_FORBIDDEN) return t.cmsShell.chatErrorPlan;
  if (status === HTTP_NOT_IMPLEMENTED) return t.cmsShell.chatErrorConfig;
  return t.cmsShell.chatErrorGeneric;
};

const promptAsk = (
  id: string,
  t: ReturnType<typeof useI18n>['t'],
): string => {
  if (id === CMS_CHAT_PROMPT_IDS.CREATE_PAGE) return t.cmsShell.chatAskCreatePage;
  if (id === CMS_CHAT_PROMPT_IDS.TEMPLATE) return t.cmsShell.chatAskTemplate;
  return t.cmsShell.chatAskTheme;
};

const promptLabel = (
  id: string,
  t: ReturnType<typeof useI18n>['t'],
): string => {
  if (id === CMS_CHAT_PROMPT_IDS.CREATE_PAGE) return t.cmsShell.chatPromptCreatePage;
  if (id === CMS_CHAT_PROMPT_IDS.TEMPLATE) return t.cmsShell.chatPromptTemplate;
  return t.cmsShell.chatPromptTheme;
};

export const CmsChat: FC<CmsChatProps> = (props) => {
  const { isOpen, onClose, token, side, crewAvailable, onOpenCrew } = props;
  const { t } = useI18n();
  const [messages, setMessages] = useState<CmsChatMessage[]>(() => loadChatHistory());
  const [draft, setDraft] = useState(CMS_CHAT_EMPTY);
  const [pending, setPending] = useState(false);

  const persist = (next: CmsChatMessage[]) => {
    setMessages(next);
    saveChatHistory(next);
  };

  const appendAssistant = (text: string) => {
    const assistant: CmsChatMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      text,
    };
    persist([...messages, assistant]);
  };

  const onPrompt = (id: string) => {
    if (pending) return;
    appendAssistant(promptAsk(id, t));
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
        {crewAvailable && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            icon={<BearIcons.UsersIcon size={CMS_ICON_SIZE} />}
            onClick={() => {
              onClose();
              onOpenCrew();
            }}
          >
            {t.cmsShell.chatOpenCrew}
          </Button>
        )}
        <Flex wrap="wrap" gap={2} className="ink-cms-chat__prompts">
          {CMS_CHAT_PROMPTS.map((id) => (
            <Chip key={id} onClick={() => onPrompt(id)}>
              {promptLabel(id, t)}
            </Chip>
          ))}
        </Flex>
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
              <span className="ink-cms-glow-mark ink-cms-glow-mark--sm" aria-hidden="true" />
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
