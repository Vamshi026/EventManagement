package com.example.EventManagment.Service;

import com.example.EventManagment.Entity.User;
import com.example.EventManagment.Entity.UserPrincipal;
import com.example.EventManagment.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if(user == null){
            System.out.println("User Not Found with email: " + email);
            throw new UsernameNotFoundException("User not found with email: "+email);
        }

        return new UserPrincipal(user);
    }
}
