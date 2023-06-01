package com.example.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {
    private final AdminRepository adminRepository;

    @Autowired
    public AdminServiceImpl(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    public Admin getAdminById(int id) {
        return adminRepository.findById(id).orElse(null);
    }

    @Override
    public Admin getAdminByName(String name) {
        return adminRepository.findByName(name);
    }

    @Override
    public List<Admin> getAllAdmin() {
        return adminRepository.findAll();
    }

    @Override
    public void deleteAdmin(int id) {
        adminRepository.deleteById(id);
    }

    @Override
    public Admin updateAdmin(int id, Admin admin) {
        Admin existingAdmin = adminRepository.findById(id).orElse(null);
        if (existingAdmin != null) {
            existingAdmin.setName(admin.getName());
            existingAdmin.setPassword(admin.getPassword());
            // Set any other fields that need to be updated
            return adminRepository.save(existingAdmin);
        }
        return null; // or throw an exception indicating the admin was not found
    }

    @Override
    public void deleteAdminByName(String name) {
        Admin admin = adminRepository.findByName(name);
        if (admin != null) {
            adminRepository.delete(admin);
        }
    }
}
