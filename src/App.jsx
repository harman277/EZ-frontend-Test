import './styles/App.css';
import LeftSideContainer from './components/LeftSideContainer';
import RightContainer from './components/RightContainer';
import './styles/MediaQuery.css'
import './styles/GetInTouchWithUS.css'
import './styles/RightContainer.css'

const App = () => {
  return (
    <>
    <div className="container">
      <LeftSideContainer/>
      <RightContainer/>
    </div>
     </>
  );
};

export default App;
