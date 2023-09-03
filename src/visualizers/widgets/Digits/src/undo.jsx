import React from 'react';

export default function Undo({ operation, onClick}) {
    const buttonStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'green',
        color: 'white',
        fontSize: '30px',
        margin: '10px'
    }

    const handleOperationClick = () => {
        if (onClick) {
          onClick(operation); // Pass the operation type back to the parent component
        }
    };

    return (
        <button style={buttonStyle} onClick={handleOperationClick}>
            {operation}
        </button>
    )
}