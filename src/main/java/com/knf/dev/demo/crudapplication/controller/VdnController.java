package com.knf.dev.demo.crudapplication.controller;

import com.knf.dev.demo.crudapplication.entity.Vdn;
import com.knf.dev.demo.crudapplication.exception.ResourceNotFoundException;
import com.knf.dev.demo.crudapplication.repository.VdnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class VdnController {
    @Autowired
    private VdnRepository vdnRepository;

    @GetMapping("/vdns")
    public List<Vdn> getAllvdns() {
        return vdnRepository.findAll();
    }

    @GetMapping("/vdns/{id}")
    public ResponseEntity<Vdn> getvdnById(@PathVariable(value = "id")
                                            Long id) throws ResourceNotFoundException {

        Vdn vdn = vdnRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException
                        ("vdn not found for this id :: " + id));
        return ResponseEntity.ok().body(vdn);
    }

    @PostMapping("/vdns")
    public Vdn createvdn(@RequestBody Vdn vdn) {
        return vdnRepository.save(vdn);
    }

    @PutMapping("/vdns/{id}")
    public ResponseEntity<Vdn> updatevdn(@PathVariable(value = "id")
                                           Long id, @RequestBody Vdn vdnDto)
            throws ResourceNotFoundException {

        Vdn vdn = vdnRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException
                        ("vdn not found for this id :: " + id));

        vdn.setUpdateAt(vdnDto.getUpdateAt());
        vdn.setVdnName(vdnDto.getVdnName());
        vdn.setVdnNum(vdnDto.getVdnNum());
        vdn.setId(id);
        final Vdn updatevdn = vdnRepository.save(vdn);
        return ResponseEntity.ok(updatevdn);
    }

    @DeleteMapping("/vdns/{id}")
    public Map<String, Boolean> deletevdn(@PathVariable(value = "id")
                                           Long id) throws ResourceNotFoundException {
        Vdn vdn = vdnRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException
                        ("vdn not found for this id :: " + id));

        vdnRepository.delete(vdn);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
