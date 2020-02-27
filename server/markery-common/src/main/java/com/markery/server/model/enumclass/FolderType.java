package com.markery.server.model.enumclass;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FolderType {

    ROOT(0, "루트 폴더", "루트 폴더"),
    NORMAL(1, "일반폴더", "일반폴더");

    private Integer id;
    private String type;
    private String description;
}
