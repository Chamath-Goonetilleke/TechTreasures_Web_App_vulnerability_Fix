package com.server_application.ssd.Service;

import com.server_application.ssd.DTO.OrderDTO;
import com.server_application.ssd.Models.Cart;
import com.server_application.ssd.Models.Order;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderService {

    private final JdbcTemplate jdbcTemplate;

    public OrderService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void createNewOrder(Order order) {

        String insertOrderSql = "INSERT INTO orders (customerId, totalAmount, orderedDate, isComplete) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(insertOrderSql, order.getCustomerId(), order.getTotalAmount(), order.getOrderedDate(), false);

        int newOrderId = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);

        String insertImageUrlsSql = "INSERT INTO Order_orderedItems (Order_id, orderedItems) VALUES (?, ?)";
        List<String> orderedItems = order.getOrderedItems();
        if (orderedItems != null && !orderedItems.isEmpty()) {
            for (String orderedItem : orderedItems) {
                jdbcTemplate.update(insertImageUrlsSql, newOrderId, orderedItem);
            }
        }

    }

    public List<OrderDTO> getAllOrders() {

        String selectAllOrdersSql = "SELECT * FROM orders";
        List<Order> orders = jdbcTemplate.query(selectAllOrdersSql, new OrdersRowMapper());

        List<OrderDTO> orderList = new ArrayList<>();

        for (Order order : orders) {
            OrderDTO orderDTO = getItemDetails(order);
            orderList.add(orderDTO);
        }

        return orderList;
    }

    public OrderDTO getOrderById(int orderId) {

        String selectOrderSql = "SELECT * FROM orders WHERE id = ?";
        Order order = jdbcTemplate.queryForObject(selectOrderSql, new OrdersRowMapper(), orderId);
        OrderDTO orderDTO = new OrderDTO();
        if (order != null) {
            orderDTO = getItemDetails(order);
        }

        return orderDTO;
    }

    public void completeOrder(int orderId) {

        String updateOrderSql = "UPDATE orders SET isComplete = ? WHERE id = ?";
        jdbcTemplate.update(updateOrderSql, true, orderId);

    }

    public void deleteOrder(int orderId) {

        String deleteOrderSql = "DELETE FROM orders WHERE id = ?";
        jdbcTemplate.update(deleteOrderSql, orderId);

        String deleteOrderedItems = "DELETE FROM Order_orderedItems WHERE Order_id = ?";
        jdbcTemplate.update(deleteOrderedItems, orderId);
    }

    public class OrdersRowMapper implements RowMapper<Order> {
        @Override
        public Order mapRow(ResultSet rs, int rowNum) throws SQLException {
            Order order = new Order();
            order.setId(rs.getInt("id"));
            order.setCustomerId(rs.getInt("customerId"));
            order.setTotalAmount(rs.getString("totalAmount"));
            order.setOrderedDate(rs.getString("orderedDate"));
            order.setIsComplete(rs.getBoolean("isComplete"));

            return order;
        }

    }

    public OrderDTO getItemDetails(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(order.getId());
        orderDTO.setCustomerId(order.getCustomerId());
        orderDTO.setTotalAmount(order.getTotalAmount());

        List<Map<String, Integer>> orderedItems = new ArrayList<>();
        String selectOrderedItemSql = "SELECT orderedItems FROM Order_orderedItems WHERE Order_id = ?";
        List<String> carIds = jdbcTemplate.queryForList(selectOrderedItemSql, String.class, order.getId());

        for (String cartId : carIds) {
            String cartSql = "SELECT itemId, quantity FROM carts WHERE id = ?";
            Cart cart = jdbcTemplate.queryForObject(cartSql, new BeanPropertyRowMapper<>(Cart.class), cartId);

            if (cart != null) {
                String itemNameSql = "SELECT name FROM items WHERE id = ?";
                String itemName = jdbcTemplate.queryForObject(itemNameSql, String.class, cart.getItemId());

                Map<String, Integer> itemInfo = new HashMap<>();
                itemInfo.put(itemName, cart.getQuantity());
                orderedItems.add(itemInfo);
            }
        }
        orderDTO.setOrderedItem(orderedItems);
        orderDTO.setOrderedDate(order.getOrderedDate());
        orderDTO.setIsComplete(order.getIsComplete());

        return orderDTO;
    }


}
