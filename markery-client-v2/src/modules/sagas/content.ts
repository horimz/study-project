import { takeLatest, take, call, fork, put } from 'redux-saga/effects';
import { contentActionTypes, contentActions } from '../actions/content';
import { loadingActions, LoadingType } from '../actions/loading';
import { notificationActions, NotificationType } from '../actions/notification';
import { errorActions, ErrorType } from '../actions/error';
import { modalActions } from '../actions/modal';
import { generateUID } from '../../lib/uuid';
import * as folderApi from '../../lib/api/folders';
import * as FolderTypes from '../../lib/api/folders/types';
import * as urlApi from '../../lib/api/urls';
import * as UrlTypes from '../../lib/api/urls/types';

/* Worker sagas */

function* fetchRootFolderId() {
  // Start loading
  yield put(loadingActions.startLoading(LoadingType.fetchRootFolderId));

  try {
    // Send request
    const response: FolderTypes.FetchRootFolderIdResponse = yield call(
      folderApi.fetchRootFolderId
    );

    const {
      content: { rootFolderId }
    } = response.data;

    // Set root folder id
    yield put(contentActions.fetchRootFolderIdSuccess(rootFolderId));
  } catch (e) {
    // Set root folder id to null
    yield put(contentActions.fetchRootFolderIdFailure());
  }
  // Stop loading
  yield put(loadingActions.finishLoading());
}

function* fetchContent(action: { type: string; payload: string }) {
  // Start loading
  yield put(loadingActions.startLoading(LoadingType.global));

  try {
    // Send request to fetch folders
    const fetchFoldersResponse: FolderTypes.FetchSubfoldersInFolderByIdResponse = yield call(
      folderApi.fetchSubfoldersInFolderById,
      action.payload
    );

    const {
      content: { folders }
    } = fetchFoldersResponse.data;

    // Send request to fetch urls
    const fetchUrlsResponse: UrlTypes.FetchUrlsInFolderByIdResponse = yield call(
      urlApi.fetchUrlsInFolderById,
      action.payload
    );

    const {
      content: { urls }
    } = fetchUrlsResponse.data;

    const data = {
      folders,
      urls
    };

    // Set content
    yield put(contentActions.fetchContentSuccess(data));
  } catch (e) {
    // Set content to null
    yield put(contentActions.fetchContentFailure());

    // Set error
    yield put(errorActions.setError(ErrorType.badRequest));
    console.log(e.response.data);
    // Generate error message
    const errorMessage = {
      id: generateUID(),
      type: NotificationType.error,
      message:
        e.response.data.errorMessage || 'Bad request. Cannot find content.'
    };

    // Display error message
    yield put(notificationActions.addNotification(errorMessage));
  }

  // Stop loading
  yield put(loadingActions.finishLoading());
}

function* fetchAllFolders() {
  // Start loading
  yield put(loadingActions.startLoading(LoadingType.global));

  try {
    const response: FolderTypes.FetchAllFoldersResponse = yield call(
      folderApi.fetchAllFolders
    );

    const {
      content: { folders }
    } = response.data;

    // Display folders
    yield put(contentActions.fetchAllFolderSuccess(folders));
  } catch (e) {
    yield put(contentActions.fetchAllFolderFailure());
  }
  // Stop loading
  yield put(loadingActions.finishLoading());
}

function* fetchAllUrls() {
  // Start loading
  yield put(loadingActions.startLoading(LoadingType.global));

  try {
    const response: UrlTypes.FetchAllUrlsResponse = yield call(
      urlApi.fetchAllUrls
    );

    const {
      content: { urls }
    } = response.data;

    // Display urls
    yield put(contentActions.fetchAllUrlSuccess(urls));
  } catch (e) {
    yield put(contentActions.fetchAllUrlFailure());
  }
  // Stop loading
  yield put(loadingActions.finishLoading());
}

function* createFolder(action: {
  type: string;
  payload: FolderTypes.CreateFolderInput;
}) {
  // Start loading
  yield put(loadingActions.startLoading(LoadingType.createFolder));

  try {
    // Send request
    const response: FolderTypes.CreateFolderResponse = yield call(
      folderApi.createFolder,
      action.payload
    );

    const { content: folder } = response.data;

    // Display folder
    yield put(contentActions.createFolderSuccess(folder));

    // Close modal
    yield put(modalActions.createFolderModalToggle());
  } catch (e) {
    yield put(contentActions.createFolderFailure());
  }

  // Stop loading
  yield put(loadingActions.finishLoading());
}

function* createUrl(action: {
  type: string;
  payload: UrlTypes.CreateUrlInput;
}) {
  // Start loading
  yield put(loadingActions.startLoading(LoadingType.createUrl));

  try {
    // Send request
    const response: FolderTypes.CreateFolderResponse = yield call(
      urlApi.createUrl,
      action.payload
    );

    const { content: url } = response.data;

    // Display folder
    yield put(contentActions.createUrlSuccess(url));

    // Close modal
    yield put(modalActions.createUrlModalToggle());
  } catch (e) {
    yield put(contentActions.createUrlFailure());
  }
  // Stop loading
  yield put(loadingActions.finishLoading());
}

