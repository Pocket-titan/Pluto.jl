type StackFrame = {
  call: string;
  file: string;
  line: number;
  inlined: boolean;
};

const PlutoStacktrace = ({
  body: { msg, stacktrace },
}: {
  body: {
    msg: string;
    stacktrace: StackFrame[];
  };
}) => {
  return (
    <div>
      <header>
        <p
          style={{
            fontFamily: "monospace",
          }}
        >
          {msg}
        </p>
      </header>
      {stacktrace?.length > 0 && (
        <section>
          <ol>
            {stacktrace.map((frame) => {
              const bracketIndex = frame.call.indexOf("(");
              const sepIndex = frame.file.indexOf("#==#");

              return (
                <li key={frame.call}>
                  <mark>
                    {bracketIndex !== -1 ? (
                      <>
                        <strong>{frame.call.substr(0, bracketIndex)}</strong>
                        {frame.call.substr(bracketIndex)}
                      </>
                    ) : (
                      <strong>{frame.call}</strong>
                    )}
                  </mark>
                  <span>@</span>
                  {sepIndex !== -1 ? (
                    <a />
                  ) : (
                    <em>
                      {frame.file}:{frame.line}
                    </em>
                  )}
                  {frame.inlined && <span>[inlined]</span>}
                </li>
              );
            })}
          </ol>
        </section>
      )}
    </div>
  );
};

export default PlutoStacktrace;
