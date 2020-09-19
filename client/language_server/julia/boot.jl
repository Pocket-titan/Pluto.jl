if VERSION < v"1.0.0"
    error("VS Code julia language server only works with julia 1.0.0+")
end

@info "Starting the Julia Language Server"

using InteractiveUtils, Sockets

include("./local_error_handler.jl")

struct LSPrecompileFailure <: Exception
    msg::AbstractString
end

function Base.showerror(io::IO, ex::LSPrecompileFailure)
    print(io, ex.msg)
end

args = ["", "--debug=yes", nothing, "", ""]

for i ∈ range(1, stop=length(args))
    if isassigned(Base.ARGS, i)
        args[i] = Base.ARGS[i]
    end
end

try
    if length(args) != 5
        error("Invalid number of arguments passed to julia language server.")
    end

    conn = stdout
    (outRead, outWrite) = redirect_stdout()

    if args[2] == "--debug=yes"
        ENV["JULIA_DEBUG"] = "all"
    elseif args[2] != "--debug=no"
        error("Invalid argument passed.")
    end

    try
        using LanguageServer, SymbolServer
    catch err
        if err isa ErrorException && startswith(err.msg, "Failed to precompile")
            throw(LSPrecompileFailure(err.msg))
        else
            rethrow(err)
        end
    end

    symserver_store_path = joinpath(args[5], "symbolstorev2")

    if !ispath(symserver_store_path)
        mkpath(symserver_store_path)
    end

    @info "Symbol server store is at '$symserver_store_path'."

    server = LanguageServerInstance(
      stdin,
      conn,
      args[1],
      args[4],
      (err, bt) -> local_err_handler(err, bt, args[3], "Language Server"),
      symserver_store_path
    )

    @info server.jr_endpoint
    run(server)
catch err
    local_err_handler(err, catch_backtrace(), args[3], "Language Server")
end
