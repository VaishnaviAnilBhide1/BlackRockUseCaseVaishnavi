import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';

function replaceInfinity(inputString) {
  // Replace 'Infinity' with 'Infinity'
  let result = inputString.replace(/-Infinity/g, '"-Infinity"');
  let replacedString = result.replace(/(?<!-)(Infinity)/g, '"$1"');
  return replacedString;
}

function StripedRowExample() {
  const { data } = useSelector((state) => state.variables);

  let res;
  if (data.length > 20) {
    let modif = replaceInfinity(data);
    res = JSON.parse(modif);
  } else {
    res = data;
  }

  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    // Display first 20 values initially
    setCurrentData(Object.entries(res).slice(0, 20));
  }, [res]);


  return (
    <Card style={{ backgroundColor: "#f8f9fa", borderRadius: "15px" }}>
      {currentData.length >0 ?
      <p>
            <Card.Header style={{ backgroundColor: "#dcdcdc", borderRadius: "15px 15px 0 0" }}>
            <h2 style={{ margin: "0" }}>Results</h2>
          </Card.Header>
     <Card.Body style={{ maxHeight: '420px', overflowY: 'auto' }}>
       <Table bordered hover striped>
         <thead style={{ backgroundColor: '#FFFFFF', color: 'white', position: 'sticky', top: 0, zIndex: 1 }}>
           <tr className="table-dark">
             <th>N</th>
             <th>x</th>
             <th>y</th>
             <th>z</th>
           </tr>
         </thead>
         <tbody>
           {currentData.map(([key, values]) => (
             <tr key={key}>
               <td>{key}</td>
               {values.map((value, index) => (
                 <td key={index}>{value}</td>
               ))}
             </tr>
           ))}
         </tbody>
       </Table>
     </Card.Body>
     </p>
      :       
      <Card.Header style={{ backgroundColor: "#dcdcdc", borderRadius: "15px 15px 0 0" }}>
      <h2 style={{ margin: "0" }}>Results</h2>
    </Card.Header>}
    </Card>
  );
}

export default StripedRowExample;
