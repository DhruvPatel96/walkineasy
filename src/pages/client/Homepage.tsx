import React, { CSSProperties } from "react";
import { Button } from "@mui/material";

const container: CSSProperties = {
    padding: "0px 30px 50px",
  };

const header: CSSProperties = {
    height: "100px",
    padding: "0px 30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
};

const HomePage = () => {
    return (
      <div>
        <div style={header}>
          <Button variant="contained">User details</Button>
        </div>
      </div>
    );
  };

export default HomePage;