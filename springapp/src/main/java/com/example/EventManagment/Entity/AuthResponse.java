package com.example.EventManagment.Entity;

public class AuthResponse {
    private String token;
    private User user;
    private String userrole;

    public AuthResponse(String token, User user, String userrole) {
        this.token = token;
        this.user = user;
        this.userrole = user.getUserrole();
    }


    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getUserrole() {
        return userrole;
    }

    public void setUserrole(String userrole) {
        this.userrole = userrole;
    }
}
