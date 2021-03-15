import { useRef, useState } from "react";

import { DocumentEvent } from "./Elements";
import { useSelection } from "ts/state";
import { useTheme } from "styled-components/macro";

type Area = {
  start: {
    x: number;
    y: number;
  };
  end: {
    x: number;
    y: number;
  };
};

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

const getSelectedCells = (selection: Area) => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  let selectedCells = Array.from(document.querySelectorAll("pluto-cell"))
    .filter((cellNode) => {
      let _rect = cellNode.getBoundingClientRect();
      let rect = {
        bottom: _rect.bottom,
        height: _rect.height,
        left: _rect.left,
        right: _rect.right,
        top: _rect.top + scrollTop,
        width: _rect.width,
        x: _rect.x,
        y: _rect.y + scrollTop,
      };

      let isVisible =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth);

      if (!isVisible) {
        return false;
      }

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
  const theme = useTheme();
  const isSelecting = useRef(false);
  const mousePosition = useRef<{
    clientX: number;
    clientY: number;
    pageX: number;
    pageY: number;
  }>();
  const [selection, setSelection] = useState<Area>();
  const selectCells = useSelection((state) => state.selectCells);

  return (
    <>
      <DocumentEvent
        passive
        name="mousedown"
        targets={(elements) => {
          return !elements
            .map((element) => element.tagName)
            .some(
              (tag) =>
                tag === "PLUTO-CELL" || tag === "HEADER" || tag === "FOOTER"
            );
        }}
        handler={({ pageX: x, pageY: y }) => {
          isSelecting.current = true;
          selectCells([]);
          setSelection({
            start: { x, y },
            end: { x, y },
          });
        }}
      />
      {selection && (
        <DocumentEvent
          passive
          name="mousemove"
          handler={({ pageX, pageY, clientX, clientY }) => {
            mousePosition.current = { pageX, pageY, clientX, clientY };

            let newSelection = {
              ...selection,
              end: { x: pageX, y: pageY },
            };

            selectCells(getSelectedCells(newSelection));
            setSelection(newSelection);
          }}
        />
      )}
      {selection && (
        <DocumentEvent
          passive
          name="mouseup"
          handler={(event) => {
            mousePosition.current = undefined;
            isSelecting.current = false;
            setSelection(undefined);
          }}
        />
      )}
      <DocumentEvent
        name="selectstart"
        handler={(event) => {
          if (isSelecting.current) {
            // Even if we are doing `preventDefault`, we would still like the current
            // selection (if there is one) to be cleared
            let selection = window.getSelection();
            selection?.removeAllRanges();
            event.preventDefault();
          }
        }}
      />
      {selection && (
        <DocumentEvent
          passive
          name="scroll"
          handler={(event) => {
            if (!mousePosition.current || !selection) {
              return;
            }

            const { clientX: x, clientY: y } = mousePosition.current;

            const newSelection = {
              ...selection,
              end: {
                x,
                y: y + document.documentElement.scrollTop,
              },
            };

            selectCells(getSelectedCells(newSelection));
            setSelection(newSelection);
          }}
        />
      )}

      {selection && (
        <div
          style={{
            position: "absolute",
            pointerEvents: "none",
            top: Math.min(selection.start.y, selection.end.y),
            left: Math.min(selection.start.x, selection.end.x),
            width: Math.abs(selection.start.x - selection.end.x),
            height: Math.abs(selection.start.y - selection.end.y),
            backgroundColor: theme.isDark
              ? "hsla(207, 84%, 70%, 0.24)"
              : "rgba(40, 78, 189, 0.24)",
            zIndex: 10,
          }}
        />
      )}
    </>
  );
};

export default SelectionArea;
