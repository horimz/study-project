package com.markery.server.service;

import com.markery.server.model.entity.Folder;
import com.markery.server.model.enumclass.FolderType;
import com.markery.server.model.network.request.FolderRequest;
import com.markery.server.model.network.response.FolderResponse;
import com.markery.server.repository.FolderRepository;
import com.markery.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class FolderService {

    @Autowired
    private FolderRepository folderRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public FolderResponse createNormalFolder(FolderRequest folderRequest, Long userId, String createdAt){

        Folder folderTocreate = Folder.builder()
                .name(folderRequest.getFolderName())
                .user(userRepository.getOne(userId))
                .parentFolder(folderRepository.getOne(folderRequest.getParentFolderId()))
                .type(FolderType.NORMAL)
                .build();

        Folder folder = folderRepository.save(folderTocreate);

        FolderResponse folderResponse = FolderResponse.builder()
                .id(folder.getId())
                .folderName(folder.getName())
                .build();

        return folderResponse;
    }
    @Transactional(readOnly = true)
    public List<FolderResponse> getFolders(Long folderId) {

        List<Folder> folderList = folderRepository.findAllByParentFolderId(folderId);
        List<FolderResponse> folderResponseList = new ArrayList<>();
        folderList.forEach((folder)->{
            FolderResponse folderResponse = FolderResponse.builder()
                    .id(folder.getId())
                    .folderName(folder.getName())
                    .build();
            folderResponseList.add(folderResponse);
        });

        return folderResponseList;
    }

    @Transactional(readOnly = true)
    public FolderResponse getRootFolder(Long userId){
        Folder folder = folderRepository.findByUserIdAndType(userId, FolderType.ROOT);
        FolderResponse folderResponse = FolderResponse.builder()
                .id(folder.getId())
                .build();
        return folderResponse;
    }

    @Transactional
    public FolderResponse updatefolder(FolderRequest folderRequest){
        Folder folder = folderRepository.findById(folderRequest.getId()).orElseGet(null);
        String folderName = folderRequest.getFolderName();
        if(!folderName.isEmpty())folder.setName(folderName);
        Folder result = folderRepository.save(folder);

        FolderResponse folderResponse = FolderResponse.builder()
                .id(result.getId())
                .folderName(result.getName())
                .build();
        return folderResponse;
    }

    @Transactional
    public FolderResponse deleteFolder(Long folderId){
        Folder folder = folderRepository.findById(folderId).orElseThrow(null);
        folderRepository.deleteById(folderId);
        FolderResponse folderResponse = FolderResponse.builder()
                .id(folder.getId())
                .folderName(folder.getName())
                .build();

        return folderResponse;
    }
}
