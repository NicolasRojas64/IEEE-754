import React, { useContext, useState } from 'react'
import './SimplePrecision.css'
export const SimplePrecision = () => {
    const [number, setnumber] = useState(0)
    const binaryNumber = Math.abs(number).toString(2);
    const [integerPart, setintegerPart] = useState(0)
    const [decimalPart, setdecimalPart] = useState(0)
    const [binaryIntegerPart, setbinaryIntegerPart] = useState(1)
    const [binaryDecimalPart, setbinaryDecimalPart] = useState(1)
    const convertNumber=()=>{
        
        const [integerPartSplit, decimalPartSplit] =  Math.abs(number).toString().split(".")
        const [binaryIntegerPartSplit, binaryDecimalPartSplit] = binaryNumber.split(".");
        setintegerPart(integerPartSplit)
        setdecimalPart(decimalPartSplit)
        setbinaryIntegerPart(binaryIntegerPartSplit)
        setbinaryDecimalPart(binaryDecimalPartSplit)
            // setbinaryDecimalPart(binaryDecimalPartSplit)
    }
    //const positions = () => {
        // let count = 0;
        // if(binaryDecimalPart>0){
        //     let binArray = binaryDecimalPart.split('');
        //     for(let i = 0; binArray[i] === "0";i++){
        //         count++;
        //     }
        //     return count+1;
        // }
        // return 0
    //}

    const positions = () => {
        let count = 0;
        let binArray = binaryDecimalPart.toString().split('');
        for(let i = 0; binArray[i] === "0";i++){
            count++;
        }
        return count+1;
    }

    const  denormalize=()=>{
        let corrimiento;
        if(integerPart ==="0"){
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

    const  denormalizeDouble=()=>{
        let corrimiento;
        if(integerPart ==="0"){
            let index = positions();
            let a = binaryNumber.replace(".","");
            corrimiento = a.slice(index, index+1) + "." + a.slice(index+1)
        }
        else{
            let a = binaryNumber.replace(".","");
            corrimiento = a.slice(0,1) + "." + a.slice(1)
        }
        
        return corrimiento.substring(0,60);
    }

    const calculateExponent =()=>{
        let exp;
        if(integerPart === "0"){
            let index = positions();
            exp = "127 - "+ index + " = " + (127 - index) + " (10) --> "+ (127 - index).toString(2) + " (2)";
        }
        else{
            let index = binaryNumber.indexOf(".");
            exp = "127 + "+ (index-1) + " = " + (127 + (index - 1)) + " (10) --> "+ (127 + (index - 1)).toString(2) ;
        }
        return exp;
    }
    const calculateExponentDouble =()=>{
        let exp;
        if(integerPart == "0"){
            let index = positions();
            exp = "1023 - "+ index + " = " + (1023 - index) + " (10) --> "+ (1023 - index).toString(2) + " (2)";
        }
        else{
            let index = binaryNumber.indexOf(".");
            exp = "1023 + "+ (index-1) + " = " + (1023 + (index - 1)) + " (10) --> "+ (1023 + (index - 1)).toString(2) + " (2)";
        }
        return exp;
    }
    const  exponentDouble = ()=>{
        let exp;
        if(integerPart == "0"){
            let index = positions()
            exp = (1023 - index).toString(2);
        }else{
            let index = binaryNumber.indexOf(".");
            exp = (1023 + (index - 1)).toString(2);
        }

        let ceros = "";
        if(exp.length < 11){
            for(let i = 0; i < (11 - exp.length); i++){
                ceros = ceros.concat("0");
            }
            exp = ceros.concat(exp);
        }
        
        return exp;
    }

    const  exponent = ()=>{
        let exp;
        if(integerPart === "0"){
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
   const mantissaDouble = () => {
    let denormalized = denormalizeDouble();
    let m = denormalized.slice(2);
    let difference = (52 - (m.length));
    if(m.length < 52){
        for(let i = 0; i < difference; i++){
            m+="0";
        }
    }

    if(m.length > 52){
        m = m.substring(0,52)
    }
    return m;
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

    return [...hexa];
    }

    const binarylArrayDouble = () => {
        let binArray = [];
        let h = sign() + exponentDouble() + mantissaDouble();
        for(let i = 0; i < 16; i++){
            binArray.push(h.substring(i*4, (i*4) + 4))
        }
        return binArray;
    }
    
    const hexadecimalArrayDouble = () =>{
        let hexaArray = [];
        let binArray = binarylArrayDouble();
        for(let i = 0; i < binArray.length; i++){
            hexaArray.push(parseInt(binArray[i], 2).toString(16).toUpperCase())
        }
        return hexaArray;
    }
    
    const hexadecimalNumberDouble = () => {
        let hexa = "";
        let h = hexadecimalArrayDouble();
        for(let i = 0; i < h.length; i++){
            hexa = hexa.concat(h[i])
        }
        return hexa;
    }

  return (
    <>
    <h1>CALCULADORA IEEE754</h1>
    <div className='inputs'>
        <input type='number' className='input-text' name='number' value={number} onChange={e => setnumber(e.target.value)}></input>
        <button className='button-44' onClick={convertNumber}> Convertir </button>
    </div>
    <div className='conversor'>
        <div className='conversor-simple'>
            <h2>Presicion simple</h2>

            <h3>Parte entera en binario: {'\n' + integerPart + " (10)"} </h3> <h4>{binaryIntegerPart + "(2)"}</h4>

            <h3>Parte decimal en binario:{decimalPart + " (10)"} </h3>
            <h4>{binaryDecimalPart.length >= 0 ? binaryDecimalPart.substring(0, 30) : 0 + " (2)"}</h4>
            <h3>Unión de parte entera(2) y parte decimal(2): </h3>
            <h4>{binaryDecimalPart.length >= 0 ? binaryIntegerPart + "." + binaryDecimalPart.substring(0, 30) : 0}</h4>
            <h3>Corrimiento hacia el uno más cercano:</h3>
            <h4> {denormalize()}</h4>
            <h3>Exponente en binario: </h3>
            <h4>{calculateExponent()}</h4>
            <h3>Conversión a presición simple (32 bits): </h3>
            <h4>1</h4>
            <h3>Signo: </h3>
            <h4>{sign()}</h4>
            <h3>Exponente: </h3>
            <h4>{exponent()}</h4>
            <h3>Mantisa:</h3>
            <h4> {mantissa()}</h4>
            <hr />
            <h3 className='title'>Conversion a presicion Simple 32 Bits</h3>
            <table className='customTable'>
                <tr>
                    <th>Signo</th>
                    <th>Exponente</th>
                    <th>Mantiza</th>
                </tr>
                <tr>
                    <td>{sign()}</td>
                    <td>{exponent()}</td>
                    <td>{mantissa()}</td>
                </tr>
            </table>
            <h3 className='title'>Conversion a de precision simple a hexadecimal</h3>
            <table className='customTable'>
                <thead>

                <tr>
                    <th>{binarylArray()[0]}</th>
                    <th>{binarylArray()[1]}</th>
                    <th>{binarylArray()[2]}</th>
                    <th>{binarylArray()[3]}</th>
                    <th>{binarylArray()[4]}</th>
                    <th>{binarylArray()[5]}</th>
                    <th>{binarylArray()[6]}</th>
                    <th>{binarylArray()[7]}</th>

                </tr>
                </thead>
                <tbody>

                <tr>
                    <td>{hexadecimalNumber()[0]}</td>
                    <td>{hexadecimalNumber()[1]}</td>
                    <td>{hexadecimalNumber()[2]}</td>
                    <td>{hexadecimalNumber()[3]}</td>
                    <td>{hexadecimalNumber()[4]}</td>
                    <td>{hexadecimalNumber()[5]}</td>
                    <td>{hexadecimalNumber()[6]}</td>
                    <td>{hexadecimalNumber()[7]}</td>

                </tr>
                </tbody>
            </table>
            <h3>Resultado</h3>
            <h3>{hexadecimalNumber()}</h3>



                </div>
                <div className='conversor-doble'>
                    <h2>Presicion Doble</h2>

                    <h3>Parte entera en binario: {'\n' + integerPart + " (10)"} </h3> <h4>{binaryIntegerPart + " (2)"}</h4>

                    <h3>Parte decimal en binario:{decimalPart + " (10)"} </h3>
                    <h4>{binaryDecimalPart.length >= 0 ? binaryDecimalPart.substring(0, 30) : 0 + " (2)"}</h4>
                    <h3>Unión de parte entera(2) y parte decimal(2): </h3>
                    <h4>{binaryDecimalPart.length >= 0 ? binaryIntegerPart + "." + binaryDecimalPart.substring(0, 30) : 0}</h4>
                    <h3>Corrimiento hacia el uno más cercano:</h3>
                    <h4> {denormalize()}</h4>
                    <h3>Exponente en binario: </h3>
                    <h4>{calculateExponentDouble()}</h4>
                    <h3>Conversión a presición simple (32 bits): </h3>
                    <h4>1</h4>
                    <h3>Signo: </h3>
                    <h4>{sign()}</h4>
                    <h3>Exponente: </h3>
                    <h4>{exponentDouble()}</h4>
                    <h3>Mantisa:</h3>
                    <h4> {mantissaDouble()}</h4>
                    <hr />
                    <h3 className='title'>Conversion a presicion doble 64 Bits</h3>
                    <table className='customTable'>
                        <tr>
                            <th>Signo</th>
                            <th>Exponente</th>
                            <th>Mantiza</th>
                        </tr>
                        <tr>
                            <td>{sign()}</td>
                            <td>{exponentDouble()}</td>
                            <td>{mantissaDouble()}</td>
                        </tr>
                    </table>
                    <h3 className='title'>Conversion a de precision simple a hexadecimal</h3>
                    <table className='customTable'>
                <thead>

                <tr>
                    <th>{binarylArrayDouble()[0]}</th>
                    <th>{binarylArrayDouble()[1]}</th>
                    <th>{binarylArrayDouble()[2]}</th>
                    <th>{binarylArrayDouble()[3]}</th>
                    <th>{binarylArrayDouble()[4]}</th>
                    <th>{binarylArrayDouble()[5]}</th>
                    <th>{binarylArrayDouble()[6]}</th>
                    <th>{binarylArrayDouble()[7]}</th>
                    <th>{binarylArrayDouble()[9]}</th>
                    <th>{binarylArrayDouble()[10]}</th>
                    <th>{binarylArrayDouble()[11]}</th>
                    <th>{binarylArrayDouble()[12]}</th>
                    <th>{binarylArrayDouble()[13]}</th>
                    <th>{binarylArrayDouble()[14]}</th>
                    <th>{binarylArrayDouble()[15]}</th>
               




                </tr>
                </thead>
                <tbody>

                <tr>
                    <td>{hexadecimalArrayDouble()[0]}</td>
                    <td>{hexadecimalArrayDouble()[1]}</td>
                    <td>{hexadecimalArrayDouble()[2]}</td>
                    <td>{hexadecimalArrayDouble()[3]}</td>
                    <td>{hexadecimalArrayDouble()[4]}</td>
                    <td>{hexadecimalArrayDouble()[5]}</td>
                    <td>{hexadecimalArrayDouble()[6]}</td>
                    <td>{hexadecimalArrayDouble()[8]}</td>
                    <td>{hexadecimalArrayDouble()[9]}</td>
                    <td>{hexadecimalArrayDouble()[10]}</td>
                    <td>{hexadecimalArrayDouble()[11]}</td>
                    <td>{hexadecimalArrayDouble()[12]}</td>
                    <td>{hexadecimalArrayDouble()[13]}</td>
                    <td>{hexadecimalArrayDouble()[14]}</td>
                    <td>{hexadecimalArrayDouble()[15]}</td>



                </tr>
                </tbody>
            </table>
            <h3>Resultado</h3>
            <h3>{hexadecimalNumberDouble()}</h3>



                </div>
            </div>
        </>
    )
}