package com.markery.server.model.network.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class FolderResponse {
    private Long id;
    private String folderName;
}
