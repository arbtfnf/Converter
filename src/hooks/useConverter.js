import { useEffect, useState } from "react";

import React from 'react'

export default function useConverter(currency) {
    let currencyUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`;

    const [data,setData] = useState({});

    useEffect(() => {
        fetch(currencyUrl)
            .then((res) => (res.json()))   //to convert the string response into JSON format
            .then((res) => setData(res[currency]));
    }, [currency]);
  
    
    return data;
}

// In a hooks, we return the whole method. So we are expoting this method. 
