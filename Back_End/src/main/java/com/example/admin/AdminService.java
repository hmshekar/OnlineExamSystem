package com.example.admin;

import java.util.List;

public interface AdminService {

    List<Admin> getAllAdmin();

    Admin createAdmin(Admin admin);

    Admin getAdminById(int id);

    Admin getAdminByName(String name);

    void deleteAdmin(int id);

    Admin updateAdmin(int id, Admin admin);

    void deleteAdminByName(String name);

}
