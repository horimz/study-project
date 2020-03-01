package com.markery.server.model.entity;

import javax.persistence.*;
import java.util.List;

@Entity
public class HashTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    private Url url;
}