function* updateFolder(action: {
  type: string;
  payload: FolderTypes.UpdateFolderInput;
}) {
  // Start loading
  yield put(loadingActions.startLoading(LoadingType.updateFolder));

  try {
    // Send request
    const response: FolderTypes.UpdateFolderResponse = yield call(
      folderApi.updateFolder,
      action.payload
    );

    const { content: folder } = response.data;

    // Update folder state
    yield put(contentActions.updateFolderSuccess(folder));
  } catch (e) {
    yield put(contentActions.updateFolderFailure());
  }
  // Stop loading
  yield put(loadingActions.finishLoading());
}

function* updateUrl(action: {
  type: string;
  payload: UrlTypes.UpdateUrlInput;
}) {
  // Start loading
  yield put(loadingActions.startLoading(LoadingType.updateUrl));

  try {
    // Send request
    const response: UrlTypes.UpdateUrlResponse = yield call(
      urlApi.updateUrl,
      action.payload
    );

    const { content: url } = response.data;

    // Update url state
    yield put(contentActions.updateUrlSuccess(url));

    // Close modal
    yield put(modalActions.updateUrlModalToggle());

    // Generate success message
    const successMessage = {
      id: generateUID(),
      type: NotificationType.normal,
      message: 'Applied changes'
    };

    // Display success message
    yield put(notificationActions.addNotification(successMessage));
  } catch (e) {
    yield put(contentActions.updateUrlFailure());
  }
  // Stop loading
  yield put(loadingActions.finishLoading());
}

function* deleteFolder(action: { type: string; payload: string }) {
  // Start loading
  yield put(loadingActions.startLoading(LoadingType.deleteFolder));

  try {
    // Send request
    const response: FolderTypes.DeleteFolderResponse = yield call(
      folderApi.deleteFolder,
      action.payload
    );

    const { content: folder } = response.data;

    // Remove url from urls list
    yield put(contentActions.deleteFolderSuccess(folder));
  } catch (e) {
    yield put(contentActions.deleteFolderFailure());
  }
  // Stop loading
  yield put(loadingActions.finishLoading());
}

function* deleteUrl(action: { type: string; payload: string }) {
  // Start loading
  yield put(loadingActions.startLoading(LoadingType.deleteUrl));

  try {
    // Send request
    const response: UrlTypes.DeleteUrlResponse = yield call(
      urlApi.deleteUrl,
      action.payload
    );

    const { content: url } = response.data;

    // Remove url from urls list
    yield put(contentActions.deleteUrlSuccess(url));
  } catch (e) {
    yield put(contentActions.deleteUrlFailure());
  }
  // Stop loading
  yield put(loadingActions.finishLoading());
}

/* Watcher sagas */

function* watchFetchRootFolderIdRequest() {
  yield takeLatest(
    contentActionTypes.FETCH_ROOT_FOLDER_ID_REQUEST,
    fetchRootFolderId
  );
}

function* watchFetchContentRequest() {
  yield takeLatest(contentActionTypes.FETCH_CONTENT_REQUEST, fetchContent);
}

function* watchFetchAllFoldersRequest() {
  yield takeLatest(
    contentActionTypes.FETCH_ALL_FOLDERS_REQUEST,
    fetchAllFolders
  );
}

function* watchFetchAllUrlsRequest() {
  yield takeLatest(contentActionTypes.FETCH_ALL_URL_REQUEST, fetchAllUrls);
}

function* watchCreateFolderRequest() {
  while (true) {
    const action = yield take(contentActionTypes.CREATE_FOLDER_REQUEST);
    yield call(createFolder, action);
  }
}

function* watchCreateUrlRequest() {
  while (true) {
    const action = yield take(contentActionTypes.CREATE_URL_REQUEST);
    yield call(createUrl, action);
  }
}

function* watchUpdateFolderRequest() {
  while (true) {
    const action = yield take(contentActionTypes.UPDATE_FOLDER_REQUEST);
    yield call(updateFolder, action);
  }
}

function* watchUpdateUrlRequest() {
  while (true) {
    const action = yield take(contentActionTypes.UPDATE_URL_REQUEST);
    yield call(updateUrl, action);
  }
}

function* watchDeleteFolderRequest() {
  while (true) {
    const action = yield take(contentActionTypes.DELETE_FOLDER_REQUEST);
    yield call(deleteFolder, action);
  }
}

function* watchDeleteUrlRequest() {
  while (true) {
    const action = yield take(contentActionTypes.DELETE_URL_REQUEST);
    yield call(deleteUrl, action);
  }
}

export const contentSagas = [
  fork(watchFetchRootFolderIdRequest),
  fork(watchFetchContentRequest),
  fork(watchFetchAllFoldersRequest),
  fork(watchFetchAllUrlsRequest),
  fork(watchCreateFolderRequest),
  fork(watchCreateUrlRequest),
  fork(watchUpdateFolderRequest),
  fork(watchUpdateUrlRequest),
  fork(watchDeleteFolderRequest),
  fork(watchDeleteUrlRequest)
];
