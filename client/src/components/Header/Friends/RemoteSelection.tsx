import _ from "lodash";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { useEffect, useRef, useState } from "react";
import { css } from "styled-components";
import { useEditorRefs } from "ts/state";
import { Friend } from "ts/types";

const RemoteSelection = ({
  friend: {
    id,
    color,
    animal,
    status: {
      cell_id,
      selection: { startOffset, endOffset },
    },
  },
}: {
  friend: Friend & {
    status: {
      type: "cursor";
      selection: {
        startOffset: number;
        endOffset: number;
      };
    };
  };
}) => {
  const editor = useEditorRefs((state) => state.editors[cell_id]);
  const decorations = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      editor.deltaDecorations(decorations.current, []);
    };
  }, [cell_id, editor]);

  useEffect(() => {
    let model = editor.getModel();
    if (!model) {
      return;
    }

    let [startPosition, endPosition] = [
      model.getPositionAt(startOffset),
      model.getPositionAt(endOffset),
    ];

    decorations.current = editor.deltaDecorations(decorations.current, [
      {
        range: monaco.Range.fromPositions(startPosition, endPosition),
        options: {
          className: `monaco-remote-selection-${id}`,
          glyphMarginClassName: `glyph-${id}`,
          hoverMessage: {
            value: `Anonymous ${_.capitalize(animal)}`,
          },
        },
      },
    ]);
  }, [endOffset, startOffset]);

  return (
    <style>
      {css`
        .monaco-remote-selection-${id} {
          position: absolute;
          pointer-events: auto;
          opacity: 0.3;
          background: ${color};
        }

        .glyph-${id}::before {
          content: "";
          background: ${color};
          /* border-radius: 50%; */
          height: 100% !important;
          width: 3px !important;
          opacity: 0.5;
        }
      `.join("")}
    </style>
  );
};

export default RemoteSelection;
