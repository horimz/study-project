package com.markery.server.model.network.response;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UrlResponse {
    private Long id;
    private String alias;
    private String url;
    private String description;
}
