package com.markery.server.controller;


import com.markery.server.model.entity.Folder;
import com.markery.server.model.network.Header;
import com.markery.server.model.network.request.FolderRequest;
import com.markery.server.model.network.response.FolderResponse;
import com.markery.server.service.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RequestMapping("/api/folders")
public class FolderController {
//           Authentication authentication,

    @Autowired
    private FolderService folderService;

    @PostMapping
    public ResponseEntity<Header<FolderResponse>> create(@RequestBody Header<FolderRequest> resource) throws URISyntaxException {

        String requestAt = resource.getTransactionTime();
        FolderRequest folderRequest = resource.getContent();
        FolderResponse folderResponse = folderService.createFolder(folderRequest, requestAt);

        String uri = "/api/folders";
        return ResponseEntity.created(new URI(uri)).body(Header.OK(folderResponse));
    }

    @GetMapping("/{folderId}")
    public Header<List<FolderResponse>> list(@RequestParam Long folderId){

    }

    @GetMapping("/root")
    public Header<FolderResponse> readRootFolder(){

    }

    @PutMapping
    public Header<FolderResponse> update(@RequestBody Header<FolderRequest>  resource){

    }

    @DeleteMapping("/{folderId}")
    public Header<FolderResponse> delete(@RequestParam Long folderId){

    }
}
