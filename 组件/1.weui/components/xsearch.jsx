let Xsearch = React.createClass({
  getInitialState() {
    return {bool: false, searchText: ""}
  },
  focusing() {
    this.setState({bool: true})
    console.log(this.refs.input)
    this.refs.input.focus()
  },
  cancelFocusing() {
    this.setState({bool: false})
  },
  getSearchText(e) {
    this.setState({searchText: e.target.value})
  },
  searchClear() {
    this.setState({searchText: ""})
    this.refs.input.focus()
  },
  render() {
    return (
      <div className={(function(self) {
        if (self.state.bool) {
          return "weui-search-bar weui-search-bar_focusing"
        } else {
          return "weui-search-bar"
        }
      })(this)} id="searchBar">
        <form className="weui-search-bar__form">
          <div className="weui-search-bar__box">
            <i className="weui-icon-search"></i>
            <input value={this.state.searchText} onChange={this.getSearchText} ref="input" type="search" className="weui-search-bar__input" id="searchInput" placeholder="搜索" required=""/>
            <a onClick={this.searchClear} href="javascript:" className="weui-icon-clear" id="searchClear"></a>
          </div>
          <label onClick={this.focusing} className="weui-search-bar__label" id="searchText">
            <i className="weui-icon-search"></i>
            <span>搜索</span>
          </label>
        </form>
        <a href="javascript:" onClick={this.cancelFocusing} className="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
      </div>
    )
  }
})
