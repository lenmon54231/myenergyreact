import { Chart, registerShape } from '@antv/g2';
import { useEffect } from 'react';

const DoubleHistogram = () => {
  useEffect(() => {
    let paddingOption = [35, 35, 55, 35];
    let chart = null;

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

    const initChart = () => {
      let checkIndex = 1;
      // 实例化对象
      chart = new Chart({
        container: 'DoubleHistogramContainer',
        // autoFit: true,
        width: 600,
        height: 280,
        padding: paddingOption,
      });

      // 加载数据
      // chart.data(data);
      chart.data([
        { color: 'Jan&满分', type: 'Jan', value: 38.9, coefficient: 0.8 },
        { color: 'Feb&满分', type: 'Feb', value: 28.8, coefficient: 0.2 },
        { color: 'Mar&满分', type: 'Mar', value: 39.3, coefficient: 0.4 },
        { color: 'Apr&满分', type: 'Apr', value: 100, coefficient: 1 },
        { color: 'May&满分', type: 'May', value: 30, coefficient: 0.8 },
        { color: 'Jun&满分', type: 'Jun', value: 60, coefficient: 0.8 },
        { color: 'Jul&满分', type: 'Jul', value: 34, coefficient: 0.8 },
        { color: 'Aug&满分', type: 'Aug', value: 35.6, coefficient: 0.4 },
        { color: 'Jan&得分', type: 'Jan', value: 12.4, coefficient: 0.8 },
        { color: 'Feb&得分', type: 'Feb', value: 23.2, coefficient: 0.8 },
        { color: 'Mar&得分', type: 'Mar', value: 34.5, coefficient: 0.8 },
        { color: 'Apr&得分', type: 'Apr', value: 12, coefficient: 0.8 },
        { color: 'May&得分', type: 'May', value: 15.6, coefficient: 0.8 },
        { color: 'Jun&得分', type: 'Jun', value: 25.5, coefficient: 0.8 },
        { color: 'Jul&得分', type: 'Jul', value: 17.4, coefficient: 0.8 },
        { color: 'Aug&得分', type: 'Aug', value: 22.4, coefficient: 0.8 },
      ]);

      registerShape('interval', 'fall-flag', {
        draw(cfg, container) {
          // console.log('cfg: ', cfg);
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
          group.addShape('path', {
            attrs: {
              // ...cfg,
              path: [
                // ['M', (cfg?.x as number) - 40, cfg?.y as number],
                // ['L', (cfg?.x as number) + 40, cfg?.y as number],
                ['M', cfg?.x - 30, height],
                ['L', cfg?.x + 30, height],
              ],
              stroke: checkIndex < 9 ? currentColor : 'transparent',
              // stroke: currentColor,
              lineDash: [4, 2],
              lineWidth: 2,
            },
          });
          // console.log('group: ', group);
          checkIndex++;
          return group;
        },
      });

      // 度量（就是点击图片上面会浮现一些内容：内容就通过下面的配置项配置）
      chart.scale('value', {
        min: 0,
        alias: '数值',
        //该数据字段的显示别名，一般用于将字段的英文名称转换成中文名。
      });
      chart.legend(false);
      // chart.legend('type', {
      //   position: 'right',
      // });
      // 配置 type 对应坐标轴线
      chart.axis('type', {
        tickLine: {
          // 是否同刻度线对齐，如果值为 false，则会显示在两个刻度中间。
          alignTick: true,
        },
        label: { autoEllipsis: false, offset: 12, autoHide: false }, //横坐标上的文字
        // title: { spacing: 2 }, // 横着的坐标轴下面的文字（即type）
      });
      // 配置 value 对应坐标轴线
      chart.axis('value', {
        label: {
          offset: 12,
        },
        // title: {}, // 竖着的坐标轴下面的文字（即"数值"）
        tickLine: {
          // 是否同刻度线对齐，如果值为 false，则会显示在两个刻度中间。
          alignTick: true,
        },
      });
      chart.tooltip({
        showContent: false, // 关闭 tooltip content部分dom
      });
      chart
        .interval() // 画出柱状图
        .position('type*value') // 柱状图定位
        .color('color', (value) => {
          let arr = value.split('&');
          if (arr[1] == '满分') {
            return getDarkColorByName[arr[0]];
          } else {
            return getLightColorByName[arr[0]];
          }
        }) //通过color区分颜色
        .label('value') // 柱子顶上的文字
        .size('20')
        .adjust([
          {
            type: 'dodge',
            marginRatio: 0,
          },
        ]);

      chart.interval().position('type*value').shape('fall-flag');

      // 开始渲染
      chart.render();
    };

    initChart();
  }, []);

  return <div id="DoubleHistogramContainer"></div>;
};

export default DoubleHistogram;
