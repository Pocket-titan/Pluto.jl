import "@rmwc/circular-progress/styles";

import { Cancel, PlayCircle } from "@styled-icons/material";
import { getRecentNotebooks, navigate } from "ts/utils";
import { sendNotification, sendRequest, useListener } from "ts/socket";
import styled, { css } from "styled-components/macro";
import { useEffect, useState } from "react";

import { CircularProgress } from "@rmwc/circular-progress";
import { Loader } from "components/Elements";
import type { RecentNotebook } from "ts/types";
import _ from "lodash";
import produce from "immer";
import { useHistory } from "react-router-dom";

const StyledPath = styled.a`
  cursor: pointer;
  text-decoration: underline;
  transition: color 150ms ease;

  ${({ theme }) =>
    theme.isDark
      ? css`
          color: white;

          &:hover {
            color: hsl(194, 100%, 85%);
          }
        `
      : css`
          color: black;

          &:hover {
            color: hsl(194, 100%, 85%);
          }
        `}
`;

const NotebookListItem = ({
  transitioning,
  notebook_id,
  path,
}: RecentNotebook) => {
  const history = useHistory();

  const isRunning = notebook_id !== null;

  const href = isRunning ? `/edit?id=${notebook_id}` : `/open?path=${path}`;

  return (
    <li
      style={{
        listStyle: "none",
        display: "flex",
        alignItems: "center",
      }}
    >
      <button
        style={{
          background: "none",
          border: "none",
          cursor: transitioning ? "wait" : "pointer",
          padding: 0,
          marginRight: 5,
        }}
        onClick={async () => {
          if (transitioning) {
            return;
          }

          if (isRunning) {
            sendNotification("shutdown_notebook", {
              notebook_id: notebook_id!,
              body: {
                keep_in_session: false,
              },
            });
          } else {
          }
        }}
        title={
          transitioning
            ? "Notebook is transitioning..."
            : isRunning
            ? "Shut down notebook"
            : "Start notebook"
        }
      >
        {transitioning ? (
          <CircularProgress
            size={20}
            style={{
              color: "#00A3D3",
            }}
          />
        ) : isRunning ? (
          <Cancel
            size={22}
            style={{
              color: "#00A3D3",
            }}
          />
        ) : (
          <PlayCircle
            size={22}
            style={{
              color: "#00A3D3",
            }}
          />
        )}
      </button>
      <StyledPath
        title={path}
        href={href}
        onClick={async (event) => {
          event.preventDefault();

          try {
            let url = await navigate(href);
            history.push(url.pathname + url.search);
          } catch (e) {
            console.error(e);
          }
        }}
      >
        {_.last(path.split(/\/|\\/))}
      </StyledPath>
    </li>
  );
};

const Welcome = () => {
  const [notebooks, setNotebooks] = useState<RecentNotebook[] | null>(null);
  const history = useHistory();

  useEffect(() => {
    const main = async () => {
      await sendRequest("connect");
      let {
        body: { notebooks },
      } = await sendRequest("get_all_notebooks");

      let runningNotebooks = notebooks.map(({ notebook_id, path }) => ({
        transitioning: false,
        notebook_id,
        path,
      }));

      let recentNotebooks = getRecentNotebooks();

      let combinedNotebooks = _.unionBy(
        runningNotebooks,
        recentNotebooks,
        "path"
      );

      setNotebooks(combinedNotebooks);
    };

    main();
  }, []);

  useListener("notebook_list", ({ body: { notebooks: newNotebooks } }) => {
    if (notebooks === null) {
      return setNotebooks(
        newNotebooks.map(({ notebook_id, path }) => ({
          transitioning: false,
          notebook_id,
          path,
        }))
      );
    }

    setNotebooks(
      produce((draftNotebooks: RecentNotebook[] | null) => {
        draftNotebooks!.forEach((notebook) => {
          let isRunning = notebook.notebook_id !== null;

          let index = newNotebooks.findIndex(
            ({ path }) => path === notebook.path
          );

          if (index !== -1) {
            _.merge(notebook, newNotebooks[index]);
          } else if (isRunning) {
            notebook.notebook_id = null;
          }
        });
      })
    );
  });

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "grid",
        gridTemplateRows: "50vh 1fr",
        gridTemplateColumns: "1fr",
      }}
    >
      <div
        style={{
          alignSelf: "end",
          justifySelf: "center",
        }}
      >
        <h1> Welcome! </h1>
        <a
          href="/new"
          onClick={async (event) => {
            event.preventDefault();

            try {
              let url = await navigate("/new");
              history.push(url.pathname + url.search);
            } catch (e) {
              console.error(e);
            }
          }}
        >
          {" "}
          Create a new notebook{" "}
        </a>
      </div>
      <div
        style={{
          alignSelf: "start",
          justifySelf: "center",
          textAlign: "center",
        }}
      >
        <h3 style={{ marginBottom: 0 }}> Recent notebooks: </h3>
        {notebooks === null ? (
          <Loader />
        ) : notebooks.length === 0 ? (
          <span
            style={{
              display: "block",
              marginTop: "0.75em",
              fontStyle: "italic",
              opacity: 0.45,
            }}
          >
            No notebooks yet!
          </span>
        ) : (
          <ul
            style={{
              padding: 0,
            }}
          >
            {notebooks.map((notebook) => (
              <NotebookListItem key={notebook.path} {...notebook} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Welcome;
