import styled, { css } from "styled-components/macro";

const TRAFFICLIGHT_WIDTH = 6;

type States = {
  errored: boolean;
  queued: boolean;
  running: boolean;
};

const TrafficLight = styled.div<States>`
  position: absolute;
  height: 100%;
  z-index: 99;
  top: 0px;
  left: -${TRAFFICLIGHT_WIDTH}px;
  width: ${TRAFFICLIGHT_WIDTH}px;
  border-bottom-left-radius: ${TRAFFICLIGHT_WIDTH}px;
  border-top-left-radius: ${TRAFFICLIGHT_WIDTH}px;
  pointer-events: none;
  transition: all 250ms ease-in-out;

  ${({ theme }) =>
    theme.isDark
      ? css`
          background: hsla(0, 0%, 100%, 0.13);
          border-left-color: hsla(0, 0%, 100%, 0.13);
        `
      : css`
          background: hsla(0, 0%, 0%, 0.23);
          border-left-color: hsla(0, 0%, 0%, 0.23);
        `}

  @keyframes scrollbackground {
    0% {
      background-position-y: 0px;
    }
    100% {
      background-position-y: 22627.41699797px;
      /* 16 * sqrt(2) */
    }
  }

  ${({ errored, queued, running }) =>
    queued && errored
      ? css`
          background: repeating-linear-gradient(
            -45deg,
            hsla(0, 70%, 80%, 0.7),
            hsla(0, 70%, 80%, 0.7) 8px,
            hsla(0, 70%, 80%, 0.05) 8px,
            hsla(0, 70%, 80%, 0.05) 16px
          );
          background-clip: content-box;
          animation: 1000s linear 0s infinite running scrollbackground;
          background-size: ${TRAFFICLIGHT_WIDTH}px 22.62741699797px; /* 16 * sqrt(2) */
        `
      : running && errored
      ? css`
          background: repeating-linear-gradient(
            -45deg,
            hsla(0, 100%, 80%, 1),
            hsla(0, 100%, 80%, 1) 8px,
            hsla(0, 70%, 80%, 0.7) 8px,
            hsla(0, 70%, 80%, 0.7) 16px
          );
          background-clip: content-box;
          animation: 1000s linear 0s infinite running scrollbackground;
        `
      : errored
      ? css`
          /* background: hsla(0, 70%, 80%, 0.7);
          border-left-color: hsla(0, 70%, 80%, 0.7); */
          background: hsla(5, 64%, 50%, 0.7);
          border-left-color: hsla(5, 64%, 50%, 0.7);
          background-clip: content-box;
        `
      : running
      ? css`
          background: repeating-linear-gradient(
            -45deg,
            hsla(0, 0%, 100%, 0.13),
            hsla(0, 0%, 100%, 0.13) 8px,
            hsla(0, 0%, 100%, 0.26) 8px,
            hsla(0, 0%, 100%, 0.26) 16px
          );
          background-clip: content-box;
          animation: 1000s linear 0s infinite running scrollbackground;
          background-size: ${TRAFFICLIGHT_WIDTH}px 22.62741699797px; /* 16 * sqrt(2) */
        `
      : queued
      ? css`
          background: repeating-linear-gradient(
            -45deg,
            hsla(0, 0%, 100%, 0),
            hsla(0, 0%, 100%, 0) 8px,
            hsla(0, 0%, 100%, 0.13) 8px,
            hsla(0, 0%, 100%, 0.13) 16px
          );
          background-clip: content-box;
          animation: 1000s linear 0s infinite running scrollbackground;
          background-size: ${TRAFFICLIGHT_WIDTH}px 22.62741699797px; /* 16 * sqrt(2) */
        `
      : ``}
`;

const Container = styled.div<{ selected: boolean }>`
  position: relative;
  margin-top: 2.04em;
  box-shadow: 3px 3px 9px hsla(0, 0%, 0%, 0.25);
  min-height: 23px; /* TODO: maybe do editor.getOption() instead of hardcoding */

  ${({ selected, theme }) =>
    selected &&
    css`
      &:after {
        transition: var(--transition);
        position: absolute;
        content: "";
        top: 0;
        left: -${TRAFFICLIGHT_WIDTH}px;
        width: calc(100% + ${TRAFFICLIGHT_WIDTH}px);
        height: 100%;
        opacity: 1;
        border-radius: 4px;
        background-color: ${theme.isDark
          ? "hsla(207, 84%, 70%, 0.2)"
          : "rgba(20, 40, 140, 0.2)"};
      }
    `}
`;

const Shoulder = styled.div<{ isDragging: boolean; isDropAnimating: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  left: -50vw;
  width: 150vw;
  height: 100%;
  z-index: 0;

  &:hover {
    cursor: move;
  }

  ${({ theme }) =>
    theme.isDark
      ? css`
          &:hover {
            background: hsla(0, 0%, 100%, 0.03);
          }
        `
      : css`
          &:hover {
            background: hsla(0, 0%, 0%, 0.1);
          }
        `}

  ${({ isDragging, isDropAnimating }) =>
    (isDragging || isDropAnimating) &&
    css`
      cursor: move;
      background: ${({ theme }) =>
        theme.isDark ? `hsla(0, 0%, 100%, 0.03)` : `hsla(0, 0%, 0%, 0.1)`};
    `}
`;

const Button = styled.button`
  transition: opacity 250ms ease-in-out;
  cursor: pointer;
  position: absolute;
  border: none;
  background: none;

  * {
    color: hsl(0, 0%, 60%);
  }

  &:hover {
    * {
      color: ${({ theme }) =>
        theme.isDark ? "hsl(0, 0%, 75%)" : "hsl(0, 0%, 15%)"};
    }
  }

  opacity: 0;
  ${Container}:hover & {
    opacity: 1;
  }

  ${Container}:focus & {
    opacity: 0;
  }
`;

const AddCell = styled(Button)<{ where: "before" | "after" }>`
  transform: ${({ where }) =>
    `translate(-50%, ${where === "before" ? "-100%" : "100%"})`};
  padding: 0.4em;
  left: -${TRAFFICLIGHT_WIDTH / 2}px;
  ${({ where }) => (where === "before" ? "top: 0;" : "bottom: 0;")}
`;

const FoldCell = styled(Button)`
  transform: translate(-100%, 0%);
  padding: 0em 0.25em 0em 0.25em;
  left: -${TRAFFICLIGHT_WIDTH}px;
  top: 0;
`;

const DeleteCell = styled(Button)`
  transform: translate(100%, 0%);
  right: 0;
  top: 0;
`;

export { TrafficLight, Shoulder, Container, AddCell, FoldCell, DeleteCell };
