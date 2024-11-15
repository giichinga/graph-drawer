import './BarGraph.css'
import { useState } from 'react';

function BarGraph () {

    const [inputNumber, setInputNumber] = useState('');
    const [inputs, setInputs] = useState([]);
    const [graphParameters, setGraphParameters] = useState({title: '', xAxis: '', yAxis: ''});

    const createTable = (e) => {
        e.preventDefault();
        
        const numInputs = parseInt(inputNumber, 10);
        if (numInputs < 1) {
            alert('Please enter a number greater than 0');
            return;
        }
        //Creating an empty array 
        const newInputs = Array.from({length: numInputs}, () => ({name: '', value: ''}));
        setInputs(newInputs);

        document.querySelector('.tableCreator').style.display = 'none';
    }

      //Writing the name of input to the created array
      const handleNameChange = (index, name) => {
        const newInputs = [...inputs];
        newInputs[index].name = name;
        setInputs(newInputs);
    }

        //Writing the value of input to the created array
    const handleValueChange  = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index].value = value;
        setInputs(newInputs);
    }
        
    //Submitting the values of the inputs to the console and writing to the storage
    const submitValues = (e) => {
         e.preventDefault();
         console.log(inputs);
         localStorage.clear();
         localStorage.setItem('inputs', JSON.stringify(inputs));
         document.querySelector('modal').style.display = 'flex';
   }


   const drawGraph = () => {
        setGraphParameters(graphParameters);
        document.querySelector('.modal').style.display = 'none';

        const inputs = JSON.parse(localStorage.getItem('inputs'));

        //Creating the graph
        const graph = document.querySelector('.barGraph');
        graph.innerHTML = '';

        //Graph title
        const graphTitle = document.createElement('h2');
        graphTitle.textContent = graphParameters.title;
        graph.appendChild(graphTitle);


        //Creating the canvas for the graph
        const graphCanvas = document.createElement('canvas');
        graphCanvas.width = 600;
        graphCanvas.height = 600;
        graph.appendChild(graphCanvas);

        //Getting the 2d context for drawing
        const ctx = graphCanvas.getContext('2d');

        //Constants for drawing
        const barWidth = 50;
        const spacing = 20;
        const graphHeight = 500;

        //Determining max values for the inputs
        const maxValue  = Math.max(...inputs.map(input => input.value));
        const multiplier = graphHeight / maxValue;

        ctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);

        drawAxes(ctx);

        drawBars(ctx, inputs, barWidth, spacing, multiplier);
   }

    const drawAxes = (ctx) => {
      const xAxisLabel = graphParameters.xAxis;
      const yAxisLabel = graphParameters.yAxis;

      //x-axis
      ctx.fillStyle = 'black';
      ctx.font = 'inherit';
      ctx.fillText(xAxisLabel, 300, 550);

      //y-axis
      ctx.save();
      ctx.translate(50, 350)
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(yAxisLabel, 0, 0);
      ctx.restore();
    }

    const drawBars = (ctx, inputs, barWidth, spacing, multiplier) => {
      inputs.forEach((input, index) => {

        // Draw bar
        ctx.fillStyle = 'green';
        const barHeight = input.value * multiplier;
        ctx.fillRect(50 + (barWidth + spacing) * index, 350 - barHeight, barWidth, barHeight);

        //label for each bar
        ctx.fillStyle = 'black';
        ctx.font = 'inherit'; 
        ctx.fillText(input.name, 50 + (barWidth + spacing) * index, 370);
    });

    }


   return(
    
    <div className='barGraphContainer'>
        <h3>Let us set up some parameters for your graph:</h3>
        <div className='barGraphForm'>
            

            {/*User input to create the table for inputs*/}
            <form onSubmit={createTable} className='tableCreator' >
                <p> (1/3) How many inputs does your graph have?</p> 
                <div>
                <input placeholder='e.g 12 for months in a year' type='number' value={inputNumber}  onChange={(e) => setInputNumber(e.target.value)} /> 
                <button type='submit' >Submit</button>
                </div>
            </form>

            {/*User input to be used in the graph*/}
            {inputs.length > 0 && (
           <form className='inputTable' >
            <p>(2/3) Input the names and values to be displayed</p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {inputs.map((input, index) => (
               
                <tr key={index}>
                  <td>
                    <input
                      type='text'
                      value={input.name}
                        onChange={(e) => handleNameChange(index, e.target.value)} // Update name of specific row
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      value={input.value}
                      onChange={(e) => handleValueChange(index, e.target.value)} // Update value of specific row
                    />
                  </td>
                </tr>
               
              ))}
            </tbody>
          </table>
        <button onClick={submitValues}>Generate graph</button>
           </form>
           )}
           <div className='modal'>
              <p>(3/3) Finally let us edit the graph title and axis names</p>
              <div className='inputs'>
                <input placeholder='Graph Title' value={graphParameters.title} />
                <input placeholder='X-axis name' value={graphParameters.xAxis} />
                <input placeholder='Y-axis name' value={graphParameters.yAxis} />
                <button onClick={drawGraph} >View Graph</button>
              </div> 
           </div>

           {/*Graph to be displayed*/}
          <div className='barGraph'>
           
        </div>
    </div>
</div>

   );
}

export default BarGraph;