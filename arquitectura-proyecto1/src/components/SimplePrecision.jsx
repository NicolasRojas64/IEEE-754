import React, { useState } from 'react'

export const SimplePrecision = () => {
    //const number = -951.35;
    const number = 71.3125;
    //const number = 0.15;

    const [integerPartSplit, decimalPartSplit] =  Math.abs(number).toString().split(".")
    const [binaryNumber, setbinaryNumber] = useState(Math.abs(number).toString(2))
    const  [binaryIntegerPartSplit, binaryDecimalPartSplit] = binaryNumber.split(".");
    const [integerPart, setintegerPart] = useState(integerPartSplit)
    const [decimalPart, setdecimalPart] = useState(decimalPartSplit)
    const [binaryIntegerPart, setbinaryIntegerPart] = useState(binaryIntegerPartSplit)
    const [binaryDecimalPart, setbinaryDecimalPart] = useState(binaryDecimalPartSplit)

    const positions = () => {
        let count = 0;
        let binArray = binaryDecimalPart.split('');
        for(let i = 0; binArray[i] == "0";i++){
            count++;
        }
        return count+1;
    }

    function denormalize(){
        let corrimiento;
        if(integerPart == 0){
            let index = positions();
            let a = binaryNumber.replace(".","");
            corrimiento = a.slice(index, index+1) + "." + a.slice(index+1)
        }
        else{
            let a = binaryNumber.replace(".","");
            corrimiento = a.slice(0,1) + "." + a.slice(1)
        }
        
        return corrimiento.substring(0,30);
    }

    const calculateExponent =()=>{
        let exp;
        if(integerPart == 0){
            let index = positions();
            exp = "127 - "+ index + " = " + (127 - index) + " (10) --> "+ (127 - index).toString(2) + " (2)";
        }
        else{
            let index = binaryNumber.indexOf(".");
            exp = "127 + "+ (index-1) + " = " + (127 + (index - 1)) + " (10) --> "+ (127 + (index - 1)).toString(2) + " (2)";
        }
        return exp;
    }

    const  exponent = ()=>{
        let exp;
        if(integerPart == 0){
            let index = positions()
            exp = (127 - index).toString(2);
        }else{
            let index = binaryNumber.indexOf(".");
            exp = (127 + (index - 1)).toString(2);
        }

        let ceros = "";
        if(exp.length < 8){
            for(let i = 0; i < (8 - exp.length); i++){
                ceros = ceros.concat("0");
            }
            exp = ceros.concat(exp);
        }
        
        return exp;
    }

   const sign= ()=>{
        let s;
        number >= 0 ? s = 0 : s = 1;
        return s;
   }

   const mantissa = () => {
        let denormalized = denormalize();
        let m = denormalized.slice(2);
        let difference = (23 - (m.length));
        if(m.length < 23){
            for(let i = 0; i < difference; i++){
                m+="0";
            }
        }

        if(m.length > 23){
            m = m.substring(0,23)
        }
        return m;
    }   

    const binarylArray = () => {
        let binArray = [];
        let h = sign() + exponent() + mantissa();
        for(let i = 0; i < 8; i++){
            binArray.push(h.substring(i*4, (i*4) + 4))
        }
        return binArray;
    }

    const hexadecimalArray = () =>{
        let hexaArray = [];
        let binArray = binarylArray();
        for(let i = 0; i < binArray.length; i++){
            hexaArray.push(parseInt(binArray[i], 2).toString(16).toUpperCase())
        }
        return hexaArray;
    }

    const hexadecimalNumber = () => {
        let hexa = "";
        let h = hexadecimalArray();
        for(let i = 0; i < h.length; i++){
            hexa = hexa.concat(h[i])
        }
        return hexa;
    }

  return (
    
        <div className='general-simple'>
            
            <h2>Número a convertir: {number}</h2>
            <h2>Parte entera en binario: {integerPart + " (10) --> " + binaryIntegerPart + " (2)"}</h2>

            <h2>Parte decimal en binario: {decimalPart + " (10) --> " + binaryDecimalPart.substring(0,30) + " (2)"}</h2>

            <h2>Unión de parte entera(2) y parte decimal(2): {binaryIntegerPart + "." + binaryDecimalPart.substring(0,30)}</h2>

            <h2>Corrimiento hacia el uno más cercano: {denormalize()}</h2>

            <h2>Exponente en binario: {calculateExponent()}</h2>

            <h2>Conversión a presición simple (32 bits): </h2>

            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th className='th'>Signo</th>
                            <th className='th'>Exponente</th>
                            <th className='th'>Mantisa</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th className='th'>{sign()}</th>
                            <th className='th'>{exponent()}</th>
                            <th className='th'>{mantissa()}</th>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2>Conversión de presición simple a hexadecimal: </h2>

            <div className='table'>
                <table>
                    <thead>
                        <tr className="tr">
                            {(binarylArray()).map((b,i)=>{
                                return <th className='th'>{b}</th>
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="tr">
                            {(hexadecimalArray()).map((h,i)=>{
                                return <th className='th'>{h}</th>
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>

                <h2>Resultado: {hexadecimalNumber()}</h2>
        </div>
  )
}


