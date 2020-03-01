package com.markery.server.model.network.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class UrlResponse {
    private Long id;
    private String alias;
    private String url;
    private String description;
}
