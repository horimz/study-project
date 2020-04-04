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

@RestController
@CrossOrigin(origins = {"http://localhost:8000"})
@RequestMapping("/api/folders")
public class FolderController {

    @Autowired
    private FolderService folderService;

    @PostMapping
    public ResponseEntity<Header<FolderResponse>> create(
            Authentication authentication,
            @RequestBody Header<FolderRequest> resource) throws URISyntaxException {
        Claims claims = (Claims)authentication.getPrincipal();
        Long uid = claims.get("uid", Long.class);

        String requestAt = resource.getTransactionTime();
        FolderRequest folderRequest = resource.getContent();
        FolderResponse folderResponse = folderService.createNormalFolder(folderRequest, uid, requestAt);

        String uri = "/api/folders";
        return ResponseEntity.created(new URI(uri)).body(Header.OK(folderResponse));
    }

    @GetMapping("/{folderId}")
    public Header<List<FolderResponse>> list(Authentication authentication,
                                             @PathVariable("folderId") Long folderId){
        List<FolderResponse> folderResponseList = folderService.getFolders(folderId);
        return Header.OK(folderResponseList);
    }

    @GetMapping("/root")
    public Header<FolderResponse> getRootFolderId(Authentication authentication){
        Claims claims = (Claims)authentication.getPrincipal();
        Long uid = claims.get("uid", Long.class);

        FolderResponse folderResponse = folderService.getRootFolder(uid);
        return Header.OK(folderResponse);
    }

    @PatchMapping
    public Header<FolderResponse> update(Authentication authentication,
                                         @RequestBody Header<FolderRequest>  resource){
        FolderRequest folderRequest = resource.getContent();
        FolderResponse folderResponse = folderService.updatefolder(folderRequest);
        return Header.OK(folderResponse);
    }

    @DeleteMapping("/{folderId}")
    public Header<FolderResponse> delete(Authentication authentication,
                                         @PathVariable Long folderId){
        FolderResponse folderResponse = folderService.deleteFolder(folderId);
        return Header.OK(folderResponse);
    }
}
