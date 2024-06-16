import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import { productsService } from "@services/infrastructure";
import Product from "@/services/domain/entities/product.entity";
import Promo from "@/services/domain/entities/promo.entity";
import PromoReward from "@services/domain/entities/promo-reward.entity";

function getBestPromoReward(product: Product): PromoReward | null {
  let bestPromoReward: PromoReward | null = null;

  product.promos
    .map((promo) => promo.promoReward)
    .forEach((promoReward) => {
      if (!bestPromoReward) {
        bestPromoReward = promoReward;
      }

      if (
        !bestPromoReward ||
        (promoReward.value && promoReward.value > bestPromoReward.value)
      ) {
        bestPromoReward = promoReward;
      }
    });

  return bestPromoReward;
}

interface Suggestions {
  items: {
    id: string;
    quantity: number;
  }[];
}

function PromoView({ promo }: { promo: Promo }) {
  return (
    <View
      style={{
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#ecececec",
        borderWidth: 1,
        borderColor: "#e2e2e2",
        flexDirection: "row",
      }}
    >
      <FontAwesome
        name="tag"
        size={24}
        color="#F24452"
        style={{
          marginRight: 8,
        }}
      />
      <Text style={{ fontWeight: "500" }}>{promo.description}</Text>
    </View>
  );
}

function SuggestionPromos({ promos }: { promos: Promo[] }) {
  const [expanded, setExpanded] = useState(true);

  // this is an accordion that shows the promos and the number of promos available
  return (
    <View>
      <Text
        style={{ paddingVertical: 10, color: "gray" }}
        onPress={() => setExpanded(!expanded)}
      >
        Promociones ({promos.length})
      </Text>
      {expanded &&
        promos.map((promo) => <PromoView key={promo.id} promo={promo} />)}
    </View>
  );
}

function SuggestionsItem({
  quantity,
  product,
}: {
  quantity: number;
  product: Product;
}) {
  return (
    <View
      style={{
        padding: 10,
        paddingHorizontal: 17,
        borderBottomColor: "#E2E2E2",
        borderBottomWidth: 1,
      }}
    >
      <Text>{product.name}</Text>
      <Text>Cantidad: {quantity}</Text>
      <Text>Subtotal: {product.price * quantity}</Text>
      <SuggestionPromos promos={product.promos} />
    </View>
  );
}

export default function App() {
  const { suggestions } = useLocalSearchParams();
  const [generatedSuggestions, setGeneratedSuggestions] = useState<Suggestions>(
    {
      items: [],
    },
  );
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setGeneratedSuggestions(JSON.parse(suggestions as string) as Suggestions);
  }, [suggestions]);

  useEffect(() => {
    productsService.list().then(setProducts);
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: "Resumen de carrito inteligente" }} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ padding: 17 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "600",
                marginBottom: 5,
                textAlign: "left",
                color: "#222222",
              }}
            >
              Sugerencias
            </Text>
            <Text style={{ fontSize: 17, color: "#7C7C7C", opacity: 0.5 }}>
              En base a tus compras anteriores, y los productos que tienes en tu
              carrito, te sugerimos los siguientes productos:
            </Text>
          </View>
          {generatedSuggestions.items.map((item) => {
            const product = products.find((product) => product.id === item.id);

            if (!product) {
              return null;
            }

            return (
              <SuggestionsItem
                key={product.id}
                quantity={item.quantity}
                product={product}
              />
            );
          })}
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                padding: 17,
                color: "#222222",
                fontSize: 20,
                fontWeight: "600",
                textAlign: "left",
                flex: 1,
              }}
            >
              Total:
            </Text>
            <Text
              style={{
                padding: 17,
                color: "#F24452",
                fontSize: 20,
                fontWeight: "600",
                textAlign: "right",
              }}
            >
              $
              {generatedSuggestions.items.reduce(
                (acc, item) =>
                  acc +
                  (products.find((product) => product.id === item.id)?.price ??
                    0) *
                    item.quantity,
                0,
              )}
            </Text>
          </View>
          <Text
            style={{
              padding: 17,
              color: "#7C7C7C",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            Al presionar el botón de abajo, un asesor se pondrá en contacto
            contigo para ayudarte con tu compra. Guardaremos tu carrito para que
            puedas continuar con tu compra al momento de contactarte.
          </Text>
        </ScrollView>
        <TouchableOpacity
          style={{
            backgroundColor: "#F24452",
            padding: 17,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>
            Contactar a mi asesor
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}
