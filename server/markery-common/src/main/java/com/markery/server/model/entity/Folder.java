package com.markery.server.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.markery.server.model.enumclass.FolderType;
import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude ={"childFolders"})
@Accessors(chain = true)
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private FolderType type;

    private boolean share;

    @ManyToOne
    @JsonIgnore
    private User user;

    @ManyToOne
    private Folder parentFolder;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "parentFolder")
    @JsonIgnore
    private List<Folder> childFolders;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "folder")
    @JsonIgnore
    private List<Url> urlList;
}
