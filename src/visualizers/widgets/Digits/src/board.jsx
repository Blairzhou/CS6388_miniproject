import React ,{ useState , useEffect } from 'react';
import Digit from './digit';
import Operation from './operation';
import Undo from './undo';

export default function Board({values}) {
    const [selectedDigits, setSelectedDigits] = useState({
        TL: false,
        TC: false,
        TR: false,
        BL: false,
        BC: false,
        BR: false,
    });

      const [selectedOperation, setSelectedOperation] = useState({
        "+": false,
        "-": false,
        "x": false,
        "÷": false
    });

    const [updatedValues, setUpdatedValues] = useState({
        TL: values["TL"],
        TC: values["TC"],
        TR: values["TR"],
        BL: values["BL"],
        BC: values["BC"],
        BR: values["BR"],
    });


    const [performOperation, setPerformOperation] = useState({})
    const [undoArray, setUndoArray] = useState([])
    const [win, setCheckWin] = useState(false)
    const targetValue = values["target"]

    const handleDigitClick = (name, value) => {
        //console.log(performOperation)
        // Check whether this is string or number
        if(performOperation.src && performOperation.operation && value !== -1) {
            setPerformOperation((prevPerformOperation) => ({
                ...prevPerformOperation,
                dst: {
                    position: name,
                    value: value,
                },
            }));
            let tempDict = { ...performOperation };
            tempDict.dst = {
                position: name,
                value: value,
            };

            let originalValue = {}

            originalValue.src = {
                position: performOperation.src.position,
                value: performOperation.src.value,
            }
            originalValue.dst = {
                position: name,
                value: value,
            };

            //console.log("value: ",originalValue)

            
            //Remove the clicked effect for the src
            // Set clicked effect for the number
            
            setSelectedDigits((prevSelectedDigits) => ({
                ...prevSelectedDigits,
                [performOperation.src.position]: !prevSelectedDigits[performOperation.src.position],
            })); 

            // Update the operation to the undo
            setUndoArray((prevUndoArray) => [...prevUndoArray, originalValue]);
            // Reset the click effect
            setSelectedOperation({"+": false, "-": false, "x": false,"÷": false})
            calculation(tempDict)
        }
        //setUndoArray((prevUndoArray) => [...prevUndoArray, originalValue]);

        if(!performOperation.src && value !== -1) {
            setPerformOperation({
                src: {
                  position: name,
                  value: value,
                },
            });

            // Set clicked effect for the number
            setSelectedDigits((prevSelectedDigits) => ({
                ...prevSelectedDigits,
                [name]: !prevSelectedDigits[name],
            }));

            //console.log("Original Value:", originalValue);
        }

    };

    

    const calculation = (data) => {
        //console.log("Checking Data:" )
        //console.log(data);

        let result = -1

        if(data.operation.operation === "+") {
            
            result = data.src.value + data.dst.value;
            
        }
        else if (data.operation.operation === "-") {
            
            result = data.src.value - data.dst.value;

        }
        else if (data.operation.operation === "x") {
            
            result = data.src.value * data.dst.value;

        }
        else {
            
            result = data.src.value / data.dst.value;
        }
        data.dst.value = result
        data.src.value = -1

        //console.log(data)
        // Update the digit values in the updatedValues state
        setUpdatedValues((prevUpdatedValues) => ({
            ...prevUpdatedValues,
            [data.dst.position]: result,
            [data.src.position]: data.src.value
        }));
        //Reset the operation
        setPerformOperation({})

        if(data.dst.value === targetValue) {
            //console.log("Match the target value!")
            setCheckWin(true)
        } else {
            //console.log("Moving to update value")
        }

        WEBGME_CONTROL.updateDigits(data);
        
       
    }

    const handleOperation = (operation) => {
        //console.log(operation)
        //console.log(`Operation: ${operation} got clicked`);
        if (performOperation.src && !performOperation.dst) {
            setPerformOperation((prevPerformOperation) => ({
            ...prevPerformOperation,
                operation: {
                    operation: operation,
                    order: undoArray.length,
                },
            }));

            //Toggle the click effect
            const isOperationSelected = selectedOperation[operation];

            // If it's already selected, deselect it; otherwise, select it.
            setSelectedOperation((prevSelectedOperation) => ({
                ...prevSelectedOperation,
                [operation]: !isOperationSelected,
            }));
        }
    };

    const handleUndo = () => {
        console.log("Undo got clicked");
        if(undoArray.length > 0) {
            let temp = undoArray.pop()
            console.log(temp)
            setUpdatedValues((prevUpdatedValues) => ({
                ...prevUpdatedValues,
                [temp.dst.position]: temp.dst.value,
                [temp.src.position]: temp.src.value
            }));
            WEBGME_CONTROL.undo(temp);
        }
        
    }

    // Styles 
    const boardStyle = {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Make the board take the full height of the screen
    };
    
    const rowStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const centering = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <div style={boardStyle}>
            {win && <h1>You Win!</h1>}
            <p>Use any combination of numbers to reach the target:</p>
            <div style={centering}>
               
                <h1>{values["target"]}</h1>
            </div>
            <div style={rowStyle}>
                <Digit value={updatedValues["TL"]} name="TL" selected={selectedDigits['TL']} onDigitClick={handleDigitClick}/>
                <Digit value={updatedValues["TC"]} name="TC" selected={selectedDigits['TC']} onDigitClick={handleDigitClick}/>
                <Digit value={updatedValues["TR"]} name="TR" selected={selectedDigits['TR']} onDigitClick={handleDigitClick}/>
            </div>
            <div style={rowStyle}>
                <Digit value={updatedValues["BL"]} name="BL" selected={selectedDigits['BL']} onDigitClick={handleDigitClick}/>
                <Digit value={updatedValues["BC"]} name="BC" selected={selectedDigits['BC']} onDigitClick={handleDigitClick}/>
                <Digit value={updatedValues["BR"]} name="BR" selected={selectedDigits['BR']} onDigitClick={handleDigitClick}/>
            </div>
            <div style={rowStyle}>
                <Undo operation="↻" onClick={handleUndo}/>
                <Operation operation="+" isSelected={selectedOperation['+']} onOperationClick={handleOperation}/>
                <Operation operation="-" isSelected={selectedOperation['-']} onOperationClick={handleOperation}/>
                <Operation operation="x" isSelected={selectedOperation['x']} onOperationClick={handleOperation}/>
                <Operation operation="÷" isSelected={selectedOperation['÷']} onOperationClick={handleOperation}/>
            </div>
        </div>
            
            
    )
}