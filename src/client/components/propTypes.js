import PropTypes from 'prop-types';

export const Point = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
});

export const Path = PropTypes.arrayOf(Point);

export const Packet = PropTypes.shape({
  id: PropTypes.string.isRequired,
  path: Path,
  onPathComplete: PropTypes.func,
  color: PropTypes.string,
  direction: PropTypes.string,
});
