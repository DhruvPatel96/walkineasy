import React, { CSSProperties } from "react";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import CollapsibleTable from "../../components/table";

const container: CSSProperties = {
    padding: "0px 30px 50px",
};

const innerContainer: CSSProperties = {
    height: "40vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0089ED",
};
  
const inputContainer: CSSProperties = {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "stretch",
};

const header: CSSProperties = {
    height: "100px",
    padding: "0px 30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
};

const Search = () => {
	return (<div>
        <div style={header}>
          <Button variant="contained">User details</Button>
        </div>
        <div style={container}>
            <div style={innerContainer}>
                <div style={inputContainer}>
                    <div style={{ background: "#fff", borderRadius: 5, flex: 1 }}>
                    <TextField style={{ width: "100%" }} label="Search" variant="filled" />
                    </div>
                    <div style={{ background: "#fff", borderRadius: 5, marginLeft: "10px" }}>
                    <TextField label="Location" variant="filled" />
                    </div>
                    <Button style={{ marginLeft: "10px" }} variant="contained">Search</Button>
                </div>
            </div>
            <div id="content" style={{ marginTop: "20px" }}>
                <CollapsibleTable />
            </div>
        </div>
      </div>
	);
};

export default Search;
