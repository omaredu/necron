import ProductCard from "@/components/ProductsCard";
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, Stack } from "expo-router";
import { productsService } from "@/services/infrastructure";
import Product from "@/services/domain/entities/product.entity";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";

const Tab: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await productsService.list();
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
        // Handle error (e.g., show error message to user)
      }
    };

    fetchProducts();
  }, []);

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard
      name={item.name}
      discounts={item.promos.map((promo) => promo.description).join(", ")}
      price={`$${item.price.toFixed(2)}`}
      onPress={() => router.push(`(stack)/product/${item.id}`)}
    />
  );

  return (
    <>
      <Stack.Screen options={{ title: "Mi inicio" }} />
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.recommendedButton}
          onPress={() => router.push(`(stack)/cart/build`)}
        >
          <Ionicons
            name="sparkles-outline"
            size={22}
            color="#F24452"
            style={{
              marginRight: 10,
            }}
          />
          <Text style={styles.recommendedButtonText}>Carrito inteligente</Text>
        </TouchableOpacity>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
  },
  list: {
    padding: 2,
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  productLeft: {
    flexDirection: "column",
  },
  productRight: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPromo: {
    fontSize: 14,
    color: "gray",
  },
  productPrice: {
    fontSize: 16,
    color: "green",
  },
  productBonification: {
    fontSize: 14,
    color: "gray",
  },
  recommendedButton: {
    backgroundColor: "#fff",
    borderColor: "#F24452",
    display: "flex",
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 40,
    maxWidth: 200,
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  recommendedButtonText: {
    color: "#F24452",
    fontSize: 16,
  },
});
export default Tab;
