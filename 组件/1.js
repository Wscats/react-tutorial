//类式组件
class Wscats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    } // 给组件添加状态
  }
  render() {
    return (
      <div>
        <h1>
          {this.props.name}</h1>
        <h2>现在时间是：{this.state.date.toLocaleTimeString()}</h2>
      </div>
    )
  }
}
//组件的组合
function App() {
  return (
    <div>
      <Wscats name="Oaoafly"/>
      <Wscats name="Windiest"/>
    </div>
  );
}
ReactDOM.render(
  <App/>, //自闭合标签
    document.getElementById('root'));
