package com.server_application.ssd.Service;

import com.server_application.ssd.Models.Cart;
import com.server_application.ssd.Models.Item;
import org.json.JSONException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.json.JSONObject;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
@Service
public class CartService {
    private final JdbcTemplate jdbcTemplate;

    public CartService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    public List<Item> getCartById(int userId) {
        List<Item> jsonObjects = new ArrayList<>();
        JSONObject jsonObject = new JSONObject();
        Item item = null;
        String selectItemSql = "SELECT * FROM carts WHERE userId = ?";
        List<Cart> cart = jdbcTemplate.query(selectItemSql, new CartService.CartRowMapper(), userId);
        System.out.println("cart: "+cart);
        for (int i = 0; i < cart.size(); i++) {
            String selectedItemSql = "SELECT * FROM items WHERE id = ?";
            item = jdbcTemplate.queryForObject(selectedItemSql, new CartService.ItemsRowMapper(), cart.get(i).getItemId());
            System.out.println("Item: "+item.getName());
            if (item != null) {
                String selectImageUrlsSql = "SELECT imageUrls FROM Item_imageUrls WHERE Item_id = ?";
                List<String> imageUrls = jdbcTemplate.queryForList(selectImageUrlsSql, String.class, item.getId());
                item.setImageUrls(imageUrls);
            }
            jsonObjects.add(item);

        }


        return jsonObjects;
    }

    public void createNewCart(Cart cart) {
        String insertCartSql = "INSERT INTO carts (itemId, userId, quantity) VALUES (?, ?, ?)";
        jdbcTemplate.update(
                insertCartSql,
                cart.getItemId(),
                cart.getUserId(),
                cart.getQuantity()
        );
    }

    public class CartRowMapper implements RowMapper<Cart> {
        @Override
        public Cart mapRow(ResultSet rs, int rowNum) throws SQLException {
            Cart cart = new Cart();
            cart.setId(rs.getInt("id"));
            cart.setItemId(rs.getInt("itemId"));
            cart.setUserId(rs.getInt("userId"));
            cart.setQuantity(rs.getInt("quantity"));
            return cart;
        }

    }
    public class ItemsRowMapper implements RowMapper<Item> {
        @Override
        public Item mapRow(ResultSet rs, int rowNum) throws SQLException {
            Item item = new Item();
            item.setId(rs.getInt("id"));
            item.setName(rs.getString("name"));
            item.setPrice(rs.getString("price"));
            item.setDescription(rs.getString("description"));
            return item;
        }

    }
}
