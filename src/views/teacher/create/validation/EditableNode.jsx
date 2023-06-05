import * as React from "react";
import { useState } from "react";

import { alpha } from "@mui/material/styles";
import {
  Button,
  Typography,
  Menu,
  MenuItem,
  Slide,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Input,
} from "@mui/material";

import { Handle, Position } from "reactflow";

import palette from "../../../../theme/palette";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditableNode({ id, data, method, isConnectable }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [nodeName, setNodeName] = useState(data.label);

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
      <Dialog open={modifyOpen} TransitionComponent={Transition} keepMounted>
        <DialogTitle>{"Modify Node"}</DialogTitle>
        <DialogContent>
          <Input
            value={nodeName}
            multiline
            onChange={(evt) => setNodeName(evt.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setModifyOpen(false);
              data.update(id, nodeName);
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

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
          sx={{ minWidth: "10vw" }}
          onClick={() => {
            handleClose();
            setModifyOpen(true);
          }}
        >
          Modify
        </MenuItem>
      </Menu>

      <Handle
        type="target"
        position={Position.Right}
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
          {nodeName}
        </Typography>
      </div>

      <Handle
        type="source"
        position={Position.Left}
        isConnectable={isConnectable}
      />
    </div>
  );
}
