import React, { useEffect, useRef } from "react";
//import Flippy, { FrontSide, BackSide } from "react-flippy";
import ButtonAppBar from "./components/Header";
import SideNav from "./components/Sidenav";

const App = ({ props }) => {

  const ref = useRef();

  return (
      <div>
          <SideNav />
          {/* <ButtonAppBar /> */}
          {/* <Table /> */}
      </div>

  );
};

export default App;















    // <Flippy
    //   flipOnHover={false} // default false
    //   flipOnClick={true} // default false
    //   flipDirection="horizontal" // horizontal or vertical
    //   ref={ref} // to use toggle method like ref.curret.toggle()
    //   // if you pass isFlipped prop component will be controlled component.
    //   // and other props, which will go to div
    //   style={{ width: "300px", height: "500px" }} /// these are optional style, it is not necessary
    // >
    //   <FrontSide style={{ backgroundColor: "#41669d" }}>
    //     RICK <br />
    //     <button
    //       onClick={() => {
    //         ref.current.toggle();
    //       }}
    //     >
    //       {" "}
    //       Toggle via button
    //     </button>
    //   </FrontSide>
    //   <BackSide style={{ backgroundColor: "#175852" }}>ROCKS</BackSide>
    // </Flippy>