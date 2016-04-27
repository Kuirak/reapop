import React, {Component} from 'react';
import {connect} from 'react-redux';
import css from './Notification.scss';
import {removeNotification} from '../../redux/modules/notifications';

// default className for Notification component
export const className = {
  main: css['notification'],
  type: function(type) {
    return css[`notification-${type}`];
  },
  // `fa` corresponds to font-awesome's class name
  icon: `fa ${css['notification-icon']}`
};

class Notification extends Component {
  // Properties types
  static propTypes = {
    id: React.PropTypes.number.isRequired,
    message: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    dismissAfter: React.PropTypes.number.isRequired,
    dismissible: React.PropTypes.bool.isRequired,
    removeNotification: React.PropTypes.func.isRequired,
    className: React.PropTypes.object.isRequired
  };

  /**
   * Constructor
   * Bind methods
   * @param {Object} props
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this._remove = this._remove.bind(this);
  }
  
  /**
   * Remove the notification
   * @private
   * @returns {void}
   */
  _remove() {
    const {removeNotification, id} = this.props;
    removeNotification(id);
  }
  
  /**
   * Render
   * @returns {XML}
   */
  render() {
    const {message, type, dismissAfter, dismissible, className} = this.props;
    // remove automatically notification after `dismissAfter` time
    if (dismissAfter > 0) {
      setTimeout(() => this._remove(), dismissAfter);
    }
    return (
      <div className={`${className.main} ${className.type(type)}`}
           onClick={dismissible ? this._remove : ''}>
        <i className={className.icon}></i>
        {message}
      </div>
    );
  }
}

export default connect(null, {removeNotification})(Notification);