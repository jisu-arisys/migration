package com.knf.dev.demo.crudapplication.entity;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "vdnList")
@Getter
@Setter
@AllArgsConstructor
public class Vdn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "vdn_number")
    private String vdnNum;
    @Column(name = "vdn_name")
    private String vdnName;
    @Column(name = "update_at")
    private String updateAt;

    public Vdn() {
    }
}