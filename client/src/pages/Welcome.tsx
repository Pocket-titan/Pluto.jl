import React, { useEffect, useState } from "react";
import { PlayCircle } from "@styled-icons/ionicons-outline";
import { CloseCircle } from "@styled-icons/ionicons-solid";
import produce from "immer";
import _ from "lodash";
import { useListener, send } from "../ts/pluto";
import type { Id, RecentNotebook } from "../ts/types";
import { getRecentNotebooks } from "../ts/utils";

const Welcome = () => {
  const [notebooks, setNotebooks] = useState<RecentNotebook[]>([]);

  const setNotebook = (notebook_id: Id, notebook: RecentNotebook) => {
    setNotebooks(
      produce(notebooks, (draftNotebooks) => {
        let index = notebooks.findIndex(
          (notebook) => notebook.notebook_id === notebook_id
        );

        if (index === -1) {
          return;
        }

        _.merge(draftNotebooks[index], notebook);
      })
    );
  };

  useEffect(() => {
    let init = async () => {
      let wave = await send("connect");
      let {
        message: { notebooks },
      } = await send("get_all_notebooks");
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
      console.log("combinedNotebooks", combinedNotebooks);
      setNotebooks(combinedNotebooks);
    };

    init();
  }, []);

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
          const { protocol, hostname } = document.location;
          let url = `${protocol}//${hostname}:${1234}/new`;
          let res = await fetch(url);
          let res_url = new URL(res.url);

          let redirect_url = res_url.href.replace("1234", "3000");
          window.location.href = redirect_url;
        }}
      >
        Create a new notebook
      </a>
      <h3 style={{ marginBottom: 0 }}>Active notebooks:</h3>
      <ul>
        {notebooks.map(({ notebook_id, transitioning, path }) => {
          const isRunning = notebook_id !== null;

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
                onClick={(event) => {
                  if (transitioning) {
                    return;
                  }

                  if (isRunning) {
                    send("shutdown_notebook", {
                      notebook_id: notebook_id!,
                      body: {
                        keep_in_session: false,
                      },
                    });
                  } else {
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
