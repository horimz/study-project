package com.markery.server.repository;

import com.markery.server.model.entity.Folder;
import org.springframework.data.repository.CrudRepository;

public interface FolderRepository extends CrudRepository<Folder, Long> {
}
