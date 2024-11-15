import './App.css'
import Landing from './Landing/Landing';
import BarGraph from './BarGraph/BarGraph';
import LineGraph from './LineGraph/LineGraph';
import PieChart from './PieChart/pie';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
 
  return(
    <>
     <BrowserRouter>
    <Routes>
      <Route path="" element={<Landing />} />
      <Route path="/" element={<Landing />} />
      <Route path="/bar" element={<BarGraph />} />
      <Route path="/line" element={<LineGraph />} />
      <Route path="/pie" element={<PieChart />} />     
    </Routes>
  </BrowserRouter>
    
    </>
  );

}
export default App;