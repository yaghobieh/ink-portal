import { useState, type FC } from 'react';
import { Alert, Card, Flex, Typography, useBear } from '@forgedevstack/bear';
import {
  InkWorkspace,
  INK_AI_OPENAI_MODEL_GPT_4_1_MINI,
} from '@forgedevstack/ink';
import type { InkDocument, InkSplitMode } from '@forgedevstack/ink';
import { Layout } from '@components/Layout';
import { useInkPremium } from '@hooks/index';
import { useI18n } from '@i18n/index';
import {
  LAB_COLLABORATORS,
  LAB_FEATURES,
  LAB_INITIAL_STATE,
  LAB_OPENAI_KEY,
  LAB_TOOLBAR,
} from './Lab.const';
import { registerLabAiProviders, resolveLabAiProviderId } from './Lab.ai';

registerLabAiProviders();

export const Lab: FC = () => {
  const { t } = useI18n();
  const { mode } = useBear();
  const { premium, active } = useInkPremium();
  const [documents, setDocuments] = useState<InkDocument[]>(LAB_INITIAL_STATE.documents);
  const [activeDocId, setActiveDocId] = useState<string>(LAB_INITIAL_STATE.activeDocumentId);
  const [secondaryDocId, setSecondaryDocId] = useState<string | null>(LAB_INITIAL_STATE.secondaryDocumentId);
  const [splitMode, setSplitMode] = useState<InkSplitMode>(LAB_INITIAL_STATE.splitMode);
  const providerId = resolveLabAiProviderId();
  const colorMode = mode === 'dark' ? 'dark' : 'light';

  const handleDocumentChange = (id: string, newContent: string) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, content: newContent, isDirty: true, updatedAt: Date.now() } : doc))
    );
  };

  const handleDocumentCreate = (title?: string, folderId?: string) => {
    const newDocId = `doc-${Date.now()}`;
    const newDoc: InkDocument = {
      id: newDocId,
      title: title || 'Untitled Document',
      content: '<p>Start typing...</p>',
      folderId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setDocuments((prev) => [...prev, newDoc]);
    setActiveDocId(newDocId);
  };

  const handleDocumentDelete = (id: string) => {
    setDocuments((prev) => {
      const filtered = prev.filter((doc) => doc.id !== id);
      if (activeDocId === id && filtered.length > 0) {
        setActiveDocId(filtered[0].id);
      }
      return filtered;
    });
  };

  const handleDocumentRename = (id: string, newTitle: string) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, title: newTitle } : doc))
    );
  };

  const handleDocumentSave = (id: string) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, isDirty: false } : doc))
    );
  };

  return (
    <Layout>
      <div className="fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Flex direction="column" gap={4}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <Typography variant="h1" className="text-3xl font-bold tracking-tight mb-1">
                {t.lab.title} (Ink v1.1.9)
              </Typography>
              <Typography variant="body1" className="ink-text-muted mb-0">
                {t.lab.description} — Interactive Multi-Document Workspace & Real-Time Collaboration
              </Typography>
            </div>
          </div>

          <Alert severity="info">{t.lab.note}</Alert>
          {LAB_OPENAI_KEY ? (
            <Alert severity="success">{t.lab.aiOpenAiReady}</Alert>
          ) : (
            <Alert severity="warning">{t.lab.aiOpenAiMissing}</Alert>
          )}

          <Card className="p-0 overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800" style={{ height: '750px', display: 'flex' }}>
            <InkWorkspace
              documents={documents}
              activeDocumentId={activeDocId}
              onActiveDocumentChange={setActiveDocId}
              onDocumentChange={handleDocumentChange}
              onDocumentCreate={handleDocumentCreate}
              onDocumentDelete={handleDocumentDelete}
              onDocumentRename={handleDocumentRename}
              onDocumentSave={handleDocumentSave}
              folders={LAB_INITIAL_STATE.folders}
              splitMode={splitMode}
              onSplitModeChange={setSplitMode}
              secondaryDocumentId={secondaryDocId}
              onSecondaryDocumentChange={setSecondaryDocId}
              collaboration={{
                enabled: true,
                collaborators: LAB_COLLABORATORS,
                user: LAB_COLLABORATORS[0],
                roomId: 'ink-lab-sandbox',
                showPresenceStack: true,
                showRemoteCursors: true,
              }}
              editorProps={{
                minHeight: 480,
                toolbar: LAB_TOOLBAR,
                typoAutoFix: true,
                showCharCount: true,
                variant: 'classic',
                chrome: 'borderless',
                colorMode,
                premium,
                pasteMode: active ? 'rich' : 'plain',
                wysiwyg: active,
                features: LAB_FEATURES,
                placeholder: t.lab.placeholder,
                ai: {
                  enabled: true,
                  openOnInit: false,
                  placement: 'sidebar',
                  showHistory: true,
                  providerId,
                  modelId: INK_AI_OPENAI_MODEL_GPT_4_1_MINI,
                  autocomplete: true,
                },
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </Card>
        </Flex>
      </div>
    </Layout>
  );
};
