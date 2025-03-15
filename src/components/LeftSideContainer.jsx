import '../styles/App.css';
import GetInTouchWithUS from '../components/GetInTouchWithUS';
import '../styles/GetInTouchWithUS.css'
import '../styles/MediaQuery.css'
const LeftSideContainer = () => {
  return (
    <>
    <div className="left">
      <div className="logo-image">
        <img src="ez_works.webp" alt="EZ Works Logo" />
      </div>
      <h2>Suite Of Business Support Services</h2>
      <p>
       Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error sit veniam iusto. Ipsa inventore mollitia provident libero sequi assumenda laudantium totam? Nulla ducimus illo quis doloremque, reiciendis voluptates itaque ea commodi quos quaerat ipsum eum.
      </p>
      <GetInTouchWithUS/>
    </div>

      </>

  );
};

export default LeftSideContainer;
