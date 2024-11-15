import barIcon from '../assets/bar-graph.png';
import lineIcon from '../assets/line-graph.png';
import pieIcon from '../assets/pie-graph.png';
import './Landing.css';

function Landing() {
    return(
        <>
        <div className="landingContainer">
            <h1></h1>
            <div className="graphSelector">
                <h2>What kind of graph do you want to draw?</h2>
                <div className="graphOptions">
                    <a href="/bar"><div className="optionContainer"> <img src={barIcon} /> <p>Bar Graph</p></div></a>
                    <a href="/line"><div className="optionContainer">  <img src={lineIcon} /> <p>Line Graph</p></div></a>
                    <a href="/pie"><div className="optionContainer"> <img src={pieIcon} /> <p>Pie Graph</p></div></a>
                </div>
            </div>
        </div>
        </>

    );
}

export default Landing;