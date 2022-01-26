import React, { useState, useRef } from "react";

import { Popper, Paper, MenuItem, MenuList } from "src/UI/MUI";
import { ClickAwayListener, SvgIcon, Grow } from "src/UI/MUI/api";

type MenuItem = {
  label: React.ReactNode;
  onClick: () => void;
};

interface IProps {
  Icon: React.ElementType;
  menuItems: Array<MenuItem>;
}

function DropDownMenu({ Icon, menuItems }: IProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const anchorElement = useRef<HTMLElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleListKeyDown = (event: any) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setIsOpen(false);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="drop-down-menu-container">
      <SvgIcon
        ref={anchorElement}
        className="drop-down-menu-icon"
        component={Icon}
        color="primary"
        onClick={handleToggle}
        inheritViewBox
      />
      <Popper open={isOpen} anchorEl={anchorElement.current} placement="bottom" transition disablePortal>
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: "left top",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList className="drop-down-menu" autoFocusItem={isOpen} onKeyDown={handleListKeyDown}>
                  {menuItems.map((menuItem, index) => {
                    const { label, onClick } = menuItem;
                    return (
                      <MenuItem key={index} className="drop-down-menu-item" onClick={onClick}>
                        {label}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

export default DropDownMenu;
