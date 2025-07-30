import React from "react";

import GlobalRouters from "./Components/Routers/GlobalRouters";
import Frame from "./Components/Frame/Frame";
import SetContext from "./Components/Contexts/SetContexts/SetContext";
import {useHeartBeat} from "./Components/Hooks/useHeartBeat.jsx";

function App() {
  const {headerDom,footerDom} = React.useContext(SetContext);
  const authStatues = useHeartBeat();
  return (
      <Frame headerDom={headerDom} footerDom={footerDom}>
        <GlobalRouters />
      </Frame>
      );
}

export default App;
