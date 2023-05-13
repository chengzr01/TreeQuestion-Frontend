import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { useState } from "react";

export default function RoleMenu({ setRole }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [displayRole, setDisplayRole] = useState("Role");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {displayRole}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setRole("teacher");
            setDisplayRole("Teacher");
          }}
        >
          Teacher
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setRole("student");
            setDisplayRole("Student");
          }}
        >
          Student
        </MenuItem>
      </Menu>
    </div>
  );
}
