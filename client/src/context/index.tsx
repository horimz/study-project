import React, { Component, createContext } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../common/reducers';
import {
  IFolder,
  fetchFolderContent,
  updateFolders,
  updateContent
} from '../common/actions';

interface IAppContext {
  folders: IFolder[];
  selectedFolderName: string | null | undefined;
  selectedFolderId: string | null | undefined;
  setSelectedFolder(
    folderName: string | null | undefined,
    folderId: string | null | undefined,
    fetchContents?: boolean
  ): void;
  editSelectedFolder(folderName: string): void;
  deleteSelectedFolder(): void;
  setToMostCurrentFolder(): void;
}

const initialState = {
  folders: [],
  selectedFolderName: null,
  selectedFolderId: null,
  setSelectedFolder: () => {},
  editSelectedFolder: () => {},
  deleteSelectedFolder: () => {},
  setToMostCurrentFolder: () => {}
};

export const AppContext = createContext<IAppContext>(initialState);

interface AppProviderProps {
  folders: IFolder[];
  fetchFolderContent: Function;
  updateFolders: Function;
  updateContent: Function;
}

interface AppProviderStates extends IAppContext {}

class _AppProvider extends Component<AppProviderProps, AppProviderStates> {
  constructor(props: AppProviderProps) {
    super(props);
    this.state = {
      folders: this.props.folders,
      selectedFolderName:
        props.folders.length !== 0 ? props.folders[0].folderName : null,
      selectedFolderId:
        props.folders.length !== 0 ? props.folders[0]._id : null,
      setSelectedFolder: this.setSelectedFolder,
      editSelectedFolder: this.editSelectedFolder,
      deleteSelectedFolder: this.deleteSelectedFolder,
      setToMostCurrentFolder: this.setToMostCurrentFolder
    };

    if (this.state.selectedFolderId)
      this.props.fetchFolderContent(this.state.selectedFolderId);
  }

  setSelectedFolder = (
    folderName: string | null | undefined,
    folderId: string | null | undefined,
    fetchContents: boolean = true
  ): void => {
    this.setState(
      {
        selectedFolderName: folderName,
        selectedFolderId: folderId
      },
      () => {
        if (this.state.selectedFolderId && fetchContents)
          this.props.fetchFolderContent(this.state.selectedFolderId);
      }
    );
  };

  deleteSelectedFolder = (): void => {
    if (this.props.folders.length === 1)
      return this.setSelectedFolder(null, null);

    if (!this.props.folders[0]._id)
      throw new Error('Folder Id does not exist.');

    this.props.updateFolders(
      this.props.folders.filter(
        folder => folder._id !== this.state.selectedFolderId
      )
    );

    this.setSelectedFolder(
      this.props.folders[0].folderName,
      this.props.folders[0]._id
    );
  };

  editSelectedFolder = (folderName: string): void => {
    this.props.updateFolders(
      this.props.folders.map((folder: IFolder) => {
        if (folder._id === this.state.selectedFolderId)
          return {
            _id: folder._id,
            folderName,
            owner: folder.owner
          };
        else return folder;
      })
    );

    this.setSelectedFolder(folderName, this.state.selectedFolderId, false);
  };

  setToMostCurrentFolder = (): void => {
    if (this.props.folders.length === 0)
      return this.setSelectedFolder(null, null);

    this.setSelectedFolder(
      this.props.folders[this.props.folders.length - 1].folderName,
      this.props.folders[this.props.folders.length - 1]._id,
      false
    );

    this.props.updateContent();
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

export const AppProvider = connect(mapStateToProps, {
  fetchFolderContent,
  updateFolders,
  updateContent
})(_AppProvider);
