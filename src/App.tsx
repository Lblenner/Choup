import React, { CSSProperties, useState } from 'react';
import FlareComponent from 'flare-react';
import choup from './Choup.flr';
import choupi from './Choupi.flr';
import Draggable from './Draggable';

const size = 200

function App() {

  const [chou] = useState(Math.random() >= 0.5)
  const [grabbed, setGrabbed] = useState(false)

  const handleDrag = () => {
    setGrabbed(true)
  }

  const handleDragEnd = () => {
    setGrabbed(false)
  }

  return (
    <div style={center}>
      <div style={{ height: 300 }} />
      <div style={text}>Click and drop me !</div>
      <Draggable id={1}
        onDrag={() => null}
        onDragbegin={handleDrag}
        onDragEnd={handleDragEnd}>
        <FlareComponent width={200} height={200} transparent={true} animationName={grabbed ? "Grabbed" : "Flying"} file={chou ? choup : choupi} />
      </Draggable>

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
  flexDirection: "column"
}

export default App;
