import React, { useEffect, useState } from "react";
import { useSocket, useListener, send, Notebook } from "../ts/pluto";

const Welcome = () => {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);

  useEffect(() => {
    let init = async () => {
      let wave = await send("connect");
      let notebook_list = await send("get_all_notebooks");
      setNotebooks(notebook_list.message.notebooks);
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
        color: "white",
      }}
    >
      <h1>Welcome!</h1>
      <a
        style={{
          cursor: "pointer",
          textDecorationLine: "underline",
        }}
        onClick={async () => {
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
        {notebooks.map((notebook) => {
          return (
            <li>
              <a href={`/edit?id=${notebook.notebook_id}`}>
                {notebook.shortpath}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Welcome;
