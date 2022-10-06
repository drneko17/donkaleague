import React from "react";

import { CSSTransition } from "react-transition-group";

const SideDrawer: React.FC<{ children?: React.ReactNode; show?: boolean }> = ({
  children,
  show,
}) => {
  return (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="side-drawer-animation"
      mountOnEnter
      unmountOnExit
    >
      <aside className="fixed left-0 top-0 z-50 bg-my-gray h-[100vh] w-[69%]">
        {children}
      </aside>
    </CSSTransition>
  );
};

export default SideDrawer;
