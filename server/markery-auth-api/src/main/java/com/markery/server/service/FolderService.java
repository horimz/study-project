package com.markery.server.service;

import com.markery.server.model.entity.Folder;
import com.markery.server.model.entity.User;
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
    public FolderResponse createRootFolder(Long userId, String createdAt){
        User user = userRepository.getOne(userId);
        Folder folderTocreate = Folder.builder()
                .name(user.getUserName() + "_root")
                .user(user)
                .type(FolderType.ROOT)
                .build();

        Folder folder = folderRepository.save(folderTocreate);

        FolderResponse folderResponse = FolderResponse.builder()
                .id(folder.getId())
                .folderName(folder.getName())
                .build();

        return folderResponse;
    }
}
