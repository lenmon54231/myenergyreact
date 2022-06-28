import { useEffect, useRef } from 'react';
import { canvasData, config } from './data';
import Polygon from './drawByCanvas';

const PolygonByCanvas = (props: any) => {
  console.log('props: ', props);
  const root = useRef(null);

  useEffect(() => {
    const drawPieChart = new Polygon({
      data: canvasData,
      width: 800,
      height: 250,
      root: root,
      setting: config,
      onEmit: (_data: any) => {},
    });
    drawPieChart.init();
  }, []);
  return (
    <div ref={root}>
      <canvas id="canvas"></canvas>
    </div>
  );
};
export default PolygonByCanvas;
