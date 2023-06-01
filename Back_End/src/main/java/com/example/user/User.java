package com.example.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

	@Column(name = "user_name")
	private String name;

	@Id
	@Column(name = "user_email", unique = true)
	private String email;

	@Column(name = "user_password")
	private String password;

}
