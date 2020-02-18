import React, { Component, createContext } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../common/reducers';
import { IFolder, fetchFolderContent } from '../common/actions';

interface IAppContext {
  selectedFolderName: string | null | undefined;
  selectedFolderId: string | null | undefined;
  setSelectedFolder(
    folderName: string | null | undefined,
    folderId: string | null | undefined
  ): void;
  deleteSelectedFolder(): void;
  setToMostCurrentFolder(): void;
}

const initialState = {
  selectedFolderName: null,
  selectedFolderId: null,
  setSelectedFolder: () => {},
  deleteSelectedFolder: () => {},
  setToMostCurrentFolder: () => {}
};

export const AppContext = createContext<IAppContext>(initialState);

interface AppProviderProps {
  folders: IFolder[];
  fetchFolderContent: Function;
}

interface AppProviderStates extends IAppContext {}

class _AppProvider extends Component<AppProviderProps, AppProviderStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedFolderName:
        props.folders.length !== 0 ? props.folders[0].folderName : null,
      selectedFolderId:
        props.folders.length !== 0 ? props.folders[0]._id : null,
      setSelectedFolder: this.setSelectedFolder,
      deleteSelectedFolder: this.deleteSelectedFolder,
      setToMostCurrentFolder: this.setToMostCurrentFolder
    };

    if (this.state.selectedFolderId)
      this.props.fetchFolderContent(this.state.selectedFolderId);
  }

  setSelectedFolder = (
    folderName: string | null | undefined,
    folderId: string | null | undefined
  ): void => {
    this.setState(
      {
        selectedFolderName: folderName,
        selectedFolderId: folderId
      },
      () => {
        if (this.state.selectedFolderId)
          this.props.fetchFolderContent(this.state.selectedFolderId);
      }
    );
  };

  deleteSelectedFolder = (): void => {
    if (this.props.folders.length === 0)
      return this.setSelectedFolder(null, null);

    if (!this.props.folders[0]._id)
      throw new Error('Folder Id does not exist.');

    this.setSelectedFolder(
      this.props.folders[0].folderName,
      this.props.folders[0]._id
    );
  };

  setToMostCurrentFolder = (): void => {
    if (this.props.folders.length === 0)
      return this.setSelectedFolder(null, null);

    this.setSelectedFolder(
      this.props.folders[this.props.folders.length - 1].folderName,
      this.props.folders[this.props.folders.length - 1]._id
    );
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

const mapStateToProps = ({ folders }: StoreState): { folders: any } => {
  return { folders };
};

export const AppProvider = connect(mapStateToProps, { fetchFolderContent })(
  _AppProvider
);
