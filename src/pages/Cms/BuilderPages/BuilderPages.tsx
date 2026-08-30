import { type DragEvent, type FC, type MouseEvent } from 'react';
import { BearIcons, Button, Card, Dropdown, Flex, Input, Tab, TabList, TabPanel, Tabs, Typography } from '@forgedevstack/bear';
import { InkEditor } from '@forgedevstack/ink';
import { cmsInkAiProps } from '@/ai/index';
import { CMS_ICON_SIZE } from '@const/numbers.const';
import { ROUTES } from '@const/index';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import {
  BUILDER_INK_MIN_HEIGHT_PX,
  BUILDER_INSPECTOR_NONE,
  BUILDER_INSPECTOR_TAB,
  BUILDER_LAYER_MAX_DEPTH,
  BUILDER_MENU_ACTION,
  BUILDER_MENU_OFFSET_PX,
  BUILDER_PREVIEW_MIN_WIDTH_PX,
  BUILDER_STAGE_TAB,
  BUILDER_STYLE_EMPTY,
  BUILDER_THREE_COLUMNS,
  BUILDER_TWO_COLUMNS,
  BUILDER_VIEWPORT,
  BUILDER_VIEWPORT_WIDTH_PX,
  AI_STYLE_SUGGESTIONS,
  CANVAS_KIND,
  DEFAULT_INK_FALLBACK,
  EMPTY_NODE_STYLES,
  LAYOUT_BLOCKS,
  STYLE_FIELD_KEYS,
} from './BuilderPages.const';
import type { BuilderInspectorTab, CanvasNode } from './BuilderPages.types';
import { nodeStyleObject, updateNodeCss, updateNodeHtml, updateNodeJs, updateNodeLabel, updateNodeStyles } from './BuilderPages.utils';
import { BuilderBoardNiche } from './BuilderBoardNiche';
import { BuilderCodeField } from './BuilderCodeField';
import { useBuilderPages } from './hooks';

