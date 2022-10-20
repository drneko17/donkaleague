import React from "react";

const VersionContext = React.createContext("");

const getVersion = async () => {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );
  const data = await response.json();
  return data[0];
};
let myVersion = "";
getVersion().then((data) => (myVersion = data));

export const VersionContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <VersionContext.Provider value={myVersion}>
      {children}
    </VersionContext.Provider>
  );
};

export default VersionContext;
