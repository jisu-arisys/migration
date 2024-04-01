package com.knf.dev.demo.crudapplication.repository;

import com.knf.dev.demo.crudapplication.entity.Vdn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VdnRepository extends JpaRepository<Vdn, Long> {

}