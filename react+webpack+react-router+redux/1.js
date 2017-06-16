function Welcome(props) {
  // 新增num 属性
  return <h1>
    {props.name}
    {props.num}</h1>
}

ReactDOM.render(
  <Welcome name="Jason" num={1}/>, //js表达式进行传值
    document.getElementById('root'));
