package com.markery.server.service;

import com.markery.server.model.entity.Folder;
import com.markery.server.model.network.request.FolderRequest;
import com.markery.server.model.network.response.FolderResponse;
import com.markery.server.repository.FolderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FolderService {

    @Autowired
    private FolderRepository folderRepository;

    public FolderResponse createFolder(FolderRequest folderRequest, String createdAt){

        Folder folder = Folder.

        Folder folder = folderRepository.save()

    }

}
