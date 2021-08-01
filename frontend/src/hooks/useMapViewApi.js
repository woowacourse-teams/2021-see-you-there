/* eslint no-undef: "off" */
import { Z_INDEX, HTML, PIN_Y_ANCHOR, MAP_BOUNDS_DIFFS, MAP_BOUNDS_PADDING } from '../constants';

export const useMapViewApi = ({ mapObj, mapViewRef }) => {
  /* 지도 범위 API */
  const showMapView = (midpoint, level = 3) => {
    const { x, y } = midpoint;
    const options = { center: new kakao.maps.LatLng(y, x), level };

    mapObj.current = new kakao.maps.Map(mapViewRef?.current, options);
  };

  const showAroundPoint = (midpoint, level = 3) => {
    const { x, y } = midpoint;
    const position = new kakao.maps.LatLng(y, x);

    mapObj.current.setLevel(level);
    mapObj.current.setCenter(position);
  };

  const getMorePoints = (point, level) => {
    const { x, y } = point;

    return MAP_BOUNDS_DIFFS.map(([dx, dy]) => {
      const newY = y + dy * MAP_BOUNDS_PADDING[level];
      const newX = x + dx * MAP_BOUNDS_PADDING[level];

      /* kakao map API는 x,y를 반대로 적어야 함 */
      return new kakao.maps.LatLng(newY, newX);
    });
  };

  const setBounds = (positions) => {
    const bounds = new kakao.maps.LatLngBounds();
    const points = positions.map(({ x, y }) => new kakao.maps.LatLng(y, x));

    points.forEach((point) => bounds.extend(point));
    mapObj.current.setBounds(bounds);

    /* 새로 설정된 지도 배율 기준으로, 상단 컨트롤러에 가려지지 않도록 패딩 추가 */
    const level = mapObj.current.getLevel();
    const widerBounds = new kakao.maps.LatLngBounds();

    positions.map((position) => getMorePoints(position, level).forEach((point) => widerBounds.extend(point)));
    mapObj.current.setBounds(widerBounds);
  };

  /* 마커 API */
  const getTooltip = ({ position, title, url, key, isInteractive }) => {
    const $tooltip = document.createElement('button');
    const KEY = isInteractive ? 'INTERACTIVE' : 'DEFAULT';
    $tooltip.innerHTML = HTML.TOOLTIP[KEY]({ title, url, key });

    const tooltip = new kakao.maps.CustomOverlay({
      position,
      content: $tooltip,
      clickable: true,
      zIndex: Z_INDEX.MAP_TOOLTIP,
    });

    return { $tooltip, tooltip };
  };

  const getPin = ({ position, title, url, key, isInteractive }) => {
    const $pin = document.createElement('button');
    const KEY = isInteractive ? 'INTERACTIVE' : 'DEFAULT';
    $pin.innerHTML = HTML.PIN[KEY]({ title, url, key });

    const pin = new kakao.maps.CustomOverlay({
      position,
      content: $pin,
      clickable: true,
      yAnchor: PIN_Y_ANCHOR,
      zIndex: Z_INDEX.MAP_PIN,
    });
    return { $pin, pin };
  };

  const addEventListeners = ({ $pin, $tooltip, tooltip }) => {
    let timerId;

    $pin.addEventListener('mouseover', () => {
      clearTimeout(timerId);
      tooltip.setMap(mapObj.current);
    });
    $pin.addEventListener('mouseleave', () => {
      clearTimeout(timerId);
      timerId = setTimeout(() => tooltip.setMap(null), 200);
    });
    $tooltip.addEventListener('mouseover', () => {
      clearTimeout(timerId);
      tooltip.setMap(mapObj.current);
    });
    $tooltip.addEventListener('mouseleave', () => {
      clearTimeout(timerId);
      timerId = setTimeout(() => tooltip.setMap(null), 200);
    });
    $pin.addEventListener('touchstart', () => {
      const isVisible = tooltip.getVisible();

      if (isVisible) {
        tooltip.setMap(null);
        return;
      }
      tooltip.setMap(mapObj.current);
    });
  };

  const getMarker = (markerSpec) => {
    const { x, y, title, url, key, isInteractive } = markerSpec;
    const position = new kakao.maps.LatLng(y, x);
    const { tooltip, $tooltip } = getTooltip({ position, title, url, key, isInteractive });
    const { $pin, pin } = getPin({ position, title, url, key, isInteractive });

    if (isInteractive) {
      addEventListeners({ $pin, $tooltip, tooltip });
      return { pin };
    }
    return { pin, tooltip };
  };

  const showMarker = (marker) => {
    const { pin, tooltip } = marker;

    pin && pin.setMap(mapObj.current);
    tooltip && tooltip.setMap(mapObj.current);
  };
  const showMarkers = (markers) => markers.forEach((marker) => showMarker(marker));

  const hideMarker = (marker) => {
    const { pin, tooltip } = marker;

    pin && pin.setMap(null);
    tooltip && tooltip.setMap(null);
  };
  const hideMarkers = (markers) => markers.forEach((marker) => hideMarker(marker));

  return {
    showMapView,
    showAroundPoint,
    setBounds,

    getMarker,
    showMarker,
    showMarkers,
    hideMarker,
    hideMarkers,
  };
};
