import React, { useEffect, useState } from "react";

const VersionContext = React.createContext("");

export const VersionContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [version, setVersion] = useState("12.16.1");

  useEffect(() => {
    fetch("https://ddragon.leagueoflegends.com/api/versions.json")
      .then((res) => res.json())
      .then((data) => setVersion(data[0]));
  }, []);

  return (
    <VersionContext.Provider value={version}>
      {children}
    </VersionContext.Provider>
  );
};

export default VersionContext;
