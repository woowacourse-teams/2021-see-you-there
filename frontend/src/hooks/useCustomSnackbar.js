import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';

import { COLOR } from '../constants';

export const useCustomSnackbar = () => {
  const useStyles = makeStyles(() => ({
    success: { backgroundColor: COLOR.PRIMARY },
    error: { backgroundColor: COLOR.ACCENT },
  }))();

  return {
    maxSnack: 3,

    autoHideDuration: 2000,
    TransitionComponent: Fade,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center',
    },

    hideIconVariant: true,
    preventDuplicate: true,

    variant: 'success',
    classes: {
      variantSuccess: useStyles.success,
      variantError: useStyles.error,
    },

    domRoot: document.getElementById('snackbar'),
  };
};
