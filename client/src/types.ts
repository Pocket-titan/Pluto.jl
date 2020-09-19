export type CellState = "NOT_RUNNING" | "RUNNING" | "ERROR" | "DONE";

export type Id = string;

export type CellInput = string;

// export type CellOutput = {
//   mimeType: MimeType;
//   value: string;
// };
export type CellOutput = string;

export type Cell = {
  id: Id;
  position: number;
  input: CellInput;
  output?: CellOutput;
  state: CellState;
  folded: boolean;
};

const mimeTypes = [
  "application/json",
  "application/pdf",
  "application/rtf",
  "application/vnd.ms-excel",
  "application/msword",
  "audio/wav",
  "audio/webm",
  "audio/mpeg",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/bmp",
  "image/svg+xml",
  "text/plain",
  "text/markdown",
  "text/html",
  "text/csv",
  "text/calendar",
  "video/webm",
  "video/x-msvideo",
  "video/mpeg",
] as const;

export type MimeType = typeof mimeTypes[number];
