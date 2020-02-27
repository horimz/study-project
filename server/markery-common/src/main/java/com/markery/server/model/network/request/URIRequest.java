package com.markery.server.model.network.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.GeneratedValue;

@Builder
@Getter
@Setter
public class URIRequest {
    private String url;
    private String alias;
    private String description;
    private String parentFolderId;
}
