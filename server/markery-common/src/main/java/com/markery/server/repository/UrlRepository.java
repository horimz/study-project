package com.markery.server.repository;

import com.markery.server.model.entity.Url;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UrlRepository extends CrudRepository<Url, Long> {

    List<Url> findAllByUserId(Long userId);

    List<Url> findAllByhashtagContaining(String hashtag);

    List<Url> findAllByFolderId(Long folderId);
}
