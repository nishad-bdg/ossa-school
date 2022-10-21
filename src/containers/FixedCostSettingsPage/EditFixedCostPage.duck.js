import { denormalisedResponseEntities } from '../../util/data';
import { storableError } from '../../util/errors';
import { fetchCurrentUser, currentUserShowSuccess } from '../../ducks/user.duck';

// ================ Action types ================ //

export const MARK_TAB_UPDATED = 'app/EditFixedCostPage/MARK_TAB_UPDATED';
export const CLEAR_UPDATED_TAB = 'app/EditFixedCostPage/CLEAR_UPDATED_TAB';

export const UPDATE_FIXEDCOST_REQUEST = 'app/EditFixedCostPage/UPDATE_FIXEDCOST_REQUEST';
export const UPDATE_FIXEDCOST_SUCCESS = 'app/EditFixedCostPage/UPDATE_FIXEDCOST_SUCCESS';
export const UPDATE_FIXEDCOST_ERROR = 'app/EditFixedCostPage/UPDATE_FIXEDCOST_ERROR';

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
  updateFixedCostError: null,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case MARK_TAB_UPDATED:
      return { ...state, updatedTab: payload };
    case CLEAR_UPDATED_TAB:
      return { ...state, updatedTab: null, updateFixedCostError: null };
    case UPDATE_FIXEDCOST_REQUEST:
      return { ...state, updateInProgress: true, updateFixedCostError: null };
    case UPDATE_FIXEDCOST_SUCCESS:
      return { ...state, updateInProgress: false };
    case UPDATE_FIXEDCOST_ERROR:
      return { ...state, updateInProgress: false, updateFixedCostError: payload };

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
export const updateFixedCostRequest = params => ({
  type: UPDATE_FIXEDCOST_REQUEST,
  payload: { params },
});
export const updateFixedCostSuccess = result => ({
  type: UPDATE_FIXEDCOST_SUCCESS,
  payload: result.data,
});
export const updateFixedCostError = error => ({
  type: UPDATE_FIXEDCOST_ERROR,
  payload: error,
  error: true,
});

// ================ Thunk ================ //

export const updateFixedCost = (data) => {
  return (dispatch, getState, sdk) => {
    dispatch(updateFixedCostRequest());
    var actionPayload = {
      publicData: {
        fixedCost: { ...data }
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
        dispatch(updateFixedCostSuccess(response));

        const entities = denormalisedResponseEntities(response);
        if (entities.length !== 1) {
          throw new Error('Expected a resource in the sdk.currentUser.updateFixedCost response');
        }
        const currentUser = entities[0];

        // Update current user in state.user.currentUser through user.duck.js
        dispatch(currentUserShowSuccess(currentUser));
      })
      .catch(e => dispatch(updateFixedCostError(storableError(e))));
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
