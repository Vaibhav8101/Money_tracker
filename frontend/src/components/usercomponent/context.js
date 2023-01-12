const AppContext=React.createContext()
const AppProvider=({children})=>{
    return <AppContext.Provider value={"vaibhav"}>{children}</AppContext.Provider>;
};

export {AppContext,AppProvider};