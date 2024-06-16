import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface ProductCardProps {
  name: string;
  discounts: string;
  price: string;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  discounts,
  price,
  onPress,
}) => {
  const priceValue = parseFloat(price); // Ensure the price is a number
  const priceColor =
    priceValue < 100 ? styles.productPriceLow : styles.productPriceHigh;

  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={onPress}
      style={styles.productContainer}
    >
      <View style={styles.container}>
        <View style={styles.productLeft}>
          <Text style={styles.productName}>{name}</Text>
          <View style={styles.containerProduct}>
            {discounts && (
              <>
                <FontAwesome
                  name="tag"
                  size={18}
                  color="#F24452"
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.productPromo}>{discounts}</Text>
              </>
            )}
          </View>
        </View>
        <View style={styles.containerArrow}>
          <View style={styles.productRight}>
            <Text style={[styles.productPrice, priceColor]}>{price}</Text>
            <Text style={styles.productBonification}>Bonificación</Text>
          </View>
          <FontAwesome
            name="chevron-right"
            size={16}
            color="black"
            style={{
              marginLeft: 15,
            }}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignContent: "center",
    alignItems: "center",
  },
  containerProduct: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
    paddingLeft: 5,
  },
  containerArrow: {
    flexDirection: "row",
    alignItems: "center",
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 22,
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
    color: "#F24452",
  },
  productPrice: {
    fontSize: 16,
  },
  productPriceLow: {
    color: "gray",
  },
  productPriceHigh: {
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

export default ProductCard;
