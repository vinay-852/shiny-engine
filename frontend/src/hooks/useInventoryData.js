import { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../api/client.js';

export function useInventoryData() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [productData, customerData, orderData] = await Promise.all([
        api.listProducts(),
        api.listCustomers(),
        api.listOrders(),
      ]);
      setProducts(productData);
      setCustomers(customerData);
      setOrders(orderData);
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const summary = useMemo(() => {
    const lowStockProducts = products.filter((product) => product.quantity_in_stock <= 5);
    return {
      totalProducts: products.length,
      totalCustomers: customers.length,
      totalOrders: orders.length,
      lowStockProducts,
    };
  }, [products, customers, orders]);

  const runAction = async (action, successText) => {
    try {
      await action();
      setMessage({ type: 'success', text: successText });
      await refresh();
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  return {
    products,
    customers,
    orders,
    loading,
    message,
    setMessage,
    summary,
    refresh,
    runAction,
  };
}
