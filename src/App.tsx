import React, { CSSProperties, useState } from 'react';
import FlareComponent from 'flare-react';
import cactus from './Choup.flr';

const size = 200

function App() {

  const [grabbed, setGrabbed] = useState(false)
  const [XY, setXY] = useState({ x: window.innerWidth/2 - size/2, y: window.innerHeight/3 - size/2 })

  const mouseMoved = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (grabbed) {
      setXY({ x: e.clientX - size / 2, y: e.clientY - size / 2 })
    }
  }

  const bim: CSSProperties = {
    position: "absolute",
    left: XY.x,
    top: XY.y,
    width: size,
    height: size
  }

  return (
    <div style={center} onMouseMove={(e) => mouseMoved(e)}>
      <div style={text}>Click and drop me !</div>
      <div style={bim} onClick={() => setGrabbed(!grabbed)}>
        <FlareComponent width={200} height={200} transparent={true} animationName={grabbed ? "Grabbed" : "Flying"} file={cactus} />
      </div>
    </div>
  );

}

const text: CSSProperties = {
  fontSize: "50px"
}

const center: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100vh",
  backgroundColor: "lightgrey",
}

export default App;
