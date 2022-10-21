import { denormalisedResponseEntities } from '../../util/data';
import { storableError } from '../../util/errors';
import {
  fetchStripeAccount,
} from '../../ducks/stripeConnectAccount.duck';
import { fetchCurrentUser, currentUserShowSuccess } from '../../ducks/user.duck';
import omit from 'lodash/omit';

// ================ Action types ================ //
const requestAction = actionType => params => ({ type: actionType, payload: { params } });

const successAction = actionType => result => ({ type: actionType, payload: result.data });

const errorAction = actionType => error => ({ type: actionType, payload: error, error: true });

export const MARK_TAB_UPDATED = 'app/SchoolPhotosPage/MARK_TAB_UPDATED';
export const CLEAR_UPDATED_TAB = 'app/SchoolPhotosPage/CLEAR_UPDATED_TAB';

export const CREATE_LISTING_DRAFT_REQUEST = 'app/SchoolPhotosPage/CREATE_LISTING_DRAFT_REQUEST';
export const CREATE_LISTING_DRAFT_SUCCESS = 'app/SchoolPhotosPage/CREATE_LISTING_DRAFT_SUCCESS';
export const CREATE_LISTING_DRAFT_ERROR = 'app/SchoolPhotosPage/CREATE_LISTING_DRAFT_ERROR';

export const PUBLISH_LISTING_REQUEST = 'app/SchoolPhotosPage/PUBLISH_LISTING_REQUEST';
export const PUBLISH_LISTING_SUCCESS = 'app/SchoolPhotosPage/PUBLISH_LISTING_SUCCESS';
export const PUBLISH_LISTING_ERROR = 'app/SchoolPhotosPage/PUBLISH_LISTING_ERROR';

export const UPDATE_LISTING_REQUEST = 'app/SchoolPhotosPage/UPDATE_LISTING_REQUEST';
export const UPDATE_LISTING_SUCCESS = 'app/SchoolPhotosPage/UPDATE_LISTING_SUCCESS';
export const UPDATE_LISTING_ERROR = 'app/SchoolPhotosPage/UPDATE_LISTING_ERROR';

export const SHOW_LISTINGS_REQUEST = 'app/SchoolPhotosPage/SHOW_LISTINGS_REQUEST';
export const SHOW_LISTINGS_SUCCESS = 'app/SchoolPhotosPage/SHOW_LISTINGS_SUCCESS';
export const SHOW_LISTINGS_ERROR = 'app/SchoolPhotosPage/SHOW_LISTINGS_ERROR';

export const FETCH_BOOKINGS_REQUEST = 'app/SchoolPhotosPage/FETCH_BOOKINGS_REQUEST';
export const FETCH_BOOKINGS_SUCCESS = 'app/SchoolPhotosPage/FETCH_BOOKINGS_SUCCESS';
export const FETCH_BOOKINGS_ERROR = 'app/SchoolPhotosPage/FETCH_BOOKINGS_ERROR';

export const FETCH_EXCEPTIONS_REQUEST = 'app/SchoolPhotosPage/FETCH_AVAILABILITY_EXCEPTIONS_REQUEST';
export const FETCH_EXCEPTIONS_SUCCESS = 'app/SchoolPhotosPage/FETCH_AVAILABILITY_EXCEPTIONS_SUCCESS';
export const FETCH_EXCEPTIONS_ERROR = 'app/SchoolPhotosPage/FETCH_AVAILABILITY_EXCEPTIONS_ERROR';

export const CREATE_EXCEPTION_REQUEST = 'app/SchoolPhotosPage/CREATE_AVAILABILITY_EXCEPTION_REQUEST';
export const CREATE_EXCEPTION_SUCCESS = 'app/SchoolPhotosPage/CREATE_AVAILABILITY_EXCEPTION_SUCCESS';
export const CREATE_EXCEPTION_ERROR = 'app/SchoolPhotosPage/CREATE_AVAILABILITY_EXCEPTION_ERROR';

