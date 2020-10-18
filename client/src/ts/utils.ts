function getUniqueShortId() {
  return crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
}

function getNotebookId() {
  let notebook_id = new URLSearchParams(window.location.search).get("id");

  if (!notebook_id) {
    console.error("Failed to get notebook id");
    return "";
  }

  return notebook_id;
}

export { getUniqueShortId, getNotebookId };
