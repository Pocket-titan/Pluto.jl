declare function create_empty_notebook(
    path: string,
    notebook_id?: string | null
): {
    transitioning: boolean // between running and being shut down
    notebook_id: string | null // null means that it is not running
    path: string
}

declare const what: number
