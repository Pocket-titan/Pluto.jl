import React, { useEffect, useState } from "react";
import { sendMessage, useListener } from "../ts/pluto";
import type { RecentNotebook } from "../ts/types";

const Welcome = () => {
  let [notebooks, setNotebooks] = useState<RecentNotebook[]>([]);

  useEffect(() => {
    let init = async () => {
      await sendMessage("connect");
      let { notebooks } = await sendMessage("get_all_notebooks");
      let runningNotebooks = notebooks.map(({ notebook_id, path }) => ({
        transitioning: false,
        path,
        notebook_id,
      }));
      console.log("notebooks", notebooks);
      setNotebooks(runningNotebooks);
    };

    init();
  }, []);

  useListener("notebook_list", (me) => {});

  return (
    <div>
      <a
        href="/new"
        onClick={async (event) => {
          event.preventDefault();
          const { protocol, hostname } = window.location;
          let url = `${protocol}//${hostname}:${1234}/new`;
          let res = await fetch(url, {
            method: "GET",
          });
          let res_url = new URL(res.url);

          let redirect_url = res_url.href.replace("1234", "3000");
          window.location.href = redirect_url;
        }}
      >
        New notebook
      </a>
      {notebooks.map(({ notebook_id, path }) => (
        <a href={`/edit?id=${notebook_id}`}>{path}</a>
      ))}
    </div>
  );
};

export default Welcome;
