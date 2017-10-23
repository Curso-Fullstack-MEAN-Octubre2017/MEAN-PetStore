var HelloClass = React.createClass({
  render: function() {
    return React.DOM.div({}, 'Hello ' + this.props.name);
  }
});
var Hello = React.createFactory(HelloClass);
