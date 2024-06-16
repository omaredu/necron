import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Promo from "@services/domain/entities/promo.entity";

type PromotionsProps = {
  promotions: Promo[];
};

const Promotions: React.FC<PromotionsProps> = ({ promotions }) => {
  return (
    <View style={styles.promotionsContainer}>
      {promotions.map((promo, index) => (
        <View key={index} style={styles.promotionCard}>
          <Text style={styles.promotionName}>{promo.description}</Text>
        </View>
      ))}
    </View>
  );
};

export default Promotions;

const styles = StyleSheet.create({
  promotionsContainer: {
    marginTop: 16,
  },
  promotionCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#B3B3B3",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 2,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#EDEDED",
  },
  promotionName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  promotionDescription: {
    fontSize: 16,
    color: "#555",
  },
});
