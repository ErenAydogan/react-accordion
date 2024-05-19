import { useState } from "react";
import data from "./data.js";

export default function App() {
    const [multiMode, setMultiMode] = useState(false);
    const [selected, setSelected] = useState();
    const [multiSelected, setMultiSelected] = useState([]);

    function handleMultiMode() {
        setMultiMode(() => !multiMode)
        setSelected(null)
        setMultiSelected([])
    }

    function handleSingleContent(getCurrentId) {
        setSelected(getCurrentId === selected ? null : getCurrentId); 
    }

    function handleMultiContent(getCurrentId) {
        setMultiSelected(prevMultiSelected => {
          if (prevMultiSelected.includes(getCurrentId)) {
            return prevMultiSelected.filter(id => id !== getCurrentId);
          } else {
            return [...prevMultiSelected, getCurrentId];
          }
        });
      }

  return (
    <>
        <div className="header">
            <h1 className="header-title">Accordion</h1>
        </div>
        <div className="wrapper">
            <button onClick={handleMultiMode}>
            {
                multiMode ? "Disable Multi Selection" : "Enable Multi Selection"
            }
            </button>
            <div className="wrapper__accordion">
                {
                    data.map
                    (
                        FAQ =>  (
                            <div 
                            className="wrapper__accordion-item" 
                            key={FAQ.id} 
                            onClick=
                            { 
                                multiMode 
                                ? () => handleMultiContent(FAQ.id)
                                : () => handleSingleContent(FAQ.id)
                            }>
                                <div className="wrapper__accordion-item__container container-active">
                                    <span>+</span>
                                    <h2>{FAQ.question}</h2>
                                    <span>+</span>
                                </div>
                                {
                                    (multiMode ? multiSelected.indexOf(FAQ.id) != -1 : selected == FAQ.id) && <p className="wrapper__accordion-item__content">{FAQ.answer}</p>
                                }
                            </div>
                        )
                    )
                }
            </div>
        </div>
    </>
  );
}
