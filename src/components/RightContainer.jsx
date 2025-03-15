import '../styles/MediaQuery.css'
const cardsData = [
  { imgSrc: "PPT.webp", title: "Presentation Layer", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, impedit?" },
  { imgSrc: "Audio.webp", title: "Audio-Visuals Production", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, impedit?" },
  { imgSrc: "Translation.webp", title: "Language Translation", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, impedit?" },
  { imgSrc: "Graphic.webp", title: "Graphic Design", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, impedit?" },
  { imgSrc: "Research.webp", title: "Research & Analysis", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, impedit?" },
  { imgSrc: "Data.webp", title: "Data Processing", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, impedit?" },
];

const RightContainer = () => {
  return (
    <div className="right-container">
      {cardsData.map((card, index) => (
        <div className="card" key={index}>
          <div className="card-first-row">
            <div className="card-row-image">
              <img src={card.imgSrc} alt={card.title} />
            </div>
            <div className="card-row-title">{card.title}</div>
          </div>
          <div className="card-second-row">{card.desc}</div>
        </div>
      ))}
    </div>
  );
};

export default RightContainer;
