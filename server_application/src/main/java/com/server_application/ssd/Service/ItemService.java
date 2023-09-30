package com.server_application.ssd.Service;

import com.server_application.ssd.Models.Item;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Service
public class ItemService {

    private final JdbcTemplate jdbcTemplate;

    public ItemService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Transactional
    public void createNewItem(Item item){

        String insertItemSql = "INSERT INTO items (name, price, description, quantity) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(insertItemSql, item.getName(), item.getPrice(), item.getDescription(), item.getQuantity());

        int newItemId = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);

        String insertImageUrlsSql = "INSERT INTO Item_imageUrls (Item_id, imageUrls) VALUES (?, ?)";
        List<String> imageUrls = item.getImageUrls();
        if (imageUrls != null && !imageUrls.isEmpty()) {
            for (String imageUrl : imageUrls) {
                jdbcTemplate.update(insertImageUrlsSql, newItemId, imageUrl);
            }
        }

    }

    public List<Item> getAllItems() {

        String selectAllItemsSql = "SELECT * FROM items";
        List<Item> items = jdbcTemplate.query(selectAllItemsSql, new ItemsRowMapper());

        for (Item item : items) {
            String selectImageUrlsSql = "SELECT imageUrls FROM Item_imageUrls WHERE Item_id = ?";
            List<String> imageUrls = jdbcTemplate.queryForList(selectImageUrlsSql, String.class, item.getId());
            item.setImageUrls(imageUrls);
        }

        return items;
    }

    public Item getItemById(int itemId) {

        String selectItemSql = "SELECT * FROM items WHERE id = ?";
        Item item = jdbcTemplate.queryForObject(selectItemSql, new ItemsRowMapper(), itemId);

        if (item != null) {
            String selectImageUrlsSql = "SELECT imageUrls FROM Item_imageUrls WHERE Item_id = ?";
            List<String> imageUrls = jdbcTemplate.queryForList(selectImageUrlsSql, String.class, item.getId());
            item.setImageUrls(imageUrls);
        }

        return item;
    }

    public void updateItem(Item item) {

        String updateItemSql = "UPDATE items SET name = ?, price = ?, description = ?, quantity = ? WHERE id = ?";
        jdbcTemplate.update(updateItemSql, item.getName(), item.getPrice(), item.getDescription(), item.getQuantity(), item.getId());

        List<String> imageUrls = item.getImageUrls();
        if (imageUrls != null && !imageUrls.isEmpty()) {

            String deleteImageUrlsSql = "DELETE FROM Item_imageUrls WHERE Item_id = ?";
            jdbcTemplate.update(deleteImageUrlsSql, item.getId());

            String insertImageUrlsSql = "INSERT INTO Item_imageUrls (Item_id, imageUrls) VALUES (?, ?)";
            for (String imageUrl : imageUrls) {
                jdbcTemplate.update(insertImageUrlsSql, item.getId(), imageUrl);
            }
        }
    }

    public void deleteItem(int itemId) {
        String deleteImageUrlsSql = "DELETE FROM Item_imageUrls WHERE Item_id = ?";
        jdbcTemplate.update(deleteImageUrlsSql, itemId);

        String deleteItemSql = "DELETE FROM items WHERE id = ?";
        jdbcTemplate.update(deleteItemSql, itemId);


    }

    public class ItemsRowMapper implements RowMapper<Item> {
        @Override
        public Item mapRow(ResultSet rs, int rowNum) throws SQLException {
            Item item = new Item();
            item.setId(rs.getInt("id"));
            item.setName(rs.getString("name"));
            item.setPrice(rs.getString("price"));
            item.setDescription(rs.getString("description"));
            item.setQuantity(rs.getInt("quantity"));
            return item;
        }

    }
}
