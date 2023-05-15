import { Card, Paper, Typography } from "@mui/material";
import { Handle, Position } from "reactflow";
import Grid from "@mui/material/Grid";
import { alpha, styled } from "@mui/material/styles";
import { useState } from "react";
import EditableText from "./EditableText";
import palette from "../../../../theme/palette";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

export default function EditableNode({ data, isConnectable }) {
  const [defaultValue, setDefaultValue] = useState(data.label);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div
      className="editable-node"
      style={{
        minWidth: "10vw",
        minHeight: "5vh",
        borderWidth: "0.5",
        borderColor: "black",
        backgroundColor: `${alpha(palette.grey[300], 0.6)}`,
      }}
    >
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Modify</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <Typography
          id="basic-button"
          sx={{ p: 1 }}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {data.label}
        </Typography>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}
