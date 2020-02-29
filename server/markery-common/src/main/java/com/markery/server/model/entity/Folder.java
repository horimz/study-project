package com.markery.server.model.entity;

import com.markery.server.model.enumclass.FolderType;
import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude ={"childFolders"})
@Accessors(chain = true)
public class Folder {

    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private FolderType type;

    @ManyToOne
    private User user;

    @ManyToOne
    private Folder parentFolder;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "folder")
    private List<Folder> childFolders;
}
