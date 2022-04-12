import { useEffect, useRef } from 'react';
import { canvasData, config } from './data';
import DoubleBarChart from './drawByCanvas';

const DoubleHistogramByCanvas = (props) => {
  console.log('props: ', props);
  const root = useRef(null);

  useEffect(() => {
    const drawPieChart = new DoubleBarChart({
      data: canvasData,
      width: 800,
      height: 250,
      root: root,
      setting: config,
      onEmit: (data: any) => emit('onSelect', data),
    });
    drawPieChart.init();
  }, []);
  return (
    <div ref={root}>
      <canvas id="canvas"></canvas>
    </div>
  );
};
export default DoubleHistogramByCanvas;
