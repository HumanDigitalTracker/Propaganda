import React, {PureComponent} from 'react';
import {Input, Icon} from 'antd';
import {Motion, spring} from 'react-motion';

export default class Favourite extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      saved: false
    };
  }

  addFavourite = (e) => {
    this.setState({saved: true});
    this.props.onClick(this.props.card);
  };

  render() {
    const { onClick, card } = this.props;
    const {saved} = this.state;
    return (
      <span>

        <Icon type="contacts"/>

        <span style={{position: 'absolute', 'color': 'green', 'margin-top': `0%`}}>
          <Icon onClick={this.addFavourite.bind(this)} type="star"/>
        </span>

        <Motion style={{offset: spring(saved ? -5 : 0), opacity: spring(saved ? 0 : 1)}}>
          {
            ({offset, opacity}) => (
              <span style={{
                'opacity': opacity,
                'color': saved ? 'green' : 'grey',
                position: 'absolute',
                'margin-top': offset + `%`
              }}>
                <Icon onClick={this.addFavourite.bind(this)} type="star"/>
                </span>
            )}
        </Motion>

      </span>

    );
  }
}