export const BuilderPages: FC = () => {
  const {
    t,
    installed,
    tree,
    selectedId,
    setSelectedId,
    setDropParentId,
    menu,
    setMenu,
    saved,
    setSaved,
    targetId,
    viewport,
    setViewport,
    preview,
    setPreview,
    inspectorTab,
    setInspectorTab,
    pageCode,
    setPageCode,
    customLabel,
    setCustomLabel,
    customHtml,
    setCustomHtml,
    previewWidth,
    setPreviewWidth,
    stageTab,
    paletteWidth,
    inspectorWidth,
    selected,
    selectedStyles,
    targetOptions,
    contentWidgets,
    formWidgets,
    layers,
    apply,
    addLayout,
    addWidget,
    addColumns,
    addCustomWidget,
    onDragStartWidget,
    onDragStartLayout,
    acceptDrop,
    onContextMenu,
    runMenu,
    onSave,
    onSaveAsTemplate,
    onTargetChange,
    onStageTab,
    onPaletteResize,
    onInspectorResize,
    isContainerKind,
    navigate,
  } = useBuilderPages();

  const renderNode = (node: CanvasNode) => {

    const selectedClass = node.id === selectedId ? ' ink-cms-canvas-node--selected' : '';
    const layoutClass = `ink-cms-canvas-node ink-cms-canvas-node--${node.kind}${selectedClass}`;
    const dynamicStyle = nodeStyleObject(node.styles);
    const onResizeStart = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const startX = event.clientX;
      const startY = event.clientY;
      const startWidth = event.currentTarget.parentElement?.offsetWidth || 0;
      const startHeight = event.currentTarget.parentElement?.offsetHeight || 0;
      const onMove = (moveEvent: globalThis.MouseEvent) => {
        apply(
          updateNodeStyles(tree, node.id, {
            ...EMPTY_NODE_STYLES,
            ...node.styles,
            width: `${Math.max(BUILDER_PREVIEW_MIN_WIDTH_PX / 4, startWidth + moveEvent.clientX - startX)}px`,
            height: `${Math.max(40, startHeight + moveEvent.clientY - startY)}px`,
          }),
        );
      };
      const onUp = () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    };
    return (
      <div
        key={node.id}
        className={layoutClass}
        data-node={node.id}
        style={dynamicStyle}
        onClick={(event) => {
          event.stopPropagation();
          setSelectedId(node.id);
          setDropParentId(isContainerKind(node.kind) ? node.id : BUILDER_INSPECTOR_NONE);
        }}
        onContextMenu={(event) => onContextMenu(event, node.id)}
        onDragOver={(event) => {
          if (isContainerKind(node.kind)) event.preventDefault();
        }}
        onDrop={(event) => {
          if (isContainerKind(node.kind)) acceptDrop(event, node.id);
        }}
      >
        {preview ? null : (
          <Typography variant="caption" className="ink-cms-canvas-node__label mb-0">
            {node.label}
          </Typography>
        )}
        {node.css ? <style>{`[data-node="${node.id}"]{${node.css}}`}</style> : null}
        {node.kind === CANVAS_KIND.INK ? (
          <InkEditor
            value={node.html || DEFAULT_INK_FALLBACK}
            onChange={(next) => apply(updateNodeHtml(tree, node.id, next))}
            colorMode="light"
            variant="document"
            minHeight={BUILDER_INK_MIN_HEIGHT_PX}
            features={{ blocks: true, slash: true, ai: true }}
            ai={cmsInkAiProps()}
          />
        ) : node.html ? (
          <div dangerouslySetInnerHTML={{ __html: node.html }} />
        ) : null}
        {node.children.map(renderNode)}
        {preview || node.id !== selectedId ? null : (
          <button
            type="button"
            className="ink-cms-canvas-node__resize"
            aria-label={t.cmsBuilder.resizeWidget}
            onMouseDown={onResizeStart}
          />
        )}
      </div>
    );
  };

  const stageViewportClass =
    viewport === BUILDER_VIEWPORT.TABLET
      ? ' ink-cms-builder__stage--tablet'
      : viewport === BUILDER_VIEWPORT.MOBILE
        ? ' ink-cms-builder__stage--mobile'
        : '';
  const stagePreviewClass = preview ? ' ink-cms-builder__stage--preview' : '';

  return (
    <CmsShell activeNavId={CMS_NAV_IDS.BUILDER}>
      <Flex direction="column" gap={4} className="ink-cms-builder">
        <div>
          <Typography variant="h2" className="mb-1">
            {t.cmsBuilder.title}
          </Typography>
          <Typography variant="body2" className="ink-cms__muted mb-0">
            {t.cmsBuilder.subtitle}
          </Typography>
        </div>
        <BuilderBoardNiche />
        {!installed ? (
          <Card className="ink-cms-card">
            <Typography variant="h4" className="mb-2">
              {t.cmsBuilder.lockedTitle}
            </Typography>
            <Typography variant="body2" className="mb-3">
              {t.cmsBuilder.lockedBody}
            </Typography>
            <Button
              size="sm"
              variant="ink"
              icon={<BearIcons.PackageIcon size={CMS_ICON_SIZE} />}
              onClick={() => navigate(ROUTES.CMS_EXTENSIONS)}
            >
              {t.cmsBuilder.openStore}
            </Button>
          </Card>
        ) : (
          <div
            className="ink-cms-builder__layout"
            style={{
              gridTemplateColumns: `${paletteWidth}px minmax(0, 1fr) ${inspectorWidth}px`,
            }}
          >
            <div className="ink-cms-builder__pane ink-cms-builder__pane--palette">
            <Card className="ink-cms-card ink-cms-builder__palette">
              <Typography variant="h4" className="mb-1">
                {t.cmsBuilder.palette}
              </Typography>
              <Typography variant="caption" className="ink-cms__muted mb-3 block">
                {t.cmsBuilder.layoutHint}
              </Typography>
              <Typography variant="caption" className="ink-cms-builder__group mb-2 block">
                {t.cmsBuilder.paletteGroupLayout}
              </Typography>
              <div className="ink-cms-widget-grid mb-4">
                {LAYOUT_BLOCKS.map((block) => (
                  <button
                    key={block.id}
                    type="button"
                    className="ink-cms-widget-chip"
                    draggable
                    onDragStart={(event) => onDragStartLayout(event, block.id)}
                    onClick={() => addLayout(block.id)}
                  >
                    <Typography variant="body2" className="mb-0 font-medium">
                      {block.label}
                    </Typography>
                  </button>
                ))}
                <button
                  type="button"
                  className="ink-cms-widget-chip"
                  onClick={() => addColumns(BUILDER_TWO_COLUMNS)}
                >
                  <Typography variant="body2" className="mb-0 font-medium">
                    {t.cmsBuilder.presetTwoColumns}
                  </Typography>
                </button>
                <button
                  type="button"
                  className="ink-cms-widget-chip"
                  onClick={() => addColumns(BUILDER_THREE_COLUMNS)}
                >
                  <Typography variant="body2" className="mb-0 font-medium">
                    {t.cmsBuilder.presetThreeColumns}
                  </Typography>
                </button>
              </div>
              <Typography variant="caption" className="ink-cms-builder__group mb-2 block">
                {t.cmsBuilder.paletteGroupContent}
              </Typography>
              <div className="ink-cms-widget-grid mb-4">
                {contentWidgets.map((widget) => (
                  <button
                    key={widget.id}
                    type="button"
                    className="ink-cms-widget-chip"
                    draggable
                    onDragStart={(event) => onDragStartWidget(event, widget.id)}
                    onClick={() => addWidget(widget.id)}
                  >
                    <Typography variant="body2" className="mb-0 font-medium">
                      {widget.label}
                    </Typography>
                  </button>
                ))}
              </div>
              <Typography variant="caption" className="ink-cms-builder__group mb-2 block">
                {t.cmsBuilder.paletteGroupForm}
              </Typography>
              <div className="ink-cms-widget-grid mb-4">
                {formWidgets.map((widget) => (
                  <button
                    key={widget.id}
                    type="button"
                    className="ink-cms-widget-chip"
                    draggable
                    onDragStart={(event) => onDragStartWidget(event, widget.id)}
                    onClick={() => addWidget(widget.id)}
                  >
                    <Typography variant="body2" className="mb-0 font-medium">
                      {widget.label}
                    </Typography>
                  </button>
                ))}
                  </div>
                  <Typography variant="caption" className="ink-cms-builder__group mb-2 block">
                    {t.cmsBuilder.customWidget}
                  </Typography>
                  <Flex direction="column" gap={2} className="mb-4">
                    <Input
                      label={t.cmsBuilder.customWidgetLabel}
                      value={customLabel}
                      onChange={(event) => setCustomLabel(event.target.value)}
                    />
                    <Input
                      label={t.cmsBuilder.customWidgetHtml}
                      value={customHtml}
                      onChange={(event) => setCustomHtml(event.target.value)}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={!customLabel.trim() || !customHtml.trim()}
                      onClick={addCustomWidget}
                    >
                      {t.cmsBuilder.customWidgetAdd}
                    </Button>
                  </Flex>
                  <Typography variant="h5" className="mb-2">
                {t.cmsBuilder.layers}
              </Typography>
              {layers.length === 0 ? (
                <Typography variant="caption" className="ink-cms__muted mb-0">
                  {t.cmsBuilder.layersEmpty}
                </Typography>
              ) : (
                <div className="ink-cms-layers">
                  {layers.map((row) => (
                    <button
                      key={row.id}
                      type="button"
                      className={`ink-cms-layers__row${row.id === selectedId ? ' ink-cms-layers__row--selected' : ''}`}
                      data-depth={Math.min(row.depth, BUILDER_LAYER_MAX_DEPTH)}
                      onClick={() => {
                        setSelectedId(row.id);
                        setDropParentId(
                          isContainerKind(row.kind) ? row.id : BUILDER_INSPECTOR_NONE,
                        );
                      }}
                    >
                      {row.label}
                    </button>
                  ))}
                </div>
              )}
            </Card>
            <button
              type="button"
              className="ink-cms-panel-resize"
              aria-label={t.cmsBuilder.palette}
              onMouseDown={onPaletteResize}
            />
            </div>
            <Card className="ink-cms-card ink-cms-builder__canvas">
              <div className="ink-cms-builder__toolbar">
                <Tabs
                  value={stageTab}
                  defaultTab={BUILDER_STAGE_TAB.CANVAS}
                  variant="line"
                  onChange={onStageTab}
                >
                  <TabList>
                    <Tab id={BUILDER_STAGE_TAB.CANVAS}>{t.cmsBuilder.canvas}</Tab>
                    <Tab id={BUILDER_STAGE_TAB.CONTENT}>{t.cmsBuilder.inspectorContent}</Tab>
                    <Tab id={BUILDER_STAGE_TAB.STYLE}>{t.cmsBuilder.inspectorStyle}</Tab>
                    <Tab id={BUILDER_STAGE_TAB.CODE}>{t.cmsBuilder.inspectorCode}</Tab>
                  </TabList>
                </Tabs>
                <div className="ink-cms-builder__toolbar-actions">
                  <Button
                    size="sm"
                    variant={viewport === BUILDER_VIEWPORT.DESKTOP ? 'ink' : 'outline'}
                    icon={<BearIcons.DesktopIcon size={CMS_ICON_SIZE} />}
                    aria-label={t.cmsBuilder.viewportDesktop}
                    onClick={() => {
                      setViewport(BUILDER_VIEWPORT.DESKTOP);
                      setPreview(false);
                    }}
                  >
                    {t.cmsBuilder.viewportDesktop}
                  </Button>
                  <Button
                    size="sm"
                    variant={viewport === BUILDER_VIEWPORT.MOBILE ? 'ink' : 'outline'}
                    icon={<BearIcons.PhoneIcon size={CMS_ICON_SIZE} />}
                    aria-label={t.cmsBuilder.viewportMobile}
                    onClick={() => {
                      setViewport(BUILDER_VIEWPORT.MOBILE);
                      setPreview(false);
                    }}
                  >
                    {t.cmsBuilder.viewportMobile}
                  </Button>
                  <Dropdown
                    placement="bottom-end"
                    trigger={
                      <Button size="sm" variant="outline" aria-label={t.cmsBuilder.targetLabel}>
                        {targetOptions.find((option) => option.value === targetId)?.label ||
                          t.cmsBuilder.scratch}
                      </Button>
                    }
                    items={targetOptions.map((option) => ({
                      key: option.value || 'scratch',
                      label: option.label,
                      onClick: () => onTargetChange(option.value),
                    }))}
                  />
                  <Dropdown
                    placement="bottom-end"
                    trigger={
                      <Button
                        size="sm"
                        variant="ink"
                        icon={<BearIcons.SaveIcon size={CMS_ICON_SIZE} />}
                        aria-label={t.cmsBuilder.saveCanvas}
                      >
                        {targetId ? t.cmsBuilder.saveToContent : t.cmsBuilder.saveCanvas}
                      </Button>
                    }
                    items={[
                      {
                        key: 'save',
                        label: targetId ? t.cmsBuilder.saveToContent : t.cmsBuilder.saveCanvas,
                        onClick: () => void onSave(),
                      },
                      {
                        key: 'template',
                        label: t.cmsBuilder.saveAsTemplate,
                        onClick: () => void onSaveAsTemplate(),
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="ink-cms-preview-shell">
              <div
                className={`ink-cms-builder__stage${stageViewportClass}${stagePreviewClass}`}
                style={{
                  ...(viewport === BUILDER_VIEWPORT.DESKTOP
                    ? undefined
                    : { maxWidth: `${BUILDER_VIEWPORT_WIDTH_PX[viewport]}px` }),
                  ...(previewWidth ? { width: `${previewWidth}px`, maxWidth: `${previewWidth}px` } : {}),
                }}
                onClick={() => {
                  setSelectedId(BUILDER_INSPECTOR_NONE);
                  setDropParentId(BUILDER_INSPECTOR_NONE);
                  setMenu(null);
                }}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => acceptDrop(event)}
                onContextMenu={(event) => {
                  event.preventDefault();
                  setMenu({
                    nodeId: BUILDER_INSPECTOR_NONE,
                    x: event.clientX + BUILDER_MENU_OFFSET_PX,
                    y: event.clientY + BUILDER_MENU_OFFSET_PX,
                  });
                }}
              >
                {pageCode.css ? <style>{pageCode.css}</style> : null}
                {tree.length === 0 ? (
                  <Typography variant="body2" className="ink-cms__muted mb-0">
                    {t.cmsBuilder.empty}
                  </Typography>
                ) : (
                  tree.map(renderNode)
                )}
              </div>
              <button
                type="button"
                className="ink-cms-preview-resize"
                aria-label={t.cmsBuilder.viewportLabel}
                onMouseDown={(event) => {
                  event.preventDefault();
                  const startX = event.clientX;
                  const startWidth =
                    previewWidth || event.currentTarget.parentElement?.clientWidth || BUILDER_PREVIEW_MIN_WIDTH_PX;
                  const onMove = (moveEvent: globalThis.MouseEvent) => {
                    setPreviewWidth(
                      Math.max(BUILDER_PREVIEW_MIN_WIDTH_PX, startWidth + moveEvent.clientX - startX),
                    );
                  };
                  const onUp = () => {
                    window.removeEventListener('mousemove', onMove);
                    window.removeEventListener('mouseup', onUp);
                  };
                  window.addEventListener('mousemove', onMove);
                  window.addEventListener('mouseup', onUp);
                }}
              />
              </div>
              {saved ? (
                <Typography variant="caption" className="ink-cms-save-ok mb-0">
                  {t.cmsBuilder.saved}
                </Typography>
              ) : null}
            </Card>
            <div className="ink-cms-builder__pane ink-cms-builder__pane--inspector">
            <button
              type="button"
              className="ink-cms-panel-resize"
              aria-label={t.cmsBuilder.inspector}
              onMouseDown={onInspectorResize}
            />
            <Card className="ink-cms-card ink-cms-builder__inspector">
              <Typography variant="h4" className="mb-2">
                {t.cmsBuilder.inspector}
              </Typography>
              <Tabs
                value={inspectorTab}
                defaultTab={BUILDER_INSPECTOR_TAB.CONTENT}
                variant="line"
                onChange={(tabId) => setInspectorTab(tabId as BuilderInspectorTab)}
              >
                <TabList className="mb-3">
                  <Tab id={BUILDER_INSPECTOR_TAB.CONTENT}>{t.cmsBuilder.inspectorContent}</Tab>
                  <Tab id={BUILDER_INSPECTOR_TAB.STYLE}>{t.cmsBuilder.inspectorStyle}</Tab>
                  <Tab id={BUILDER_INSPECTOR_TAB.CODE}>{t.cmsBuilder.inspectorCode}</Tab>
                </TabList>
                <TabPanel tabId={BUILDER_INSPECTOR_TAB.CONTENT}>
                  {selected ? (
                    <Flex direction="column" gap={2}>
                      <Input
                        label={t.cmsBuilder.inspectorLabel}
                        value={selected.label}
                        onChange={(event) =>
                          apply(updateNodeLabel(tree, selected.id, event.target.value))
                        }
                      />
                      {selected.html !== undefined && selected.kind !== CANVAS_KIND.INK ? (
                        <Input
                          label={t.cmsBuilder.inspectorHtml}
                          value={selected.html}
                          onChange={(event) =>
                            apply(updateNodeHtml(tree, selected.id, event.target.value))
                          }
                        />
                      ) : null}
                      <Typography variant="caption" className="ink-cms-builder__group mb-0 block">
                        {t.cmsBuilder.aiLive}
                      </Typography>
                      <div className="ink-cms-ai-hints">
                      {AI_STYLE_SUGGESTIONS.map((hint) => (
                        <button
                          key={hint.id}
                          type="button"
                          className="ink-cms-ai-hint"
                          onClick={() =>
                            apply(
                              updateNodeStyles(tree, selected.id, {
                                ...selectedStyles,
                                ...hint.styles,
                              }),
                            )
                          }
                        >
                          <BearIcons.StarIcon size={CMS_ICON_SIZE} />
                          {t.cmsBuilder.aiHints[hint.id]}
                        </button>
                      ))}
                      </div>
                      <Typography variant="caption" className="ink-cms__muted mb-0">
                        {selected.kind}
                      </Typography>
                    </Flex>
                  ) : (
                    <Typography variant="caption" className="ink-cms__muted mb-0">
                      {t.cmsBuilder.inspectorEmpty}
                    </Typography>
                  )}
                </TabPanel>
                <TabPanel tabId={BUILDER_INSPECTOR_TAB.STYLE}>
                  {selected ? (
                    <Flex direction="column" gap={2}>
                      {STYLE_FIELD_KEYS.map((key) => (
                        <Input
                          key={key}
                          label={t.cmsBuilder.styleFields[key]}
                          value={selectedStyles[key]}
                          onChange={(event) =>
                            apply(
                              updateNodeStyles(tree, selected.id, {
                                ...selectedStyles,
                                [key]: event.target.value,
                              }),
                            )
                          }
                        />
                      ))}
                    </Flex>
                  ) : (
                    <Typography variant="caption" className="ink-cms__muted mb-0">
                      {t.cmsBuilder.inspectorEmpty}
                    </Typography>
                  )}
                </TabPanel>
                <TabPanel tabId={BUILDER_INSPECTOR_TAB.CODE}>
                  <Flex direction="column" gap={2}>
                    {selected ? (
                      <>
                        {selected.html !== undefined && selected.kind !== CANVAS_KIND.INK ? (
                          <BuilderCodeField
                            label={t.cmsBuilder.inspectorHtml}
                            value={selected.html}
                            language="html"
                            onChange={(value) => apply(updateNodeHtml(tree, selected.id, value))}
                          />
                        ) : null}
                        <BuilderCodeField
                          label={t.cmsBuilder.inspectorCss}
                          value={selected.css || BUILDER_STYLE_EMPTY}
                          language="css"
                          onChange={(value) => apply(updateNodeCss(tree, selected.id, value))}
                        />
                        <BuilderCodeField
                          label={t.cmsBuilder.inspectorJs}
                          value={selected.js || BUILDER_STYLE_EMPTY}
                          language="javascript"
                          onChange={(value) => apply(updateNodeJs(tree, selected.id, value))}
                        />
                      </>
                    ) : (
                      <>
                        <BuilderCodeField
                          label={t.cmsBuilder.pageCss}
                          value={pageCode.css}
                          language="css"
                          onChange={(value) => {
                            setPageCode({ ...pageCode, css: value });
                            setSaved(false);
                          }}
                        />
                        <BuilderCodeField
                          label={t.cmsBuilder.pageJs}
                          value={pageCode.js}
                          language="javascript"
                          onChange={(value) => {
                            setPageCode({ ...pageCode, js: value });
                            setSaved(false);
                          }}
                        />
                      </>
                    )}
                  </Flex>
                </TabPanel>
              </Tabs>
            </Card>
            </div>
          </div>
        )}
        {menu ? (
          <div
            className="ink-cms-canvas-menu"
            style={{ left: menu.x, top: menu.y }}
            onClick={(event) => event.stopPropagation()}
          >
            {menu.nodeId ? (
              <>
                <button type="button" onClick={() => runMenu(BUILDER_MENU_ACTION.DUPLICATE)}>
                  {t.cmsBuilder.menuDuplicate}
                </button>
                <button type="button" onClick={() => runMenu(BUILDER_MENU_ACTION.WRAP_FLEX)}>
                  {t.cmsBuilder.menuWrapFlex}
                </button>
                <button type="button" onClick={() => runMenu(BUILDER_MENU_ACTION.WRAP_GRID)}>
                  {t.cmsBuilder.menuWrapGrid}
                </button>
                <button type="button" onClick={() => runMenu(BUILDER_MENU_ACTION.ADD_SECTION)}>
                  {t.cmsBuilder.menuAddSection}
                </button>
                <button type="button" onClick={() => runMenu(BUILDER_MENU_ACTION.MOVE_UP)}>
                  {t.cmsBuilder.menuMoveUp}
                </button>
                <button type="button" onClick={() => runMenu(BUILDER_MENU_ACTION.MOVE_DOWN)}>
                  {t.cmsBuilder.menuMoveDown}
                </button>
                <button type="button" onClick={() => runMenu(BUILDER_MENU_ACTION.DELETE)}>
                  {t.cmsBuilder.menuDelete}
                </button>
              </>
            ) : (
              <button type="button" onClick={() => addLayout(CANVAS_KIND.SECTION)}>
                {t.cmsBuilder.menuAddSection}
              </button>
            )}
          </div>
        ) : null}
      </Flex>
    </CmsShell>
  );
};
