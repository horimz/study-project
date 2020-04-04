package com.markery.server.controller;

import com.markery.server.model.network.Header;
import com.markery.server.model.network.request.UrlRequest;
import com.markery.server.model.network.response.UrlResponse;
import com.markery.server.service.UrlService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api")
public class UrlController {

    @Autowired
    private UrlService UrlService;

    @PostMapping("/urls")
    public ResponseEntity<Header<UrlResponse>> create(
            Authentication authentication,
            @RequestBody Header<UrlRequest> resource) throws URISyntaxException {
        Claims claims = (Claims)authentication.getPrincipal();
        Long uid = claims.get("uid", Long.class);

        String requestAt = resource.getTransactionTime();
        UrlRequest urlRequest = resource.getContent();

        UrlResponse urlResponse = UrlService.createUrl(urlRequest, uid, requestAt);

        String uri = "/api/folders";
        return ResponseEntity.created(new URI(uri)).body(Header.OK(urlResponse));
    }

    @GetMapping("/{userName}/urls")
    public Header<List<UrlResponse>> listWithUserName(Authentication authentication,
                                          @PathVariable("userName") String userName){
        List<UrlResponse> urlResponseList = UrlService.getUrlsWithUserName(userName);
        return Header.OK(urlResponseList);
    }

    @GetMapping("/urls")
    public Header<List<UrlResponse>> list(Authentication authentication,
                                               @RequestParam(required = true) String hashtag){
        Claims claims = (Claims)authentication.getPrincipal();
        Long uid = claims.get("uid", Long.class);

        List<UrlResponse> urlResponse = UrlService.getUrlsWithHashtag(hashtag);
        return Header.OK(urlResponse);
    }

    @GetMapping("/urls/{folderId}")
    public Header<List<UrlResponse>> getRootFolderId(Authentication authentication,
                                               @RequestParam Long folderId){
        Claims claims = (Claims)authentication.getPrincipal();
        Long uid = claims.get("uid", Long.class);

        List<UrlResponse> urlResponse = UrlService.getUrlsByFolderId(folderId);
        return Header.OK(urlResponse);
    }

    @PatchMapping("/urls")
    public Header<UrlResponse> update(Authentication authentication,
                                      @RequestBody Header<UrlRequest> resource){
        UrlRequest urlRequest = resource.getContent();
        UrlResponse urlResponse = UrlService.updateUrl(urlRequest);
        return Header.OK(urlResponse);
    }

    @DeleteMapping("/urls/{urlId}")
    public Header<UrlResponse> delete(Authentication authentication,
                                      @PathVariable Long urlId){
        UrlResponse urlResponse = UrlService.deleteURL(urlId);
        return Header.OK(urlResponse);
    }
}
