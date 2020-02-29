package com.markery.server.model.network.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class FolderRequest {
    private Long id;
    private String folderName;
    private Long parentFolderId;
}
