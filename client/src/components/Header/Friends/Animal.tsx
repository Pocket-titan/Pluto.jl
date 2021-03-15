import _ from "lodash";
import { useEffect, useState } from "react";

const Animal = ({ animal, color }: { animal: string; color: string }) => {
  const [src, setSrc] = useState<string>();

  const title = `Anonymous ${_.capitalize(animal)}`;

  useEffect(() => {
    import(`assets/animals/${_.capitalize(animal)}.png`).then((src: any) => {
      setSrc(src.default);
    });
  }, [animal]);

  if (!src) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxHeight: "200px",
        maxWidth: "200px",
        borderRadius: "50%",
        backgroundColor: color,
        height: 28,
        width: 28,
        padding: 1.5,
      }}
    >
      <img
        src={src}
        title={title}
        alt={title}
        style={{
          width: "80%",
          height: "80%",
          userSelect: "none",
        }}
      />
    </div>
  );
};

export default Animal;
