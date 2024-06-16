import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";

import Promotions from "@/components/promotions";
import { productsService } from "@services/infrastructure";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const calculateBonification = (product, IVA, IEPS) => {
  let bonification = 0;

  product.promos.forEach((promo) => {
    const { promo_type, description } = promo;

    switch (promo_type) {
      case "percentage":
        const percentageMatch = description.match(/(\d+)%/);
        if (percentageMatch) {
          const percentage = parseFloat(percentageMatch[1]) / 100;
          bonification += product.price * percentage;
        }
        break;
      case "money":
        const moneyMatch = description.match(/(\d+)\$/);
        if (moneyMatch) {
          const money = parseFloat(moneyMatch[1]);
          bonification += money;
        }
        break;
      case "bonus":
        bonification += product.price;
        break;
      default:
        break;
    }
  });

  return bonification;
};

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [bonification, setBonification] = useState<number>(0);

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await productsService.get(id as string);
      setProduct(product);
      setBonification(calculateBonification(product));
    };

    fetchProduct();
  }, [id]);

  const IVA = 0.16;
  const IEPS = 0.08;

  if (!product) return null;

  const savings = bonification;

  return (
    <>
      <Stack.Screen options={{ title: product.name }} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.rightHeader}>
            <Text style={styles.sku}>SKU: {product.sku}</Text>
            <View style={styles.containerTag}>
              <FontAwesome
                name="tag"
                size={24}
                color="#F24452"
                style={{
                  marginRight: 8,
                }}
              />
              <Text style={styles.promo}>
                {product.promos.map((promo) => promo.description).join(", ")}
              </Text>
            </View>
          </View>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>{product.name}</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
            <Text style={styles.price}>${product.price}</Text>
          </View>
          <View
            style={{
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              marginVertical: 16,
            }} // this is a line
          ></View>
          <View style={styles.dropdownContent}>
            <Text style={styles.subtitle}>Detalles</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.label}>Subtotal:</Text>
              <Text style={styles.value}>${product.factoryPrice}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.label}>IVA:</Text>
              <Text style={styles.value}>
                ${(product.factoryPrice * IVA).toFixed(2)}
              </Text>
            </View>
            {IEPS ? (
              <View style={styles.priceContainer}>
                <Text style={styles.label}>IEPS:</Text>
                <Text style={styles.value}>
                  ${(product.factoryPrice * IEPS).toFixed(2)}
                </Text>
              </View>
            ) : null}
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.label}>Total:</Text>
            <Text style={styles.total}>${product.price}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.label}>Bonificación:</Text>
            <Text style={styles.total}>${bonification.toFixed(2)}</Text>
          </View>
          <View style={styles.savingsContainer}>
            <Text style={styles.savingsText}>
              ¡Estas ahorrando: ${savings.toFixed(2)}!
            </Text>
          </View>
          <View
            style={{
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              marginVertical: 16,
            }} // this is a line
          ></View>
          <View style={styles.dropdownContent}>
            <Text style={styles.subtitle}>Válido únicamente con:</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.label}>Monto mínimo:</Text>
              <Text style={styles.value}>$ 50</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    height: "100%",
  },
  containerTag: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    color: "#F24452",
    width: "100%",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  promo: {
    color: "#F24452",
    fontSize: 17,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  rightHeader: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 16,
  },
  description: {
    fontSize: 17,
    color: "#7C7C7C",
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 25,
    width: "90%",
  },
  sku: {
    fontSize: 13,
    color: "#7C7C7C",
    marginBottom: 8,
    alignSelf: "flex-end",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 5,
    textAlign: "left",
    color: "#333",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  label: {
    fontSize: 18,
    color: "#555",
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#d9534f",
  },
  promotionsSection: {
    width: "90%",
  },
  promotionsTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  dropdownContent: {
    paddingVertical: 8,
  },
  savingsContainer: {
    marginVertical: 16,
    padding: 10,
    backgroundColor: "#dff0d8",
    borderRadius: 5,
    alignItems: "center",
  },
  savingsText: {
    fontSize: 18,
    padding: 15,
    fontWeight: "bold",
    color: "#3c763d",
  },
});
