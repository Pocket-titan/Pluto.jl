const SVG = ({ body }: { body: string }) => {
  const src = URL.createObjectURL(new Blob([body], { type: "image/svg+xml" }));

  return (
    <div>
      <img src={src} alt="svg" />
    </div>
  );
};

export default SVG;