export const DELETE_EXCEPTION_REQUEST = 'app/SchoolPhotosPage/DELETE_AVAILABILITY_EXCEPTION_REQUEST';
export const DELETE_EXCEPTION_SUCCESS = 'app/SchoolPhotosPage/DELETE_AVAILABILITY_EXCEPTION_SUCCESS';
export const DELETE_EXCEPTION_ERROR = 'app/SchoolPhotosPage/DELETE_AVAILABILITY_EXCEPTION_ERROR';

export const UPLOAD_IMAGE_REQUEST = 'app/SchoolPhotosPage/UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'app/SchoolPhotosPage/UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_ERROR = 'app/SchoolPhotosPage/UPLOAD_IMAGE_ERROR';

export const UPDATE_IMAGE_ORDER = 'app/SchoolPhotosPage/UPDATE_IMAGE_ORDER';

export const REMOVE_LISTING_IMAGE = 'app/SchoolPhotosPage/REMOVE_LISTING_IMAGE';

export const SAVE_PAYOUT_DETAILS_REQUEST = 'app/SchoolPhotosPage/SAVE_PAYOUT_DETAILS_REQUEST';
export const SAVE_PAYOUT_DETAILS_SUCCESS = 'app/SchoolPhotosPage/SAVE_PAYOUT_DETAILS_SUCCESS';
export const SAVE_PAYOUT_DETAILS_ERROR = 'app/SchoolPhotosPage/SAVE_PAYOUT_DETAILS_ERROR';


export const UPDATE_PROFILE_REQUEST = 'app/ProfileSettingsPage/UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'app/ProfileSettingsPage/UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_ERROR = 'app/ProfileSettingsPage/UPDATE_PROFILE_ERROR';


export const UPDATE_ACCOMODATION_REQUEST = 'app/SchoolPhotosPage/UPDATE_ACCOMODATION_REQUEST';
export const UPDATE_ACCOMODATION_SUCCESS = 'app/SchoolPhotosPage/UPDATE_ACCOMODATION_SUCCESS';
export const UPDATE_ACCOMODATION_ERROR = 'app/SchoolPhotosPage/UPDATE_ACCOMODATION_ERROR';

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
  imageOrder: [],
  removedImageIds: [],
  listingDraft: null,
  updatedTab: null,
  updateInProgress: false,
  uploadInProgress: false,
  updateSchoolPhotosError: null,
  updateProfileError: null,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case MARK_TAB_UPDATED:
      return { ...state, updatedTab: payload };
    case CLEAR_UPDATED_TAB:
      return { ...state, updatedTab: null, updateListingError: null };
    case UPDATE_ACCOMODATION_REQUEST:
      return { ...state, updateInProgress: true, updateSchoolPhotosError: null };
    case UPDATE_ACCOMODATION_SUCCESS:
      return { ...state, updateInProgress: false };
    case UPLOAD_IMAGE_REQUEST: {
      // payload.params: { id: 'tempId', file }
      const images = {
        ...state.images,
        [payload.params.id]: { ...payload.params },
      };
      return {
        ...state,
        images,
        imageOrder: state.imageOrder.concat([payload.params.id]),
        uploadImageError: null,
      };
    }
    case UPLOAD_IMAGE_SUCCESS: {
      // payload.params: { id: 'tempId', imageId: 'some-real-id'}

      const { id, imageId, data } = payload;
      const file = state.images[id].file;
      const images = { ...state.images, [id]: { id, imageId, file, original: data } };
      return { ...state, images };
    }
    case UPLOAD_IMAGE_ERROR: {
      // eslint-disable-next-line no-console
      const { id, error } = payload;
      const imageOrder = state.imageOrder.filter(i => i !== id);
      const images = omit(state.images, id);
      return { ...state, imageOrder, images, uploadImageError: error };
    }
    case UPDATE_IMAGE_ORDER:
      return { ...state, imageOrder: payload.imageOrder };

    case REMOVE_LISTING_IMAGE: {
      const id = payload.imageId;

      // Only mark the image removed if it hasn't been added to the
      // listing already
      const removedImageIds = state.images[id]
        ? state.removedImageIds
        : state.removedImageIds.concat(id);

      // Always remove from the draft since it might be a new image to
      // an existing listing.
      const images = omit(state.images, id);
      const imageOrder = state.imageOrder.filter(i => i !== id);

      return { ...state, images, imageOrder, removedImageIds };
    }
    case UPDATE_ACCOMODATION_ERROR:
      return { ...state, updateInProgress: false, updateSchoolPhotosError: payload };
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
export const updateProfileRequest = params => ({
  type: UPDATE_PROFILE_REQUEST,
  payload: { params },
});
export const updateProfileSuccess = result => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: result.data,
});
export const updateProfileError = error => ({
  type: UPDATE_PROFILE_ERROR,
  payload: error,
  error: true,
});

