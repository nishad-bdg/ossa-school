import { denormalisedResponseEntities } from '../../util/data';
import { storableError } from '../../util/errors';
import { fetchCurrentUser, currentUserShowSuccess } from '../../ducks/user.duck';

// ================ Action types ================ //

export const MARK_TAB_UPDATED = 'app/EditOptionsSettingsPage/MARK_TAB_UPDATED';
export const CLEAR_UPDATED_TAB = 'app/EditOptionsSettingsPage/CLEAR_UPDATED_TAB';

export const UPDATE_OPTIONS_REQUEST = 'app/EditOptionsSettingsPage/UPDATE_OPTIONS_REQUEST';
export const UPDATE_OPTIONS_SUCCESS = 'app/EditOptionsSettingsPage/UPDATE_OPTIONS_SUCCESS';
export const UPDATE_OPTIONS_ERROR = 'app/EditOptionsSettingsPage/UPDATE_OPTIONS_ERROR';

// ================ Reducer ================ //

const initialState = {
  // Error instance placeholders for each endpoint
  createListingDraftError: null,
  publishingListing: null,
  publishListingError: null,
  updateListingError: null,
  showListingsError: null,
  uploadImageError: null,
  createListingDraftInProgress: false,
  submittedListingId: null,
  redirectToListing: false,
  images: {},
  listingDraft: null,
  updatedTab: null,
  updateInProgress: false,
  uploadInProgress: false,
  updateOptionsSettingsError: null,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case MARK_TAB_UPDATED:
      return { ...state, updatedTab: payload };
    case CLEAR_UPDATED_TAB:
      return { ...state, updatedTab: null, updateOptionsSettingsError: null };
    case UPDATE_OPTIONS_REQUEST:
      return { ...state, updateInProgress: true, updateOptionsSettingsError: null };
    case UPDATE_OPTIONS_SUCCESS:
      return { ...state, updateInProgress: false };
    case UPDATE_OPTIONS_ERROR:
      return { ...state, updateInProgress: false, updateOptionsSettingsError: payload };

      default:
      return state;
  }
}

// ================ Selectors ================ //

// ================ Action creators ================ //

export const markTabUpdated = tab => ({
  type: MARK_TAB_UPDATED,
  payload: tab,
});

export const clearUpdatedTab = () => ({
  type: CLEAR_UPDATED_TAB,
});


// SDK method: sdk.currentUser.updateProfile
export const updateOptionsSettingsRequest = params => ({
  type: UPDATE_OPTIONS_REQUEST,
  payload: { params },
});
export const updateOptionsSettingsSuccess = result => ({
  type: UPDATE_OPTIONS_SUCCESS,
  payload: result.data,
});
export const updateOptionsSettingsError = error => ({
  type: UPDATE_OPTIONS_ERROR,
  payload: error,
  error: true,
});

// ================ Thunk ================ //

export const updateOptionsSettings = (data) => {
  return (dispatch, getState, sdk) => {
    dispatch(updateOptionsSettingsRequest());
    var actionPayload = {
      publicData: {
        options: { ...data }
      }
    }
    const queryParams = {
      expand: true,
      include: ['profileImage'],
      'fields.image': ['variants.square-small', 'variants.square-small2x'],
    };
    return sdk.currentUser
      .updateProfile(actionPayload, queryParams)
      .then(response => {
        dispatch(updateOptionsSettingsSuccess(response));

        const entities = denormalisedResponseEntities(response);
        if (entities.length !== 1) {
          throw new Error('Expected a resource in the sdk.currentUser.updateOptionsSettings response');
        }
        const currentUser = entities[0];

        // Update current user in state.user.currentUser through user.duck.js
        dispatch(currentUserShowSuccess(currentUser));
      })
      .catch(e => dispatch(updateOptionsSettingsError(storableError(e))));
  };
};

// loadData is run for each tab of the wizard. When editing an
// existing listing, the listing must be fetched first.
export const loadData = params => (dispatch, getState, sdk) => {
  dispatch(clearUpdatedTab());
  return Promise.all([dispatch(fetchCurrentUser())])
    .then(response => {
      const currentUser = getState().user.currentUser;
      // if (currentUser && currentUser.stripeAccount) {
      //   dispatch(fetchStripeAccount());
      // }
      return response;
    })
    .catch(e => {
      throw e;
    });
};
