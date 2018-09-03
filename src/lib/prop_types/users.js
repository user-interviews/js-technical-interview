import PropTypes from 'prop-types';

export const UserPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});
