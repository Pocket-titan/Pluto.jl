import React, { useState } from "react";
import { pick } from "lodash/fp";
import type { Id } from "../ts/types";
import { DocumentEvent } from "../ts/utils";
import { useNotebook } from "../pages/Notebook";

const intersects = (a: Area, b: Area) => {
  let [ax1, ax2, ay1, ay2] = [
    Math.min(a.start.x, a.end.x),
    Math.max(a.start.x, a.end.x),
    Math.min(a.start.y, a.end.y),
    Math.max(a.start.y, a.end.y),
  ];

  let [bx1, bx2, by1, by2] = [
    Math.min(b.start.x, b.end.x),
    Math.max(b.start.x, b.end.x),
    Math.min(b.start.y, b.end.y),
    Math.max(b.start.y, b.end.y),
  ];

  if (ax1 >= bx2 || bx1 >= ax2) {
    return false;
  }

  if (ay1 >= by2 || by1 >= ay2) {
    return false;
  }

  return true;
};

type Position = {
  x: number;
  y: number;
};

type Area = {
  start: Position;
  end: Position;
};

const getSelectedCells = (selection: Area) => {
  let selectedCells = Array.from(document.querySelectorAll("pluto-cell"))
    .filter((cellNode) => {
      let rect = cellNode.getBoundingClientRect();
      let me: Area = {
        start: {
          x: rect.x,
          y: rect.y,
        },
        end: {
          x: rect.x + rect.width,
          y: rect.y + rect.height,
        },
      };

      return intersects(me, selection);
    })
    .map((cellNode) => cellNode.id);

  return selectedCells;
};

const SelectionArea = () => {
  const [selection, setSelection] = useState<Area>();
  const { cells, selectCells } = useNotebook(pick(["cells", "selectCells"]));

  return (
    <>
      <DocumentEvent
        name="mousedown"
        targets={(tags) => {
          return !tags.some(
            (tag) =>
              tag === "PLUTO-CELL" || tag === "HEADER" || tag === "FOOTER"
          );
        }}
        handler={({ pageX: x, pageY: y }) => {
          if (cells.some((cell) => cell.selected)) {
            selectCells([]);
          }

          setSelection({
            start: { x, y },
            end: { x, y },
          });
        }}
      />
      <DocumentEvent
        passive
        name="mousemove"
        handler={({ pageX: x, pageY: y }) => {
          if (!selection) {
            return;
          }

          let newSelection = {
            ...selection,
            end: { x, y },
          };

          selectCells(getSelectedCells(newSelection));
          setSelection(newSelection);
        }}
      />
      <DocumentEvent
        passive
        name="mouseup"
        handler={(event) => {
          setSelection(undefined);
        }}
      />
      <DocumentEvent
        passive
        name="selectstart"
        handler={(event) => {
          if (selection) {
            event.preventDefault();
          }
        }}
      />
      {selection && (
        <div
          style={{
            position: "absolute",
            top: Math.min(selection.start.y, selection.end.y),
            left: Math.min(selection.start.x, selection.end.x),
            width: Math.abs(selection.start.x - selection.end.x),
            height: Math.abs(selection.start.y - selection.end.y),
            background: "rgba(40, 78, 189, 0.24)",
            zIndex: 10,
          }}
        />
      )}
    </>
  );
};

export default SelectionArea;
