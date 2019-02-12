import React, { Component } from "react";
import {
  YMaps,
  Map,
  GeolocationControl,
  FullscreenControl,
  ZoomControl,
  SearchControl,
} from 'react-yandex-maps';
import classNames from 'classnames/bind';

import styles from './Map.sass';

const cx = classNames.bind(styles);

class MainMap extends Component {
  static defaultProps = {
    className: '',
    mapState: {
      controls: [],
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedPolygonId: undefined,
      selectedRestaurantId: undefined,
      deliveryGroups: [],
      isMarkerHover: false,
      allMarkersVisible: false,
      hintLayout: null,
      isLoaded: false,
      uniqueCategory: undefined,
      activeCategory: 'day',
      activeTab: 'day',
      searchValue: '',
      isNoResultMessage: false,
      tempSelectedMap: {
        selectedPolygonId: undefined,
        selectedRestaurantId: undefined,
      },
    };

    this.mapRef = React.createRef();
  }

  handleApiAvaliable = ymaps => {
    setTimeout(() => {
      if (this.mapRef) {
        if (this.props.isPhone) {
          this.mapRef.behaviors.disable('drag');
        }

        this.mapRef.events.add('boundschange', e => {
          if (
            e.originalEvent.newZoom >= 12 &&
            e.originalEvent.newZoom !== e.originalEvent.oldZoom
          ) {
            this.setState({ allMarkersVisible: true });
          } else if (
            e.originalEvent.newZoom < 12 &&
            e.originalEvent.newZoom !== e.originalEvent.oldZoom
          ) {
            this.setState({ allMarkersVisible: false });
          }
        });
      }
    }, 100);

    this.setState({
      isLoaded: true,
    });
  };

  render() {
    const mapStateInstance = {
      zoom: 9,
      center: [55.76, 37.64],
    };
    
    return (
      <div className='Map'>
        <YMaps onApiAvaliable={this.handleApiAvaliable}>
          <div className={cx('Map__layout')}>
            <Map
              width="800px"
              height="400px"
              state={mapStateInstance}
              instanceRef={this.mapRef}>
              <FullscreenControl
                options={{
                  float: 'none',
                  position: {
                    bottom: '32px',
                    right: '88px',
                  },
                }}
              />
              <GeolocationControl
                options={{
                  float: 'none',
                  position: {
                    bottom: '32px',
                    right: '136px',
                  },
                }}
              />
              <ZoomControl
                options={{
                  size: 'small',
                  float: 'none',
                  position: {
                    bottom: '32px',
                    right: '32px',
                  },
                }}
              />
              <SearchControl
                options={{
                  provider: 'yandex#search',
                }}
              />
            </Map>
          </div>
        </YMaps>
      </div>
    )
  }
}

export default MainMap;