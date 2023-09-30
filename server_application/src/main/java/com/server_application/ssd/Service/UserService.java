package com.server_application.ssd.Service;

import com.server_application.ssd.DTO.AuthUser;
import com.server_application.ssd.Models.User;
import org.apache.commons.codec.binary.Hex;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.sql.ResultSet;
import java.sql.SQLException;

@Service
public class UserService {

    private final JdbcTemplate jdbcTemplate;

    public UserService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void createUser(User user) {
        String insertUserSql = "INSERT INTO user (name, email, password, userRole, phoneNumber, address) VALUES (?, ?, ?, ?, ?, ?)";

//        String password = User.encrypt(user.getPassword());

        jdbcTemplate.update(
                insertUserSql,
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                "USER",
                null,
                null
        );
    }

    public ResponseEntity<?> auth(AuthUser authUser) {

        String selectUserSql = "SELECT * FROM user WHERE email = '" + authUser.getEmail() + "' AND password = '" + authUser.getPassword() + "';";
        try {
            return ResponseEntity.status(200).body(jdbcTemplate.query(selectUserSql, new UserRowMapper()));
        } catch (Exception e) {
            return ResponseEntity.status(400).body("ERROR: "+e);
        }
    }

    public User getUserById(int userId) {
        String selectUserSql = "SELECT * FROM user WHERE id = ?";
        return jdbcTemplate.queryForObject(selectUserSql, new UserRowMapper(), userId);
    }
    public User getUserByEmailAndPassword(String email, String password) {
        String selectUserSql = "SELECT * FROM user WHERE email = ? AND password = ?";
        return jdbcTemplate.queryForObject(selectUserSql, new UserRowMapper(), new Object[]{email, password});
    }

    public User getUserByEmail(String email) {
        String selectUserSql = "SELECT * FROM user WHERE email = ?";
        return jdbcTemplate.queryForObject(selectUserSql, new UserRowMapper(), email);
    }

    public void updateUser(User user) {
        String updateUserSql = "UPDATE user SET name = ?, phoneNumber = ? , address = ? WHERE id = ?";
        jdbcTemplate.update(
                updateUserSql,
                user.getName(),
                user.getPhoneNumber(),
                user.getAddress(),
                user.getId()
        );
    }

    public void deleteUser(int userId) {
        String deleteUserSql = "DELETE FROM user WHERE id = ?";
        jdbcTemplate.update(deleteUserSql, userId);
    }


    public static class UserRowMapper implements RowMapper<User> {
        @Override
        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            User user = new User();
            user.setId(rs.getInt("id"));
            user.setName(rs.getString("name"));
            user.setEmail(rs.getString("email"));
            user.setPassword(rs.getString("password"));
            user.setUserRole(rs.getString("userRole"));
            user.setPhoneNumber(rs.getString("phoneNumber"));
            user.setAddress(rs.getString("address"));
            return user;
        }

    }

}
