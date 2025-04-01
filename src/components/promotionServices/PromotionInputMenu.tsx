import React from "react";
import {
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { MoreVertical, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface BlogInputMenuProps {
  id: string;
  onRemoveInput: (id: string) => void;
  onMoveInput: (index: number, direction: "up" | "down") => void;
  index: number;
  blogContentLength: number;
}

const BlogInputMenu = ({
  id,
  index,
  onRemoveInput,
  onMoveInput,
  blogContentLength,
}: BlogInputMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertical />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={() => { onRemoveInput(id); handleClose(); }}>
          <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <span>Remove</span>
            <Trash2 size={16} />
          </span>
        </MenuItem>
        {index > 0 && (
          <MenuItem onClick={() => { onMoveInput(index, "up"); handleClose(); }}>
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <span>Move Up</span>
              <ArrowUp size={16} />
            </span>
          </MenuItem>
        )}
        {blogContentLength > index + 1 && (
          <MenuItem onClick={() => { onMoveInput(index, "down"); handleClose(); }}>
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <span>Move Down</span>
              <ArrowDown size={16} />
            </span>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default BlogInputMenu;
