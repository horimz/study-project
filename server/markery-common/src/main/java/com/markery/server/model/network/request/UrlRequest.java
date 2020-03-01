package com.markery.server.model.network.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.GeneratedValue;

@Builder
@Getter
@Setter
public class UrlRequest {
    private Long id;
    private String url;
    private String alias;
    private String description;
    private Long parentFolderId;
}
