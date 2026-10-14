export function closeEditorTab(
  tabs: string[],
  closedId: string,
  activeId: string | null,
) {
  const remaining = tabs.filter((id) => id !== closedId);
  return {
    tabs: remaining,
    activeId: activeId === closedId ? (remaining.at(-1) ?? null) : activeId,
  };
}
