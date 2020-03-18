package com.markery.server.service;

import com.markery.server.model.entity.Folder;
import com.markery.server.model.entity.Url;
import com.markery.server.model.network.request.FolderRequest;
import com.markery.server.model.network.request.UrlRequest;
import com.markery.server.model.network.response.UrlResponse;
import com.markery.server.repository.AddTagRepository;
import com.markery.server.repository.FolderRepository;
import com.markery.server.repository.UrlRepository;
import com.markery.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UrlService {

    @Autowired
    private FolderRepository folderRepository;

    @Autowired
    private UrlRepository urlRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddTagRepository addTagRepository;

    @Transactional
    public UrlResponse createUrl(UrlRequest urlRequest, Long uid, String requestAt) {
        Url url = Url.builder()
                .alias(urlRequest.getAlias())
                .url(urlRequest.getUrl())
                .description(urlRequest.getDescription())
                .user(userRepository.getOne(uid))
                .folder(folderRepository.getOne(urlRequest.getParentFolderId()))
                .build();

        Url urlResult = urlRepository.save(url);

        UrlResponse urlResponse = UrlResponse.builder()
                .id(urlResult.getId())
                .alias(urlResult.getAlias())
                .description(urlResult.getDescription())
                .build();
        return urlResponse;
    }

    @Transactional(readOnly = true)
    public List<UrlResponse> getUrlsWithUserName(String userName) {
        List<Url> urlList = urlRepository.findAllByUserId(
                userRepository.findByUserName(userName).get().getId());

        List<UrlResponse> urlResponseList = new ArrayList<>();
        urlList.forEach((url)-> {
            UrlResponse urlResponse = UrlResponse.builder()
                    .id(url.getId())
                    .alias(url.getAlias())
                    .url(url.getUrl())
                    .description(url.getDescription())
                    .build();
            urlResponseList.add(urlResponse);
        });
        return urlResponseList;
    }

    @Transactional(readOnly = true)
    public List<UrlResponse> getUrlsWithHashtag(String hashtag) {

        List<Object[]> objectList = addTagRepository.findAllContaingHashTag(hashtag);
        List<UrlResponse> urlResponseList = new ArrayList<>();
        for(Object[] obj : objectList){
            UrlResponse urlResponse = new UrlResponse();
            urlResponse.setId(Long.parseLong(obj[0].toString()));
            urlResponse.setUrl((String) obj[1]);
            urlResponse.setAlias((String) obj[2]);
            urlResponse.setDescription((String) obj[3]);
            urlResponseList.add(urlResponse);

        };

//        List<UrlResponse> urlResponseList = new ArrayList<>();
//        urlList.forEach((url)-> {
//            UrlResponse urlResponse = UrlResponse.builder()
//                    .id(url.getId())
//                    .alias(url.getAlias())
//                    .url(url.getUrl())
//                    .description(url.getDescription())
//                    .build();
//            urlResponseList.add(urlResponse);
//        });
        return urlResponseList;
    }

    public List<UrlResponse> getUrlsByFolderId(Long folderId) {
        List<Url> urlList = urlRepository.findAllByFolderId(folderId);
        List<UrlResponse> urlResponseList = new ArrayList<>();
        urlList.forEach((url)-> {
            UrlResponse urlResponse = UrlResponse.builder()
                    .id(url.getId())
                    .url(url.getUrl())
                    .alias(url.getAlias())
                    .description(url.getDescription())
                    .build();
            urlResponseList.add(urlResponse);
        });
        return urlResponseList;
    }

    @Transactional
    public UrlResponse updateUrl(UrlRequest urlRequest) {
        Url url = urlRepository.findById(urlRequest.getId()).orElseGet(null);
        String Url = urlRequest.getUrl();
        String alias = urlRequest.getAlias();
        String description = urlRequest.getDescription();
        Long parentFolderId = urlRequest.getParentFolderId();

        if(!Url.isEmpty())url.setUrl(urlRequest.getUrl());
        if(!alias.isEmpty()) url.setAlias(urlRequest.getAlias());
        if(!description.isEmpty())url.setDescription(description);
        if(parentFolderId != null) url.setFolder(folderRepository.getOne(parentFolderId));

        Url result = urlRepository.save(url);
        UrlResponse urlResponse = UrlResponse.builder()
                .id(result.getId())
                .url(result.getUrl())
                .alias(result.getAlias())
                .description(result.getDescription())
                .build();
        return urlResponse;
    }

    @Transactional
    public UrlResponse deleteURL(Long urlId){
        Url url = urlRepository.findById(urlId).orElseThrow(null);
        urlRepository.deleteById(urlId);
        UrlResponse urlResponse = UrlResponse.builder()
                .id(url.getId())
                .url(url.getUrl())
                .alias(url.getAlias())
                .build();
        return urlResponse;
    }

}
