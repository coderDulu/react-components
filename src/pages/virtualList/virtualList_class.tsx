import React, { ReactElement } from "react";
// import "./styles.css";

const rowRenderer = ({ index, style }) => {
  // const item = this.state.list[index];
  const item = index;
  return (
    <li
      key={item}
      style={style}
      onClick={() => {
        console.log("item-", index);
      }}
    >
      item-{item}
    </li>
  );
};

export default class App extends React.Component {
  state = { scrollTop: 0 };
  height = 800;
  total = 100;
  rowHeight = 80;
  bufferSize = 3;

  limit = Math.ceil(this.height / this.rowHeight);
  originStartIdx = 0;
  startIndex = Math.max(this.originStartIdx - this.bufferSize, 0);
  endIndex = Math.min(
    this.originStartIdx + this.limit + this.bufferSize,
    this.total - 1
  );

  scrollingContainer = React.createRef<HTMLDivElement>();

  onScroll = (e) => {
    if (e.target === this.scrollingContainer.current) {
      const { scrollTop } = e.target;
      const { total, rowHeight, limit, originStartIdx, bufferSize } = this;
      const currIndex = Math.floor(scrollTop / rowHeight);

      if (originStartIdx !== currIndex) {
        this.originStartIdx = currIndex;
        this.startIndex = Math.max(currIndex - bufferSize, 0);
        this.endIndex = Math.min(currIndex + limit + bufferSize, total - 1);
        this.setState({ scrollTop: scrollTop });
      }
    }
  };

  renderDisplayContent = () => {
    const { rowHeight } = this;

    const content: ReactElement[] = [];
    for (let i = this.startIndex; i <= this.endIndex; ++i) {
      content.push(
        rowRenderer({
          index: i,
          style: {
            height: rowHeight - 1 + "px",
            lineHeight: rowHeight + "px",
            left: 0,
            right: 0,
            position: "absolute",
            top: i * rowHeight,
            borderBottom: "1px solid #000",
            width: "100%",
            backgroundColor: "#ff0"
          }
        })
      );
    }
    return content;
  };

  render() {
    const { height, total, rowHeight } = this;
    return (
      <div
        ref={this.scrollingContainer}
        style={{
          overflowX: "hidden",
          overflowY: "auto",
          height: height,
          backgroundColor: "#e8e8e8"
        }}
        onScroll={this.onScroll}
      >
        <div style={{ height: total * rowHeight, position: "relative" }}>
          {this.renderDisplayContent()}
        </div>
      </div>
    );
  }
}
