import PageLayout from "comps/PageLayout.tsx";
// import PageLayout from "islands/PageLayout.tsx";

import LeftAside from "islands/LeftAside.tsx";
import { Path } from "path";

const account = () => {
  return (
    <PageLayout
      pageTitle="部门"
      leftAside={<LeftAside matchPath={Path.Account} />}
    >
      index
    </PageLayout>
  );
};

export default account;
