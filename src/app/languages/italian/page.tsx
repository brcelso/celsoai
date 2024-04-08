"use client";
import React from "react";

function ItalianPage() {
  const numberNames = [
    "uno", "due", "tre", "quattro", "cinque", "sei", "sette", "otto", "nove", "dieci",
    "undici", "dodici", "tredici", "quattordici", "quindici", "seidici", "diciassette",
    "diciotto", "dicianove", "venti", "ventuno", "ventidue", "ventitre", "ventiquattro",
    "venticinque", "ventisei", "ventissette", "ventotto", "ventinove", "trenta",
    "quaranta", "cinquanta", "sessanta", "setanta", "ottanta","novanta",
    // ... (you can add a few more here for reference)
  ];

  const numberList = Array.from({ length: 100 }, (_, i) => {
    const number = i + 1;
    const name = numberNames[number - 1] || `numero ${number}`; // Handle numbers beyond defined names

    return (
      <div key={i}>
        {number} - {name}
      </div>
    );
  });

  return (
    <div>
      <h1>Numeri italiani (1-100)</h1>
      {numberList}
    </div>
  );
}

export default ItalianPage;


  
  