// SDK method: sdk.currentUser.updateProfile
export const updateSchoolPhotosRequest = params => ({
  type: UPDATE_ACCOMODATION_REQUEST,
  payload: { params },
});
export const updateSchoolPhotosSuccess = result => ({
  type: UPDATE_ACCOMODATION_SUCCESS,
  payload: result.data,
});
export const updateSchoolPhotosError = error => ({
  type: UPDATE_ACCOMODATION_ERROR,
  payload: error,
  error: true,
});

export const updateImageOrder = imageOrder => ({
  type: UPDATE_IMAGE_ORDER,
  payload: { imageOrder },
});

export const removeListingImage = imageId => ({
  type: REMOVE_LISTING_IMAGE,
  payload: { imageId },
});


// SDK method: images.upload
export const uploadImage = requestAction(UPLOAD_IMAGE_REQUEST);
export const uploadImageSuccess = successAction(UPLOAD_IMAGE_SUCCESS);
export const uploadImageError = errorAction(UPLOAD_IMAGE_ERROR);


// ================ Thunk ================ //


// Images return imageId which we need to map with previously generated temporary id
export function requestImageUpload(actionPayload) {
  return (dispatch, getState, sdk) => {
    const id = actionPayload.id;
    dispatch(uploadImage(actionPayload));
    return sdk.images
      .upload({ image: actionPayload.file }, {
        expand: true
      })
      .then(resp => dispatch(uploadImageSuccess({ data: { id, imageId: resp.data.data.id, data: resp.data.data } })))
      .catch(e => dispatch(uploadImageError({ id, error: storableError(e) })));
  };
}

export const updateSchoolPhotos = (data) => {
  return (dispatch, getState, sdk) => {
    dispatch(updateSchoolPhotosRequest());

    var actionPayload = {
      publicData: {
        schoolPhotos: data
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
        dispatch(updateSchoolPhotosSuccess(response));

        const entities = denormalisedResponseEntities(response);
        if (entities.length !== 1) {
          throw new Error('Expected a resource in the sdk.currentUser.updateProfile response');
        }
        const currentUser = entities[0];

        // Update current user in state.user.currentUser through user.duck.js
        dispatch(currentUserShowSuccess(currentUser));
      })
      .catch(e => dispatch(updateSchoolPhotosError(storableError(e))));
  };
};

// loadData is run for each tab of the wizard. When editing an
// existing listing, the listing must be fetched first.
export const loadData = params => (dispatch, getState, sdk) => {
  dispatch(clearUpdatedTab());
  return Promise.all([dispatch(fetchCurrentUser())])
    .then(response => {
      const currentUser = getState().user.currentUser;
      if (currentUser && currentUser.stripeAccount) {
        dispatch(fetchStripeAccount());
      }
      return response;
    })
    .catch(e => {
      throw e;
    });
};
