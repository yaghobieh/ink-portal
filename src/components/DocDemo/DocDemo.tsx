import { useState, type FC } from 'react';
import { Button, Flex, Typography } from '@forgedevstack/bear';
import { InkEditor, type InkCommentThread, type InkTrackChange } from '@forgedevstack/ink';
import { DOC_DEMO_MIN_HEIGHT_PX } from '@const/numbers.const';
import { EMPTY_STRING } from '@const/strings.const';
import type { DocDemoBlock } from '@const/docsContent.types';

type DocDemoTab = 'preview' | 'code' | 'html' | 'payload';

export const DocDemo: FC<DocDemoBlock> = (props) => {
  const {
    title,
    description,
    initialHtml,
    code,
    editor = {},
    payload,
    showLiveHtml = true,
  } = props;
  const [html, setHtml] = useState(initialHtml);
  const [comments, setComments] = useState<InkCommentThread[]>(editor.comments ?? []);
  const [trackChanges, setTrackChanges] = useState<InkTrackChange[]>(editor.trackChanges ?? []);
  const [tab, setTab] = useState<DocDemoTab>('preview');

  const livePayload = {
    html,
    comments,
    trackChanges,
    ...(payload?.data && typeof payload.data === 'object' ? (payload.data as object) : {}),
  };

  const tabs: { id: DocDemoTab; label: string; hidden?: boolean }[] = [
    { id: 'preview', label: 'Demo' },
    { id: 'code', label: 'Code' },
    { id: 'html', label: 'HTML', hidden: !showLiveHtml },
    { id: 'payload', label: 'Payload' },
  ];

  return (
    <div className="ink-doc-demo rounded-xl border border-slate-200 bg-white overflow-hidden my-4">
      <Flex justify="between" align="start" className="gap-3 p-4 border-b border-slate-100 flex-wrap">
        <div className="min-w-0">
          {title ? (
            <Typography variant="h4" className="text-base font-semibold m-0">
              {title}
            </Typography>
          ) : null}
          {description ? (
            <Typography variant="body2" className="ink-text-muted mt-1 mb-0">
              {description}
            </Typography>
          ) : null}
        </div>
        <Flex gap={2} className="flex-wrap shrink-0">
          {tabs
            .filter((item) => !item.hidden)
            .map((item) => (
              <Button
                key={item.id}
                size="sm"
                variant={tab === item.id ? 'ink' : 'outline'}
                onClick={() => setTab(item.id)}
              >
                {item.label}
              </Button>
            ))}
        </Flex>
      </Flex>

      {tab === 'preview' ? (
        <div className="p-4 bg-[#fafafa]">
          <div className="ink-paper p-1">
            <InkEditor
              value={html}
              onChange={setHtml}
              minHeight={editor.minHeight ?? DOC_DEMO_MIN_HEIGHT_PX}
              toolbar={editor.toolbar}
              features={editor.features}
              variant={editor.variant}
              keepInMemory={editor.keepInMemory}
              memoryKey={editor.memoryKey}
              trackChangesEnabled={editor.trackChangesEnabled}
              trackChanges={trackChanges}
              onTrackChangesChange={setTrackChanges}
              comments={comments}
              onCommentsChange={setComments}
              showCommentsPanel={editor.showCommentsPanel}
              ai={editor.ai}
              typoAutoFix={editor.typoAutoFix}
              showCharCount={editor.showCharCount}
              author={editor.author}
              tableRows={editor.tableRows}
              tableCols={editor.tableCols}
              placeholder={editor.placeholder}
              slashCommands={editor.slashCommands}
            />
          </div>
        </div>
      ) : null}

      {tab === 'code' ? <pre className="ink-code m-0 rounded-none border-0">{code}</pre> : null}

      {tab === 'html' ? (
        <pre className="ink-code m-0 rounded-none border-0">{html || EMPTY_STRING}</pre>
      ) : null}

      {tab === 'payload' ? (
        <pre className="ink-code m-0 rounded-none border-0">
          {JSON.stringify(livePayload, null, 2)}
        </pre>
      ) : null}
    </div>
  );
};
