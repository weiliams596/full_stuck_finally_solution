import React from "react";

import GlobalRouters from "./Components/Routers/GlobalRouters";
import Frame from "./Components/Frame/Frame";
import SetContext from "./Components/Contexts/SetContexts/SetContext";

function App() {
  const {headerDom,footerDom} = React.useContext(SetContext);
  return (
      <Frame headerDom={headerDom} footerDom={footerDom}>
        <GlobalRouters />
      </Frame>
      );
}

export default App;
