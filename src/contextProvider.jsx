import { ToastProvider } from "@heroui/react";
import { createContext, useContext, useState } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
    const [data, setData] = useState(null);

    return (
        <Context.Provider value={{ data, setData }}>
            <ToastProvider placement="top-center"/>
            {children}
        </Context.Provider>
    )
}

export const useContextProvider = () => {
    return useContext(Context);
}

export default ContextProvider;
