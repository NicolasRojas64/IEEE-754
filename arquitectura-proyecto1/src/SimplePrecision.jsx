import React, { useState } from 'react'

export const SimplePrecision = () => {
    const number = 951.35;
    
    //let number = 71.3125;
    const [integerPart, decimalPart] =  number.toString().split(".")
    const binaryNumber = number.toString(2);
    const  [binaryIntegerPart, binaryDecimalPart] = binaryNumber.split(".");


    function denormalize(){
        let corrimiento;
        if(number > 0){
            let a = binaryNumber.replace(".","");
            corrimiento = a.slice(0,1) + "." + a.slice(2)
        }
        return corrimiento;
    }

    const calculateExponent =()=>{
        let exp;
        if(number > 0){
            let index = binaryNumber.indexOf(".");
            exp = "127 + "+ (index-1) + " = " + (127 + (index - 1)) + " (10) --> "+ (127 + (index - 1)).toString(2) + " (2)";
        }
        return exp;
    }

    const  exponent = ()=>{
        let exp;
        if(number > 0){
            let index = binaryNumber.indexOf(".");
            exp = (127 + (index - 1)).toString(2);
        }
        return exp;
    }

   const  calculateSign= ()=>{
        let s;
        if(number >= 0){
            s = 0;
        }else{
            s = 1;
        }
        return s;
   }

   const  mantissa = ()=>{
        let denormalized = denormalize();
        let mantissa = denormalized.slice(2);
        console.log(23 - (mantissa.length))
        console.log(mantissa.length <= 23)
        if(mantissa.length <= 23){
            for(let i; i <= (23 - (mantissa.length)); i++){
                mantissa.concat("0");
            }
        }
        return mantissa;
   }


  return (
    
        <div>
            
            <h2>Número a convertir: {number}</h2>
            <h2>Parte entera en binario: {integerPart + " (10) --> " + binaryIntegerPart + " (2)"}</h2>

            <h2>Parte decimal en binario: {decimalPart + " (10) --> " + binaryDecimalPart.substring(0,30) + " (2)"}</h2>

            <h2>Unión de parte entera(2) y parte decimal(2): {binaryIntegerPart + "." + binaryDecimalPart.substring(0,30)}</h2>

            <h2>Corrimiento hacia el uno más cercano: {denormalize()}</h2>

            <h2>Exponente en binario: {calculateExponent()}</h2>

            <h2>Conversión a presición simple (32 bits): </h2>

            <h3>Signo: {calculateSign()}</h3>
            <h3>Exponente: {exponent()}</h3>
            <h3>Mantisa: {mantissa()}</h3>

            <h2>Conversión de presición simple a hexadecimal: </h2>
        </div>
  )
}


