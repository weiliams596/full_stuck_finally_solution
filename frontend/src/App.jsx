import React from "react";

import GlobalRouters from "./Components/Routers/GlobalRouters";
import Frame from "./Components/Frame/Frame";
import SetContext from "./Components/Contexts/SetContexts/SetContext";

function App() {
  const {hder} = React.useContext(SetContext);
  return (
      <Frame hder={hder}>
        <GlobalRouters />
      </Frame>
      );
}

export default App;
