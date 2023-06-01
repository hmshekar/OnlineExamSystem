package com.example.admin;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Admin {
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private int id;

      @Column(name = "admin_name", unique = true)
      private String name;

      @Column(name = "admin_password")
      private String password;

}
