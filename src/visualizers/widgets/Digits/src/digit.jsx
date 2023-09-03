import React ,{ useState } from 'react';

// May need the value from the Webgme
export default function Digit({value, name, selected, onDigitClick}) {

    //const [selected, setSelected] = useState(false);

    const circleStyle = {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: selected ? 'green' : 'white', // Change background color to green when selected
        border: selected ? 'none' : '2px solid black', // No border when selected
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '36px',
        fontWeight: 'bold',
        color: selected ? 'white' : 'black', // Change text color to white when selected
        margin: '10px'
      };

    const handleSelect = () => {
        //setSelected(!selected);
        onDigitClick(name, value);
    };

    return (
        <div style={circleStyle} onClick={handleSelect} name={name}>
            {value}
        </div>
    )
}