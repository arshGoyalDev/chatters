import { ReactElement } from "react";

import SocketProvider from "./SocketContext";

const ContextContainer = ({children} :{children: ReactElement}) => {
  return (
    <SocketProvider>
      {children}
    </SocketProvider>
  )
}
export default ContextContainer