const Plain = ({ body }: { body: string }) => {
  if (body) {
    return (
      <div>
        <pre>
          <code>
            {typeof body === "string" ? body : JSON.stringify(body, null, 2)}
          </code>
        </pre>
      </div>
    );
  }

  return <div />;
};

export default Plain;
