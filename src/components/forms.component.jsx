import React, { useState, useEffect } from "react";

const Highlighter = () => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [paraValue, setParaValue] = useState("");
  const [caseCheck, setCaseCheck] = useState(false);

  let modifyTextAreaValue = (event) => {
    setTextAreaValue(event.target.value);
  };
  let modifyInputValue = (event) => {
    setInputValue(event.target.value);
  };
  useEffect(() => {
    const addMark = (textA, schA, caseSensi) => {
      let text = textA;
      let sch = schA;
      if (!caseSensi) {
        text = text.toLowerCase();
        sch = sch.toLowerCase();
      }
      var indx = text.indexOf(sch);
      if (schA && indx > -1) {
        let firstStr = [
          textA.substring(0, indx),
          <mark>{textA.substring(indx, indx + sch.length)}</mark>,
        ];
        let balanceStr = addMark(
          textA.substring(indx + sch.length),
          schA,
          caseSensi
        );
        return [firstStr, ...balanceStr];
      } else {
        return [textA];
      }
    };

    let searchResult = addMark(textAreaValue, inputValue, caseCheck);
    setParaValue(searchResult);
    console.log(searchResult);
  }, [inputValue, textAreaValue, caseCheck]);

  const handleCheckbox = (event) => {
    setCaseCheck(event.target.checked ? true : false);
  };
  return (
    <>
      <div class="text-area">
        <label>Type text:</label>
        <textarea
          data-testid="source-text"
          onChange={modifyTextAreaValue}
          value={textAreaValue}
        />
      </div>
      <div class="search-input">
        <label>Search your text:</label>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => modifyInputValue(event)}
        />
      </div>
      <div class="search-input">
        <label>Case Sensitive</label>
        <input type="checkbox" checked={caseCheck} onChange={handleCheckbox} />
      </div>
      <div className="para" data-testid="result">
        {paraValue}
      </div>
    </>
  );
};

export default Highlighter;
