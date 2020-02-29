package com.markery.server.controller;


import com.markery.server.model.entity.Folder;
import com.markery.server.model.network.Header;
import com.markery.server.model.network.request.FolderRequest;
import com.markery.server.model.network.response.FolderResponse;
import com.markery.server.service.FolderService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RequestMapping("/api/folders")
public class FolderController {

    @Autowired
    private FolderService folderService;

    @PostMapping
    public ResponseEntity<Header<FolderResponse>> create(
            Authentication authentication,
            @RequestBody Header<FolderRequest> resource) throws URISyntaxException {
        Claims claims = (Claims) authentication.getPrincipal();
        Long uid = Long.parseLong(claims.getId());

        String requestAt = resource.getTransactionTime();
        FolderRequest folderRequest = resource.getContent();

        FolderResponse folderResponse = folderService.createNormalFolder(folderRequest, uid, requestAt);

        String uri = "/api/folders";
        return ResponseEntity.created(new URI(uri)).body(Header.OK(folderResponse));
    }

    @GetMapping("/{folderId}")
    public Header<List<FolderResponse>> list(Authentication authentication,
                                             @RequestParam Long folderId){
        List<FolderResponse> folderResponseList = folderService.getFolders(folderId);
        return Header.OK(folderResponseList);
    }

    @GetMapping("/root")
    public Header<FolderResponse> getRootFolderId(Authentication authentication){
        Claims claims = (Claims) authentication.getPrincipal();
        Long uid = Long.parseLong(claims.getId());
        FolderResponse folderResponse = folderService.getRootFolder(uid);
        return Header.OK(folderResponse);
    }

    @PutMapping
    public Header<FolderResponse> update(Authentication authentication,
                                         @RequestBody Header<FolderRequest>  resource){
        FolderRequest folderRequest = resource.getContent();
        folderService.updatefolder(folderRequest);
        return Header.OK();
    }

    @DeleteMapping("/{folderId}")
    public Header<FolderResponse> delete(Authentication authentication,
                                         @RequestParam Long folderId){
        folderService.deleteFolder(folderId);
        return Header.OK();
    }
}
