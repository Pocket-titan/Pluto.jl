import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useEditorRefs } from "ts/state";
import { Friend } from "ts/types";
import RemoteSelection from "./RemoteSelection";

const RemoteCursor = ({
  friend,
}: {
  friend: Friend & {
    status: { type: "cursor" };
  };
}) => {
  const {
    id,
    color,
    status: { cell_id, offset, selection },
  } = friend;
  const containerRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<monaco.IPosition | null>(null);
  const widget = useRef<monaco.editor.IContentWidget>();
  const editor = useEditorRefs((state) => state.editors[cell_id]);

  useLayoutEffect(() => {
    let model = editor.getModel();
    if (!model) {
      return;
    }

    let position = model.getPositionAt(offset);
    positionRef.current = position;

    widget.current && editor.layoutContentWidget(widget.current);
  }, [offset]);

  useEffect(() => {
    if (!containerRef.current || !editor) {
      return;
    }

    widget.current = {
      getId: () => `monaco-widget-${id}`,
      getDomNode: () => containerRef.current!,
      getPosition: () => ({
        position: positionRef.current,
        preference: [monaco.editor.ContentWidgetPositionPreference.EXACT],
      }),
    };

    editor.addContentWidget(widget.current);

    return () => {
      widget.current && editor.removeContentWidget(widget.current);
    };
  }, [editor, id]);

  return (
    <div>
      <div
        ref={containerRef}
        className="monaco-remote-cursor"
        style={{
          // We need it to be abs positioned outside so it doesn't flash somewhere on-screen on first render
          position: "absolute",
          left: -50,
          top: -50,
          background: color,
        }}
      />
      {selection && (
        <RemoteSelection
          friend={
            friend as typeof friend & {
              status: {
                type: "cursor";
                selection: {
                  startOffset: number;
                  endOffset: number;
                };
              };
            }
          }
        />
      )}
    </div>
  );
};

export default RemoteCursor;
