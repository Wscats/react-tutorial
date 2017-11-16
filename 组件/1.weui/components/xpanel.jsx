let Xpanel = React.createClass({
  getInitialState() {
    return {
      arr: [
        "a", "b", "c"
      ],
      news: null
    }
  },
  getNews() {
    let xmlhttp = new XMLHttpRequest();
    let self = this;
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        console.log(JSON.parse(xmlhttp.responseText));
        setTimeout(() => {
          self.setState({
            news: JSON.parse(xmlhttp.responseText)
          })
        }, 2000)
      }
    }
    xmlhttp.open("GET", "https://wscats.github.io/react-tutorial/%E7%BB%84%E4%BB%B6/1.weui/qqnews.json", true);
    xmlhttp.send();
  },
  render() {
    return (
      <div className="weui-panel weui-panel_access">
        <div className="weui-panel__hd">图文组合列表</div>
        <div className="weui-panel__bd">
          {(function(self) {
            let html;
            if (self.state.news) {
              html = self.state.news.newslist.map((item) => {
                console.log(item);
                return (
                  <a key={item.id} href="javascript:void(0);" className="weui-media-box weui-media-box_appmsg">
                    <div className="weui-media-box__hd">
                      <img className="weui-media-box__thumb" src={item.bigImage[0]} alt=""/>
                    </div>
                    <div className="weui-media-box__bd">
                      <h4 className="weui-media-box__title">{item.source}</h4>
                      <p className="weui-media-box__desc">{item.title}</p>
                    </div>
                  </a>
                )
              })
            } else {
              return (
              	<div className="weui-loadmore">
			            <i className="weui-loading"></i>
			            <span className="weui-loadmore__tips">正在加载</span>
        				</div>
              )
            }
            return html
          })(this)
}
        </div>
        {/*<div className="weui-panel__ft">
          <a href="javascript:void(0);" className="weui-cell weui-cell_access weui-cell_link">
            <div className="weui-cell__bd">查看更多</div>
            <span className="weui-cell__ft"></span>
          </a>
        </div>*/}
      </div>
    )
  },
  componentDidMount() {
    this.getNews()
  }
})
