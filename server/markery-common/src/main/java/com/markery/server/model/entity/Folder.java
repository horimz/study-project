package com.markery.server.model.entity;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Folder {

    private Long id;

    private String folderName;

    private String type;
}
