import { getByDisplayValue } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { getConfigFileParsingDiagnostics } from "typescript";
import { getLogger } from "../../LogConfig";
import "./Legal.css";

const log = getLogger("view.legal");

export interface ILegalComponentProps {

}

export default function Legal(props: ILegalComponentProps) {
  type responseType = {
    resp: string;
  };

  const [response, setResponse] = useState({} as responseType);

  return (
    <div className="Legal">
      <header className="Legal-header"></header>
      <body className="Legal-body">
        <h1>Legal Information</h1>
        <div className="Legal-questions">
          <div>
            You can find all of our legal information at the following pages:
          </div>
        </div>
      </body>
    </div>
  );
}