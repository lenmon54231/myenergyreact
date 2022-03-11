import { useState, useEffect } from 'react';
import { DualAxes, G2 } from '@ant-design/charts';

const G2DualAxes = () => {
  const [doubleData, setDoubleData] = useState([]);
  const [lineData, setLineData] = useState([]);
  let renderIndex = 1;
  const getDarkColorByName = {
    Jan: '#6970FF',
    Feb: '#6970FF',
    Mar: '#6970FF',
    Apr: '#6970FF',
    May: '#FF6600',
    Jun: '#FF6600',
    Jul: '#FF6600',
    Aug: '#00B4C3',
  };
  const getLightColorByName = {
    Jan: 'rgb(105,112,255,.1)',
    Feb: 'rgb(105,112,255,.1)',
    Mar: 'rgb(105,112,255,.1)',
    Apr: 'rgb(105,112,255,.1)',
    May: 'rgb(255,102,0,.1)',
    Jun: 'rgb(255,102,0,.1)',
    Jul: 'rgb(255,102,0,.1)',
    Aug: 'rgb(0,180,195,.1)',
  };
  const originData = [
    {
      name: '满分',
      color: 'Jan&满分',
      type: 'Jan',
      value: 38.9,
      coefficient: 0.8,
    },
    {
      name: '满分',
      color: 'Feb&满分',
      type: 'Feb',
      value: 28.8,
      coefficient: 0.2,
    },
    {
      name: '满分',
      color: 'Mar&满分',
      type: 'Mar',
      value: 39.3,
      coefficient: 0.4,
    },
    {
      name: '满分',
      color: 'Apr&满分',
      type: 'Apr',
      value: 100,
      coefficient: 1,
    },
    {
      name: '满分',
      color: 'May&满分',
      type: 'May',
      value: 30,
      coefficient: 0.8,
    },
    {
      name: '满分',
      color: 'Jun&满分',
      type: 'Jun',
      value: 60,
      coefficient: 0.8,
    },
    {
      name: '满分',
      color: 'Jul&满分',
      type: 'Jul',
      value: 34,
      coefficient: 0.8,
    },
    {
      name: '满分',
      color: 'Aug&满分',
      type: 'Aug',
      value: 35.6,
      coefficient: 0.4,
    },
    {
      name: '得分',
      color: 'Jan&得分',
      type: 'Jan',
      value: 12.4,
      coefficient: 0.8,
    },
    {
      name: '得分',
      color: 'Feb&得分',
      type: 'Feb',
      value: 23.2,
      coefficient: 0.8,
    },
    {
      name: '得分',
      color: 'Mar&得分',
      type: 'Mar',
      value: 34.5,
      coefficient: 0.8,
    },
    {
      name: '得分',
      color: 'Apr&得分',
      type: 'Apr',
      value: 12,
      coefficient: 0.8,
    },
    {
      name: '得分',
      color: 'May&得分',
      type: 'May',
      value: 15.6,
      coefficient: 0.8,
    },
    {
      name: '得分',
      color: 'Jun&得分',
      type: 'Jun',
      value: 25.5,
      coefficient: 0.8,
    },
    {
      name: '得分',
      color: 'Jul&得分',
      type: 'Jul',
      value: 17.4,
      coefficient: 0.8,
    },
    {
      name: '得分',
      color: 'Aug&得分',
      type: 'Aug',
      value: 22.4,
      coefficient: 0.8,
    },
  ];
  G2.registerShape('line', 'custom-shape', {
    draw(cfg, group) {
      console.log(cfg, group, '133333333333');
      const cx = cfg.x;
      const cy = cfg.y;
      const polygon = group.addShape('circle', {
        attrs: {
          x: cx,
          y: cy,
          ...cfg.defaultStyle,
          ...cfg.style,
          r: 5,
        },
      });
      return polygon;
    },
  });

  G2.registerShape('interval', 'fall-flag', {
    draw(cfg, container) {
      console.log('cfg: ', cfg);
      const group = container.addGroup();
      let type = cfg?.data?.type;
      let currentColor = getDarkColorByName[type];
      let maxHeight =
        (Number(cfg?.y) - 35) / (1 - Number(cfg?.points[1].y)) + 35;
      let coordinateHeight = maxHeight - 35;
      let height =
        Number(cfg?.y) +
        coordinateHeight *
          Number(cfg?.points[1].y) *
          (1 - Number(cfg.data.coefficient));
      if (cfg?.points[1].y == 1) {
        height = Number(cfg?.y);
      }
      console.log('maxHeight: ', maxHeight);

      group.addShape('path', {
        attrs: {
          // ...cfg,
          path: [
            // ['M', (cfg?.x as number) - 40, cfg?.y as number],
            // ['L', (cfg?.x as number) + 40, cfg?.y as number],
            ['M', cfg?.x - 30, height],
            ['L', cfg?.x + 30, height],
          ],
          stroke: renderIndex.value < 9 ? currentColor : 'transparent',
          lineDash: [4, 2],
          lineWidth: 2,
        },
      });
      console.log('group: ', group);
      renderIndex++;
      return group;
    },
  });

  useEffect(() => {
    setDoubleData(originData);
    let lineData = [];
    let typeList = [];
    originData.forEach((e) => {
      if (
        typeList.findIndex((j) => {
          return j == e.type;
        }) == -1
      ) {
        typeList.push(e.type);
        lineData.push({ type: e.type, value: e.value });
      }
    });
    setLineData(lineData);
  }, []);

  const config = {
    width: 1000,
    height: 280,
    autoFit: false,
    padding: 35,
    data: [doubleData, lineData],
    xField: 'type',
    yField: ['value', 'value'],
    // shape: 'fall-flag',
    // shape: 'custom-shape',
    // shape: ['custom-shape', 'custom-shape'],
    marginRatio: 0.1,
    // colorField: 'color', // 部分图表使用 seriesField
    // color: ({ color }) => {
    //   console.log(color, 'value111');
    //   // let arr = value.split('&');
    //   // if (arr[1] == '满分') {
    //   //   return getDarkColorByName[arr[0]];
    //   // } else {
    //   //   return getLightColorByName[arr[0]];
    //   // }
    // },
    geometryOptions: [
      {
        geometry: 'column',
        isGroup: true,
        seriesField: 'name',
        shape: 'fall-flag',
        // shape: ['fall-flag', 'custom-shape'],
        // shape: 'custom-shape',
        // columnWidthRatio: 0.4,
        label: {},
        color: ['#5B8FF9', '#5D7092'],
        columnStyle: {
          radius: [20, 20, 0, 0],
        },
      },
      {
        geometry: 'line',
        color: '#5AD8A6',
        // shape: 'fall-flag',
        // shape: 'custom-shape',
      },
    ],
  };
  return (
    <DualAxes
      {...config}
      onReady={(plot) => {
        plot.on('element:click', (evt) => {
          const { x, y } = evt;
          const { xField } = plot.options;
          const tooltipData = plot.chart.getTooltipItems({ x, y });
          console.log(tooltipData);
        });
      }}
    />
  );
};

export default G2DualAxes;
