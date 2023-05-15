import React, { useState } from "react";
import { getBezierPath, EdgeLabelRenderer } from "reactflow";
import { alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import palette from "../../../../theme/palette";
import { Typography } from "@mui/material";
const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [defaultValue, setDefaultValue] = useState(data.label);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <path id={id} className="react-flow__edge-path" d={edgePath} />
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
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            background: `${alpha(palette.primary.main, 0.6)}`,
            padding: 10,
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700,
            pointerEvents: "all",
          }}
          onClick={handleClick}
          className="nodrag nopan"
        >
          <Typography>{data.label}</Typography>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
