import { useCallback, useState, useRef } from 'react'
import Input from './components/input'
import useConverter from './hooks/useConverter'

function App() {

  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState('inr')
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useConverter(from)

  const textRef = useRef(null);

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    // const tmp = amount;
    setAmount(convertedAmount)
    setConvertedAmount(amount)
  }

  const change = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  const resetValues = () => {
    setAmount(0)
    setConvertedAmount(0)
  }

  const copyTextToClipboard = useCallback(() => {
    textRef.current?.select()
    window.navigator.clipboard.writeText(convertedAmount);
  }, [convertedAmount])
  


  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://images.pexels.com/photos/18379232/
                pexels-photo-18379232/free-photo-of-wheat-on-a-field-during-sunset.jpeg?
                auto=compress&cs=tinysrgb&w=800&lazy=load')`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                  <h1>Currency Converter</h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            change()
                        }}
                    >
                        <div className="w-full mb-1">
                            <Input
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onAmountChange={(amount) => setAmount(amount)}
                                onCurrencyChange={(currency) => setAmount(amount)}
                                selectCurrency={from}

                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                              swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <Input
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setTo(currency)}
                                selectCurrency={to}
                                amountDisable
                                ref={textRef}
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                        
                        <div className='flex py-2 p-2'>
                          <button 
                            onClick={copyTextToClipboard}
                            type="submit" 
                            className="relative w-full bg-blue-100
                            text-slate-500 px-4 py-3 rounded-lg
                            hover:bg-slate-200"
                          >
                            Copy amount {from.toUpperCase()} to {to.toUpperCase()}
                          </button>
                          <button 
                            onClick={resetValues}
                            type="submit" 
                            className="relative w-small bg-blue-100
                          text-slate-500 px-4 py-3 rounded-lg
                          hover:bg-slate-200"
                          >
                            Reset
                          </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App
