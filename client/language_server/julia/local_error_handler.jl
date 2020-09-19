using Sockets
import InteractiveUtils

function local_err_handler(e, bt, idk, idk2)
    @warn "Some Julia code in the VS Code extension crashed with" e

    st = stacktrace(bt)
    try
        temp_io = IOBuffer()
        InteractiveUtils.versioninfo(temp_io, verbose=false)
        println(temp_io)
        println(temp_io)
        showerror(temp_io, e)
        error_message_str = chomp(String(take!(temp_io)))
        n = count(i -> i == '\n', error_message_str) + 1
        @error error_message_str
  finally
    println("oh no")
  end
  Base.display_error(e, bt)
  exit(1)
end

