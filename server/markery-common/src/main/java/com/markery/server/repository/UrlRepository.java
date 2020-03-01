package com.markery.server.repository;

import com.markery.server.model.entity.AddTag;
import com.markery.server.model.entity.HashTag;
import com.markery.server.model.entity.Url;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UrlRepository extends CrudRepository<Url, Long> {

    List<Url> findAllByUserId(Long userId);

    List<Url> findAllByFolderId(Long folderId);
}
