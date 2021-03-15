import { useLayoutEffect } from "react";

const New = () => {
  useLayoutEffect(() => {
    const main = async () => {
      const { origin, port } = window.location;

      const url =
        (process.env.NODE_ENV === "development"
          ? `${origin.replace(port, "1234")}`
          : origin) + "/new";

      let res = await fetch(url, {
        method: "GET",
        mode: "cors",
        redirect: "follow",
      });
      let resUrl = new URL(res.url);
      let redirectUrl = `${origin}${resUrl.pathname}${resUrl.search}`;

      window.location.replace(redirectUrl);
    };

    main();
  }, []);

  return null;
};

export default New;
