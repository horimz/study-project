package com.markery.server.model.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;


@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude ={"folderList"})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;

    private String email;

    private String password;

    private boolean verified;

    private String registeredAt;

    private String updatedAt;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "folder")
    private List<Folder> folderList;
}
