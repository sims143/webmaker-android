var React = require('react/addons');
var classNames = require('classnames');
var Binding = require('../../lib/binding.jsx');
var ColorGroup = require('../../components/color-group/color-group.jsx');
var Range = require('../../components/range/range.jsx');
var Alert = require('../../components/alert/alert.jsx');
var ImageBlock = require('../../blocks/image.jsx');
var defaults = require('lodash.defaults');

var ImageEditor = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    // Expose image handler to Android
    window.imageReady = this.imageReady;

    // Bind props
    var props = this.props.element || {};
    props.showMenu = false;
    return defaults(props, ImageBlock.defaults);
  },
  componentDidUpdate: function () {
    this.props.save(this.state);
  },
  render: function () {
    var imageProps = {
      src: this.state.src,
      alt: '',
      opacity: this.state.opacity,
      borderStyle: 'solid',
      borderWidth: this.state.borderWidth,
      borderColor: this.state.borderColor
    };

    return (
      <div id="editor">
        <div className="editor-preview">
          <ImageBlock {...imageProps} />
        </div>
        <div className="editor-options">
          <div className="form-group">
            <button onClick={this.toggleMenu} className="btn btn-block">
              <img className="icon" src="../../img/change-image.svg" /> Change Image
            </button>
          </div>
          <div className="form-group">
            <label>Transparency</label>
            <Range id="opacity" min={0} max={1} step={0.01} linkState={this.linkState} />
          </div>
          <div className="form-group">
            <label>Border Width</label>
            <Range id="borderWidth" max={10} unit="px" linkState={this.linkState} />
          </div>
          <div className="form-group">
            <label>Border Color</label>
            <ColorGroup id="borderColor" linkState={this.linkState} />
          </div>
        </div>

        <div className={classNames({overlay: true, active: this.state.showMenu})} onClick={this.toggleMenu}/>
        <div className={classNames({controls: true, active: this.state.showMenu})}>
          <button onClick={this.onCameraClick}>
            <img className="icon" src="../../img/take-photo.svg" />
            <p>Take Photo</p>
          </button>
          <button onClick={this.onMediaClick}>
            <img className="icon" src="../../img/camera-gallery.svg" />
            <p>Camera Gallery</p>
          </button>
        </div>
      </div>
    );
  },
  toggleMenu: function () {
    this.setState({showMenu: !this.state.showMenu});
  },
  onCameraClick: function () {
    this.toggleMenu();
    if (window.Android) window.Android.getFromCamera();
  },
  onMediaClick: function () {
    this.toggleMenu();
    if (window.Android) window.Android.getFromMedia();
  },
  imageReady: function (uri) {
    this.setState({
      src: uri
    });
  }
});

module.exports = ImageEditor;
