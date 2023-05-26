const containerStyle = {
  width: '100%',
  height: '300px',
  marginLeft: '2px',
  border: '2px solid #ececec',
  borderRadius: '10px',
  boxShadow:
    '0px 1px 1px rgba(0, 0, 0, 0.12), 0px 4px 4px rgba(0, 0, 0, 0.06), 1px 4px 6px rgba(0, 0, 0, 0.16)',
};

const center = {
  current: { lat: 50.45466, lng: 30.5238 },
  shop: {
    lat: 50.44,
    lng: 30.52,
  },
};

const options = {
  disableDefaultUI: true,
  clickableIcons: false,
  disableDoubleClickZoom: true,
};

export { containerStyle, center, options };
