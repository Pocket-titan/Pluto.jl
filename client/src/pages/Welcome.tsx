import React, { useEffect, useState } from "react";
import { PlayCircle } from "@styled-icons/ionicons-outline";
import { CloseCircle } from "@styled-icons/ionicons-solid";
import produce from "immer";
import _ from "lodash";
import type { RecentNotebook } from "../ts";
import {
  getRecentNotebooks,
  navigate,
  sendNotification,
  sendRequest,
  useListener,
} from "../ts";

const Welcome = () => {
  let [notebooks, setNotebooks] = useState<RecentNotebook[]>([]);

  useEffect(() => {
    let init = async () => {
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

    init();
  }, []);

  useListener("notebook_list", ({ body: { notebooks } }) => {
    setNotebooks(
      produce((draftNotebooks: RecentNotebook[]) => {
        draftNotebooks.forEach((notebook) => {
          let isRunning = notebook.notebook_id !== null;

          let index = notebooks.findIndex(({ path }) => path === notebook.path);
          if (index !== -1) {
            _.merge(notebook, notebooks[index]);
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>Welcome!</h1>
      <a
        href="/new"
        onClick={async (event) => {
          event.preventDefault();
          await navigate("/new");
        }}
      >
        Create a new notebook
      </a>
      <h3 style={{ marginBottom: 0 }}>Active notebooks:</h3>
      <ul>
        {notebooks.map(({ notebook_id, transitioning, path }) => {
          let isRunning = notebook_id !== null;

          return (
            <li
              key={path}
              style={{
                listStyle: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <button
                title={isRunning ? "Shut down notebook" : "Start notebook"}
                onClick={async (event) => {
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
                    await navigate(`/open?path=${path}`);
                  }
                }}
                style={{
                  marginRight: 5,
                  padding: 0,
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                {isRunning ? (
                  <CloseCircle size={22} style={{ color: "hsl(0, 0%, 60%)" }} />
                ) : (
                  <PlayCircle size={22} style={{ color: "hsl(0, 0%, 80%)" }} />
                )}
              </button>
              <a href={`/edit?id=${notebook_id}`}>{path}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Welcome;
