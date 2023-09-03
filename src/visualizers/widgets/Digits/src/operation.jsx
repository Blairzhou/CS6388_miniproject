import React ,{ useState } from 'react';

export default function Operation({ operation, isSelected, onOperationClick}) {

    //const [selected, setSelected] = useState(false);

    const buttonStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: isSelected ? 'green' : 'black',
        color: 'white',
        fontSize: '30px',
        margin: '10px'
    }

    const handleOperationClick = () => {
        /*
        if (onClick) {
          onClick(operation); // Pass the operation type back to the parent component
        }*/
        //setSelected(!selected);
        onOperationClick(operation)
    };


    return (
        <button style={buttonStyle} onClick={handleOperationClick} >
            {operation}
        </button>
    )
}
