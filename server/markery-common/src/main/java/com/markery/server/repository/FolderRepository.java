package com.markery.server.repository;

import com.markery.server.model.entity.Folder;
import com.markery.server.model.enumclass.FolderType;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FolderRepository extends CrudRepository<Folder, Long> {

    
    Folder getOne(Long folderId);

    List<Folder> findAllByParentFolderId(Long id);

    Folder findByUserIdAndType(Long userId, FolderType type);
}
