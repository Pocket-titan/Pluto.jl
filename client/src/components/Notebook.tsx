// import React, { useState, useEffect } from "react";
// import { initMonaco, liftOff } from "./MonacoEditor/julia_monaco";
// import { DocumentEvent } from "../ts/utils";
// import CellView from "./Cell";
// import { Cell } from "../types";

// initMonaco();
// liftOff();

// let create_cell = (value: string): Cell => ({
//   id: `${Math.random() * 200}`,
//   position: 2,
//   input: value,
//   output: "",
//   state: "DONE",
//   folded: false,
// });

// const test_cells: Cell[] = [create_cell("let aaa = 6;")];

// const Notebook = () => {
//   const [cells, setCells] = useState(test_cells);
//   // const socket = useWebsocket("localhost:3004");
//   // // Start the language client
//   // const language_socket = useWebsocket(
//   //   document.location.hostname,
//   //   3003,
//   //   "/julia"
//   // );

//   // useEffect(() => {
//   //   let init_languageclient = async () => {
//   //     const { createLanguageClient } = await import(
//   //       "./MonacoEditor/languageclient"
//   //     );
//   //     const { listen } = await import("vscode-ws-jsonrpc");
//   //     listen({
//   //       webSocket: language_socket as WebSocket,
//   //       onConnection: (connection) => {
//   //         const languageClient = createLanguageClient(connection);
//   //         const disposable = languageClient.start();
//   //         connection.onClose(() => disposable.dispose());
//   //       },
//   //     });
//   //   };

//   //   init_languageclient();
//   // }, []);

//   return (
//     <main style={{ flex: "1 1 0%" }}>
//       <DocumentEvent
//         passive
//         name="keydown"
//         handler={(event) => {
//           if (event.shiftKey && event.ctrlKey && event.code === "KeyZ") {
//             console.log("Redoooo");
//           } else if (event.ctrlKey && event.code === "KeyZ") {
//             console.log("Undoo oewoo");
//           }
//         }}
//       />
//       {cells.map((cell) => (
//         <CellView key={cell.id} cell={cell as any} />
//       ))}
//     </main>
//   );
// };

// export default Notebook;
export default {};
