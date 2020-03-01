package com.markery.server.repository;

import com.markery.server.model.entity.AddTag;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AddTagRepository extends CrudRepository<AddTag, Long> {

    @Query("select url, hashTag, addTag from AddTag addTag " +
            "left outer join addTag.hashTag hashTag " +
            "left outer join addTag.url url " +
            "where hashTag.name = :hashTag")
    List<Object[]> findAllContaingHashTag(@Param("hashTag") String hashTag);

}
