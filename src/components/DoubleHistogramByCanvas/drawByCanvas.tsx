type dataObject = {
  id: number;
  title: string;
  color: string;
  total: number;
  pass: number;
  passColor: string;
  score: number;
  scoreColor: string;
  source: string;
};

export default class DoubleBarChart {
  private width = 0;
  private height = 0;
  private data = [];
  private setting = {};
  private onEmit = () => {};
  private root: HTMLElement | null = null;
  private stage: any = null;

  private padding = [20, 20, 20, 40]; //幕布的边距（canvas的距离是从左上角开始）
  private paddingLeft = 0; // 双柱状图左侧距离起始坐标的距离
  private paddingRight = 0; // 双柱状图右侧距离起始坐标的距离
  private paddingTop = 0; // 双柱状图顶侧距离起始坐标的距离
  private paddingBottom = 0; // 双柱状图底侧距离起始坐标的距离
  private maxTotal = 0; // 整个data中最大的值，用来计算每个柱形的相对高度
  private totalHeight = 0; //坐标系（双柱状图）的高度
  private itemPadding = 20; // 每个柱形之间的间隔

  constructor(options: {
    data: any;
    width: any;
    height: any;
    root: any;
    setting: any;
    onEmit: any;
  }) {
    const { data, width, height, root, setting, onEmit } = options;
    this.root = root; // w: canvas 父级元素
    this.width = width;
    this.height = height;
    this.totalHeight = this.height - this.padding[0] - this.padding[2];
    this.paddingLeft = Number(this.padding[3]);
    this.paddingRight = Number(this.width - this.padding[1]);
    this.paddingTop = Number(this.padding[0]);
    this.paddingBottom = Number(this.height - this.padding[2]);
    this.data = data;
    this.setting = setting;
    this.onEmit = onEmit;
    this.stage = (window as any)?.omg({
      element: document.getElementById('canvas'),
      width: this.width,
      height: this.height,
      enableGlobalTranslate: false, // 关闭全局平移(可以用鼠标拖动canvas)
      enableGlobalScale: false, // 关闭全局缩放
    });
    if (this.stage) {
      this.stage.init(); // 初始化调用omg的方法
    }
  }
  init() {
    this.drawBase();
    this.stage?.show();
  }
  drawBase() {
    if (this.data.length === 0) {
      return;
    } else {
      this.bc();
      const bigOne: dataObject = this.data.sort(
        (a: dataObject, b: dataObject) => b.total - a.total,
      )[0];
      this.maxTotal = bigOne?.total;
      this.drawTick(); // 画刻度线
      this.data.forEach((item, index) => {
        this.drawTotalRectangle(item, index); // 画总分柱形
        this.drawCurrentRectangle(item, index); // 画当前分柱形
        this.drawPassLine(item, index); // 画通过率折线
        this.drawTitle(item, index); // 画标题
      });
    }
  }
  reset() {
    const canvas = this.root?.querySelector('#canvas');
    if (canvas) {
      const _canvas = document.createElement('canvas');
      _canvas.id = 'canvas';
      this.root?.removeChild(canvas);
      this.root?.appendChild(_canvas);
    }
  }
  // 画当前矩形背景图
  bc() {
    // 画背景
    const rect = this.stage.graphs.rectangle({
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
      radius: {
        tl: 6, // 左上
        tr: 6, // 右上
        bl: 6, // 左下
        br: 6, // 右下
      },
      color: '#fff',
    });
    this.stage.addChild(rect);
  }
  // 画刻度线
  drawTick() {
    // 画一条直线，包含横轴和纵轴
    const polyline = this.stage.graphs.line({
      matrix: [
        [this.paddingLeft, this.paddingTop],
        [this.paddingLeft, this.paddingBottom],
        [this.paddingRight, this.paddingBottom],
      ],
    });
    // 画十个纵轴刻度
    for (let index = 0; index < 10; index++) {
      const x = this.paddingLeft;
      const y =
        this.paddingTop +
        ((this.height - this.padding[0] - this.padding[2]) / 10) * index;
      const YNumber = Math.round(
        Number(this.maxTotal - (Number(this.maxTotal) / 10) * index),
      );
      const YTick = this.stage.graphs.line({
        matrix: [
          [x, y],
          [x + 4, y],
        ],
      });
      const YTickText = this.stage.graphs.text({
        text: YNumber,
        x: x - 15,
        y: y - 5,
        width: 40,
        height: 40,
        color: '#000',
        fontSize: 8,
      });
      this.stage.addChild(YTickText);
      this.stage.addChild(YTick);
    }
    this.stage.addChild(polyline);
  }
  // 画总分
  drawTotalRectangle(item: dataObject, index: number) {
    const x = this.paddingLeft + index * 40 + this.itemPadding; // 矩形的起始X坐标
    const height = this.totalHeight * (item.total / this.maxTotal); // 矩形的高度
    const y = this.paddingTop + this.totalHeight - height; // 矩形的起始Y坐标
    const rect = this.stage.graphs.rectangle({
      x: x,
      y: y,
      width: 10,
      height: height,
      // height: 0,
      radius: {
        tl: 2, // 左上
        tr: 2, // 右上
        bl: 0, // 左下
        br: 0, // 右下
      },
      color: item.scoreColor,
    });
    this.stage.addChild(rect);
    this.addAnimation(x, this.paddingTop, this.totalHeight - height);
  }
  // 画当前分
  drawCurrentRectangle(item: dataObject, index: number) {
    const x = this.paddingLeft + 10 + index * 40 + this.itemPadding;
    const height =
      this.totalHeight *
      (item.total / this.maxTotal) *
      (item.score / item.total);
    const y = this.paddingTop + this.totalHeight - height;
    const rect = this.stage.graphs.rectangle({
      x: x,
      y: y,
      width: 10,
      height: height,
      radius: {
        tl: 2, // 左上
        tr: 2, // 右上
        bl: 0, // 左下
        br: 0, // 右下
      },
      color: item.color,
    });

    this.stage.addChild(rect);
    this.addAnimation(x, this.paddingTop, this.totalHeight - height);
  }
  // 画通过率线
  drawPassLine(item: dataObject, index: number) {
    const leftX = this.paddingLeft - 5 + index * 40 + this.itemPadding;
    const Y =
      this.paddingTop +
      this.totalHeight *
        (1 - (item.total / this.maxTotal) * (item.pass / item.total));
    const rightX = this.paddingLeft + 25 + index * 40 + this.itemPadding;
    const polyline = this.stage.graphs.line({
      matrix: [
        [leftX - 20, Y],
        [rightX - 20, Y],
        // [rightX, Y],
        // [0, Y],
      ],
      color: item.passColor,
      lineWidth: 4,
      dash: [4],
    });

    polyline.animateTo({
      moveX: 20,
    });
    this.stage.addChild(polyline);
  }
  // 画标题
  drawTitle(item: dataObject, index: number) {
    const x = this.paddingLeft + index * 40 + this.itemPadding - 25;
    const y = this.paddingTop + this.totalHeight + 5;
    const text = this.stage.graphs.text({
      text: item.title,
      x: x,
      y: y,
      width: 40,
      color: '#000',
      fontSize: 8,
    });
    this.stage.addChild(text);
  }
  // 添加白色柱状图，以实现动画
  addAnimation(x: number, y: number, height: number) {
    const whiteRect = this.stage.graphs.rectangle({
      x: x,
      y: this.paddingTop,
      width: 10,
      height: this.totalHeight,
      radius: {
        tl: 2, // 左上
        tr: 2, // 右上
        bl: 0, // 左下
        br: 0, // 右下
      },
      color: '#fff',
    });
    whiteRect.animateTo({
      y: y,
      height: height,
    });
    this.stage.addChild(whiteRect);
  }
}
