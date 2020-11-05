import HTTP
import Markdown: htmlesc
import UUIDs: UUID

function is_authenticated(session::ServerSession, request::HTTP.Request)
    return true
end

"Attempts to find the MIME pair corresponding to the extension of a filename. Defaults to `text/plain`."
function mime_fromfilename(filename)
    # This bad boy is from: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    mimepairs = Dict(".aac" => "audio/aac", ".bin" => "application/octet-stream", ".bmp" => "image/bmp", ".css" => "text/css", ".csv" => "text/csv", ".eot" => "application/vnd.ms-fontobject", ".gz" => "application/gzip", ".gif" => "image/gif", ".htm" => "text/html", ".html" => "text/html", ".ico" => "image/vnd.microsoft.icon", ".jpeg" => "image/jpeg", ".jpg" => "image/jpeg", ".js" => "text/javascript", ".json" => "application/json", ".jsonld" => "application/ld+json", ".mjs" => "text/javascript", ".mp3" => "audio/mpeg", ".mp4" => "video/mp4", ".mpeg" => "video/mpeg", ".oga" => "audio/ogg", ".ogv" => "video/ogg", ".ogx" => "application/ogg", ".opus" => "audio/opus", ".otf" => "font/otf", ".png" => "image/png", ".pdf" => "application/pdf", ".rtf" => "application/rtf", ".sh" => "application/x-sh", ".svg" => "image/svg+xml", ".tar" => "application/x-tar", ".tif" => "image/tiff", ".tiff" => "image/tiff", ".ttf" => "font/ttf", ".txt" => "text/plain", ".wav" => "audio/wav", ".weba" => "audio/webm", ".webm" => "video/webm", ".webp" => "image/webp", ".woff" => "font/woff", ".woff2" => "font/woff2", ".xhtml" => "application/xhtml+xml", ".xml" => "application/xml", ".xul" => "application/vnd.mozilla.xul+xml", ".zip" => "application/zip")
    file_extension = getkey(mimepairs, '.' * split(filename, '.')[end], ".txt")
    MIME(mimepairs[file_extension])
end

function asset_response(path)
  if isdir(path)
    index = joinpath(path, "index.html")
    if isfile(index)
        response = HTTP.Response(200, body=read(index))
        push!(response.headers, "Access-Control-Allow-Origin" => "*")
        push!(response.headers, "Content-Type" => string(mime_fromfilename(path)))
        return response
    else
        @show return HTTP.Response(501)
    end
  elseif isfile(path)
    response = HTTP.Response(200, read(path, String))
    push!(response.headers, "Access-Control-Allow-Origin" => "*")
    push!(response.headers, "Content-Type" => string(mime_fromfilename(path)))
    return response
  else
    @show return HTTP.Response(404)
  end

  # if !isfile(path) && !endswith(path, ".html")
  #     return asset_response(path * ".html")
  # end
  # try
  #     @assert isfile(path)
  #     response = HTTP.Response(200, read(path, String))
  #     push!(response.headers, "Access-Control-Allow-Origin" => "*")
  #     push!(response.headers, "Content-Type" => string(mime_fromfilename(path)))
  #     response
  # catch e
  #     HTTP.Response(404, "Not found!")
  # end
end

function notebook_redirect_response(notebook; home_url="./")
  response = HTTP.Response(302, "")
  push!(response.headers, "Access-Control-Allow-Origin" => "*")
  push!(response.headers, "Location" => home_url * "edit?id=" * string(notebook.notebook_id))
  return response
end

function serve_index(request::HTTP.Request)
  return asset_response(
    normpath(
      project_relative_path(
        "client",
        "build",
        "index.html"
      )
    )
  )
end

function http_router_for(session::ServerSession)
  router = HTTP.Router()

  function try_launch_notebook_response(action::Function, path_or_url::AbstractString; title="", advice="", home_url="./")
    try
        nb = action(session, path_or_url)
        notebook_redirect_response(nb; home_url=home_url)
    catch e
        if e isa SessionActions.NotebookIsRunningException
            notebook_redirect_response(e.notebook; home_url=home_url)
        else
            # error_response(500, title, advice, sprint(showerror, e, stacktrace(catch_backtrace())))
        end
      end
  end

  function serve_openfile(request::HTTP.Request)
    uri = HTTP.URI(request.target)
    query = HTTP.queryparams(uri)
    if haskey(query, "path")
        path = tamepath(query["path"])
        if isfile(path)
            return try_launch_notebook_response(SessionActions.open, path, title="Failed to load notebook", advice="The file <code>$(htmlesc(path))</code> could not be loaded. Please <a href='https://github.com/fonsp/Pluto.jl/issues'>report this error</a>!")
        else
            # return error_response(404, "Can't find a file here", "Please check whether <code>$(htmlesc(path))</code> exists.")
        end
    elseif haskey(query, "url")
        url = query["url"]
        return try_launch_notebook_response(SessionActions.open_url, url, title="Failed to load notebook", advice="The notebook from <code>$(htmlesc(url))</code> could not be loaded. Please <a href='https://github.com/fonsp/Pluto.jl/issues'>report this error</a>!")
    else
        error("Empty request")
    end
  end

  function serve_newfile(request::HTTP.Request)
    notebook_redirect_response(SessionActions.new(session))
  end

  function serve_asset(request::HTTP.Request)
    uri = HTTP.URI(request.target)

    filepath = project_relative_path("client", "build", relpath(HTTP.unescapeuri(uri.path), "/"))
    asset_response(filepath)
  end

  HTTP.@register(router, "GET", "/", serve_index)
  HTTP.@register(router, "GET", "/edit", serve_index)
  HTTP.@register(router, "GET", "/open", serve_openfile)
  HTTP.@register(router, "GET", "/new", serve_newfile)
  HTTP.@register(router, "GET", "/*", serve_asset)

  return router
end
